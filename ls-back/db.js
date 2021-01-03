require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoDbUri = process.env.ATLAS_URI;
let mongodb;

function connect(callback){
    mongodb = new MongoClient(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongodb.connect(err => {
        if (err){
            console.log(err);
        }
    });
    callback();
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};