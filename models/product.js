const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp
        if (this._id) {
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
        } else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                throw err
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                throw err
            })
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(id) }).next()
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                throw err
            })
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                throw err
            })
    }
}

module.exports = Product;
