require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const db = require('./db');
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
db.connect(() => {
  app.listen(port, () => {
    console.log('hello world');
    console.log(`Server is running on port: ${port}`);
  });
});


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/products", products)

