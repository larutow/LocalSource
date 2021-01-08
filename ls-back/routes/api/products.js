const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../../db');
const axios = require ('axios').default;

require('dotenv').config();

router.get("/searchproducts", async (req, res) => {
    try{
        // await client.connect();
        const database = db.get().db("LocalSource");
        const collection = database.collection("products-test");

        await collection.findOne({ email: req.body.searchterm }).then(products => {
            if (products){ }
        });
    }
    catch{}
})

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
        let product = {
            productname: '',
            category:'',
            variants:[
                {
                    title: '',
                    price: 0,
                    description: '',
                    img_url: '',
                    origin_url: '',
                    profile_id: ''
                }
                
            ]
        }
        
        const database = db.get().db("LocalSource");
        let collection = database.collection("products");
        const etsyKey = process.env.ETSY_API;
        let i = 0;
        let next_offset = null;
        do{ 
            axios.get(`https://openapi.etsy.com/v2/shops/${shopName}/listings/active?limit=100&offset=${i}&includes=Images&api_key=${etsyKey}`)
            .then(async function(response){
                //for each product in the inventory
                for(const result of response.data.results){
                    await collection.findOne({title: result.title}).then(function(foundproduct){
                        if(foundproduct){
                            //add this result as a variant to the foundproduct
                        }else{
                            //create a new product and insert if product is not found in the collection
                            const newProduct = {
                                productname: result.title,
                                category: result.taxonomy_path[0],
                                variants:[
                                    {
                                        title: 'default-product',
                                        price: result.price,
                                        description: result.description,
                                        img_url: result.Images[0].url_570xN,
                                        origin_url: result.url,
                                        profile_id: 'Shelby-Test'
                                    }
                                ]
                            }
                            console.log(newProduct);   
                        }
                    });

                }
                next_offset = response.data.next_offset;
            });
            i++;
        }
        while(next_offset != null);
        
        
    }



    
    //TODO: validate webtoken / is user in DB
    //FindUser & extract ID - helper function
    
    
    /*Etsy flow:
    //1 - extract last word in URL (shopname)
    //2 - Etsy API request for shop inventory
        https://openapi.etsy.com/v2/shops/{ShopName}/listings/active?includes=Images&api_key=ri13xa0vjan8omqk3q0jia74
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
    try{
        const database = db.get().db("LocalSource");
        const collection = database.collection("products-test")
    } catch {

    }
});

router.put("/updateinventory", async (req, res) => {
    
})

router.delete("/delist", async (req, res) => {
    
})

module.exports = router;