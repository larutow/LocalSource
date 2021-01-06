const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../../db');

require('dotenv').config.config();

router.post("/uploadinventory", async (req, res) => {
    //TODO: validate webtoken / is user in DB
    
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
    }
})