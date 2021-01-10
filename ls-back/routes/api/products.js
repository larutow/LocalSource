const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../../db');
const axios = require ('axios').default;

require('dotenv').config();

router.get("/searchproducts", async (req, res) => {
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
        if (err){
            console.log(err)
            return res.status(400).json({message:'something went wrong', error: err})
        }else{
            return res.status(200).json({ message: 'search results found', searchresults: result});
        }
    });
});

router.post("/uploadinventory", async (req, res) => {
    //pass in URL & jwt use JWT to find user
    //Etsy Example: https://www.etsy.com/shop/ShelbyPageCeramics
    //Shopify Example (map collections manually): https://shopursa.com/

    //identify shop/platform type (using URL ) - return 200 if not ETSY or Shopify
    const submittedUrl = req.body.shopUrl;
    
    //check if etsy or shopify
    //substring to remove https://www.
    const removewww = submittedUrl.substring(submittedUrl.indexOf(".")+1);
    //substring to remove .com/etc
    let websitename = removewww.substring(0,removewww.indexOf("."));
    //expected output = esty

    //TODO use platform selection instead?
    if(websitename === "etsy"){
        //etsy store logic
        //recieve last part of name (ShopId)
        let shopName = submittedUrl.substring(submittedUrl.lastIndexOf("/")+1);
        //make mongodb request to receive all products // an index would be good here but let's just do a complete collection scan
        // try{

        //     await collection.findOne({title})
        // }
        //
        // let product = {
        //     productname: '',
        //     category:'',
        //     variants:[
        //         {
        //             title: '',
        //             price: 0,
        //             description: '',
        //             img_url: '',
        //             origin_url: '',
        //             profile_id: ''
        //         }
                
        //     ]
        // }
        
        const database = db.get().db("LocalSource");
        let collection = database.collection("products-test");
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
                                            profile_id: 'LynndalePrintTest'
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
        }
        while(next_offset != null);
        
        return res.status(200).json({message:'inventory uploaded to server - review mongodb colleciton to confirm results'})
    }



    
    //TODO: validate webtoken / is user in DB
    //FindUser & extract ID - helper function
    
    
    /*Etsy flow:
    //1 - extract last word in URL (shopname)
    //2 - Etsy API request for shop inventory
        While()
        Paginate inventory (for shops w more than 100 items)
    //3 - foreach(etsy inventory item found)
        db = LocalSource
        collection = products-test
        await collection.findOne({})
        if res.data.results[i].title
    */
    /*
    res.body.
    */
    //Flow: Receive URL in res, determine if shopify or etsy
    /*Etsy listing:
        use taxonomy highest level to determine category
        use res.body.user to determine 

    */
    //Shopify products.json - use res.body.category

});

router.put("/updateinventory", async (req, res) => {
    
})

router.delete("/delist", async (req, res) => {
    
})

module.exports = router;