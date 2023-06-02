const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db

const mongoConnect = callback => {
    MongoClient.connect(
        "mongodb+srv://vakulio:bI8CAHnMlXlvJ1XY@node-learning.ey3k7eo.mongodb.net/shop?retryWrites=true&w=majority"
    )
        .then(client => {
            console.log("Connected!");
            db = client.db();
            callback();
        })
        .catch(err => {
            throw err
        });
}

const getDb = () => {
    if (db) {
        return db;
    }
    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb