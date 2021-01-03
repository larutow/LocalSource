const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
// const User = mongoose.model("users");

require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            client.connect(err => {
                const users = client.db("LocalSource").collection("users-test");
                users.findById(jwt_payload.id)
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        }
                    })
                    .catch(err => console.log(err));
                client.close();
            });
        }));
}