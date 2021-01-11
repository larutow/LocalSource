const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

//MongoDB connection
// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = require('../../db');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { use } = require("passport");
const ObjectId = require('mongodb').ObjectID;
const { ObjectID } = require("mongodb");

// // Load User model
// const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // TODO - Form validation
    // const { errors, isValid } = validateRegisterInput(req.body);
    // // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    // CONNECT TO AND FIND USER EMAIL, CREATE NEW USER BASED UPON REQ IF EMAIL DOES NOT EXIST
    console.log(req.body);
    try{
        // await client.connect();
        const database = db.get().db("LocalSource");
        const collection = database.collection("users-test");

        await collection.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
    
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        collection.insertOne(newUser, function (mongoerror, mongoresponse){
                            if (mongoerror){
                                console.log('Error occured while inserting')
                            } else {
                                console.log('Inserted record', mongoresponse.ops[0]);
                                return res.status(200).json(mongoresponse.ops[0]);
                            }
                        });
                    });
                });
            }
        });
    }
    catch(e){
        console.log(e);
    }

});


router.post("/createprofile", async (req,res) => {
    //Verify signed in user
    const usertoken = req.header('Authorization').split(' '); // TBD
    const userpay = jwt.verify(usertoken[1], process.env.SECRETORKEY);
    console.log(userpay);

    try{
        const database = db.get().db("LocalSource");
        const collection = database.collection("users-test");
        await collection.findOne({_id: ObjectId(userpay.id)},{projection:{password:0}}).then(user => {
            if(user){
                //take in form data and apply to user
                const filter = {_id: ObjectId(userpay.id)}
                const profiledata = {
                    $set:{
                        shopUrl: req.body.shopUrl,
                        shopName: req.body.shopName,
                        shopAddress: req.body.shopAddress,
                        shop_lat: req.body.shopLat,
                        shop_lng: req.body.shopLng,
                        cityName: req.body.cityName
                    }
                }
                collection.updateOne(filter, profiledata, function(mongoerror, mongoresponse){
                    if(mongoerror){
                        console.log('Error occured while inserting profile information - ', mongoerror);
                    }else{
                        console.log('Updated profile informaiton');
                        return res.status(200).json({success:'true'});
                    }
                });

            }else{
                res.status(404).json({token:"token did not match any known user"});
            }
        });

    }catch(e){
        console.log(e);
    }
})


router.get("/getprofile", async (req,res) => {
    //Verify signed in user
    const usertoken = req.header('Authorization').split(' '); // TBD
    const userpay = jwt.verify(usertoken[1], process.env.SECRETORKEY);
    console.log(userpay);
    try{
        const database = db.get().db("LocalSource");
        const collection = database.collection("users-test");
        await collection.findOne({_id: ObjectId(userpay.id)},{projection:{password:0}}).then(user => {
            if(user){
                //take in form data and apply to user
                        console.log('Found Profile:');
                        
                        return res.status(200).json(user);
                    }else{
                        return res.status(404).json({token:"token did not match any known user"});
                    }
                });
    }catch(e){
        console.log(e);
    }
})

router.post("/getprofiledetails", async (req,res) => {
    //Verify signed in user
    profileid = req.body.profile_id;
    try{
        const database = db.get().db("LocalSource");
        const collection = database.collection("users-test");
        await collection.findOne({_id: ObjectId(profileid)},{projection:{password:0}}).then(user => {
            if(user){
                //take in form data and apply to user
                        console.log('Found Profile:' + user);
                        
                        return res.status(200).json(user);
                    }else{
                        return res.status(404).json({token:"token did not match any known user"});
                    }
                });
    }catch(e){
        console.log(e);
    }
})


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    ///////////////////
    try{
        // await client.connect();
        const database = db.get().db("LocalSource");
        const collection = database.collection("users-test");

        await collection.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                return res.status(400).json({ email: "User email not found, please register" });
            } else {
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user._id,
                            name: user.name
                        };
                        // Sign token
                        jwt.sign(
                            payload,
                            process.env.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res
                            .status(400)
                            .json({ passwordincorrect: "Password incorrect" });
                        }
                    });
            }
        });
    }
    catch(e){
        console.log(e);
    }
    ////////////////////
});

module.exports = router;