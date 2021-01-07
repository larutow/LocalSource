const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../../db');

require('dotenv').config.config();

router.get("/searchproducts", async (req, res) => {
    try{
        // await client.connect();
        const database = db.get().db("LocalSource");
        const collection = database.collection("products-test");

        await collection.findOne({ email: req.body.searchterm }).then(products => {
            if (products){

            }
        })
})

router.post("/uploadinventory", async (req, res) => {
    //TODO: validate webtoken / is user in DB
    
    //Etsy Example: https://www.etsy.com/shop/ShelbyPageCeramics
    //Shopify Example (map collections manually): https://shopursa.com/

    //Etsy flow:
    //1 - extract last word in URL (shopname)
    //2 - Etsy API request for shop inventory
    //3 - for each item
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