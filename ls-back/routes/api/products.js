const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../../db');
const axios = require ('axios').default;
const ObjectId = require('mongodb').ObjectID;

require('dotenv').config();

router.post("/searchproducts", async (req, res) => {
    const searchterm = req.body.searchterm;
    const city = req.body.city
    var foundresults = []
    // await client.connect();
    const database = db.get().db("LocalSource");
    const collection = database.collection("products-test");

    let collectionResults = collection.aggregate([
        {
            $search: {
                "text": {
                    "query": searchterm,
                    "path": "productname"
                }
            }
        }
    ]);

    foundresults = collectionResults.toArray(function (err, result) {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: 'something went wrong', error: err })
        } else {
            console.log('created array');
            return res.status(200).json({ message: 'search results found', searchresults: result });
        }
    });

    // console.log(foundresults);

    // for (const each of foundresults) {
    //     var user = collection.findOne({ _id: ObjectId(foundresults[each].id) }, { projection: { password: 0 } });
    //     each.variants[0].profile = user;
    
});

router.post("/category", async (req, res) => {
    const category= req.body.category;
    const city = req.body.city
    var foundresults = []
    // await client.connect();
    const database = db.get().db("LocalSource");
    const collection = database.collection("products-test");

    // let collectionResults = collection.aggregate([
    //     {
    //         $search: {
    //             "text": {
    //                 "query": category,
    //                 "path": "category"
    //             }
    //         }
    //     }
    // ]);

    let collectionResults = collection.find({category:category})
    
    
    

    foundresults = collectionResults.toArray(function (err, result) {
        if (err){
            console.log(err)
            return res.status(400).json({message:'something went wrong', error: err})
        }else{
            // for(const each in result){
            //     collection.findOne({_id: ObjectId(result[each].id)},{projection:{password:0}}).then(user => {
            //         result[each].variant[0].profile=user;
            //     })
            // }
            return res.status(200).json({ message: 'category results found', results: result});
        }
    });
});

router.post("/uploadinventory", async (req, res) => {
    //pass in URL & jwt use JWT to find user
    //Etsy Example: https://www.etsy.com/shop/ShelbyPageCeramics
    //Shopify Example (map collections manually): https://shopursa.com/
    const usertoken = req.header('Authorization').split(' '); // TBD
    const userpay = jwt.verify(usertoken[1], process.env.SECRETORKEY);
    console.log(userpay);

    //identify shop/platform type (using URL ) - return 200 if not ETSY or Shopify
    const submittedUrl = req.body.shopUrl;
    
    //check if etsy or shopify
    //substring to remove https://www.
    const removewww = submittedUrl.substring(submittedUrl.indexOf(".")+1);
    //substring to remove .com/etc
    let websitename = removewww.substring(0,removewww.indexOf("."));
    const database = db.get().db("LocalSource");
    let collection = database.collection("products-test");

    if(websitename === "etsy"){
        //etsy store logic
        //recieve last part of name (ShopId)
        let shopName = submittedUrl.substring(submittedUrl.lastIndexOf("/")+1);
        const etsyKey = process.env.ETSY_API;
        let i = 0;
        let next_offset = null;
        let newProducts = [];
        do {
            await axios.get(`https://openapi.etsy.com/v2/shops/${shopName}/listings/active?limit=100&offset=${i}&includes=Images&api_key=${etsyKey}`)
                .then(async function (response) {
                    //for each product in the inventory offset page
                    for (const result of response.data.results) {
                        //look for if that product exists in the collection
                        await collection.findOne({ productname: result.title }).then(function (foundproduct) {
                            if (foundproduct) {
                                //add this result as a variant to the foundproduct
                                console.log('product ' + foundproduct.productname + ' already exists in inventory');
                            } else {
                                //create a new product and insert if product is not found in the collection
                                const newProduct = {
                                    productname: result.title,
                                    category: result.taxonomy_path[0],
                                    variants: [
                                        {
                                            title: 'default-product',
                                            price: result.price,
                                            description: result.description,
                                            img_url: result.Images[0].url_570xN,
                                            origin_url: result.url,
                                            profile_id: ObjectId(userpay.id)
                                        }
                                    ]
                                }
                                newProducts.push(newProduct);
                            }
                        });
                    }
                    next_offset = response.data.next_offset;
                }).then(async function () {
                    for (const count in newProducts) {
                        try {
                            await collection.insertOne(newProducts[count]);
                        }
                        catch (err) {
                            console.log("Error caught on insertion of products into mongoDB - " + err);
                        }
                    }
                });
            i++;
        }while(next_offset != null);
        
        return res.status(200).json({message:'inventory uploaded to server - review mongodb colleciton to confirm results'});

    }else{
        //Shopify Logic
        //recieve shopname from url
        let shopifystorename = submittedUrl.substring(submittedUrl.indexOf("/")+2,submittedUrl.indexOf('.'));
        let i = 1;
        let pagethrough = true;
        let newProducts = [];
        do {
            await axios.get(`${submittedUrl}/products.json?limit=250&page=${i}`)
                .then(async function (response) {
                    //for each product in the inventory offset page
                    for (const result of response.data.products) {
                        //look for if that product exists in the collection
                        await collection.findOne({ productname: result.title }).then(function (foundproduct) {
                            if (foundproduct) {
                                //add this result as a variant to the foundproduct
                                console.log('product ' + foundproduct.productname + ' already exists in inventory');
                            } else {
                                //create a new product and insert if product is not found in the collection
                                //condition img url:
                                const newImgUrl = conditionShopifyImg(result.images[0].src);

                                const newProduct = {
                                    productname: result.title,
                                    category: req.body.category,
                                    variants: [
                                        {
                                            title: result.variants[0].title,
                                            price: result.variants[0].price,
                                            description: result.body_html,
                                            img_url: newImgUrl,
                                            origin_url: `https://${shopifystorename}.com/products/${result.handle}`,
                                            profile_id: ObjectId(userpay.id)
                                        }
                                    ]
                                }
                                newProducts.push(newProduct);
                            }
                        });
                    }
                    if(response.data.products.length === 0){
                        pagethrough = false;
                    }
                }).then(async function () {
                    for (const count in newProducts) {
                        try {
                            await collection.insertOne(newProducts[count]);
                        }
                        catch (err) {
                            console.log("Error caught on insertion of products into mongoDB - " + err);
                        }
                    }
                });
            i++;
        }while(pagethrough == true);
        
        return res.status(200).json({message:'inventory uploaded to server - review mongodb collection to confirm results'});

        
    }

});

function conditionShopifyImg(inputUrl){
    //returns a conditioned URL for smaller shopify img - faster loading (hopefully)
    //finds the position of the period before the extension
    var size = '_570x570';
    var pos = inputUrl.lastIndexOf(".");

    return inputUrl.substring(0,pos) + size + inputUrl.substring(pos);

}

router.put("/updateinventory", async (req, res) => {
    
})

router.delete("/delist", async (req, res) => {
    
})

module.exports = router;