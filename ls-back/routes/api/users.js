const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

//MongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { use } = require("passport");

// // Load User model
// const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // CONNECT TO AND FIND USER EMAIL, CREATE NEW USER BASED UPON REQ IF EMAIL DOES NOT EXIST
    try{
        await client.connect();
        const database = client.db("LocalSource");
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
    finally{
        client.close();
    }

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    client.connect(err => {
        const users = client.db("LocalSource").collection("users-test");
        users.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
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
        });
    });
});

module.exports = router;