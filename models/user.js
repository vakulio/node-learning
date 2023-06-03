const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');


class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        db.collection('users').insertOne(this)
    }

    addToCard(product) {
        const existingProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        const updatedCardItems = [...this.card.items];

        if (existingProductIndex >= 0) {
            updatedCardItems[existingProductIndex].quantity = updatedCardItems[existingProductIndex].quantity + 1;
        } else {
            updatedCardItems.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
        }
        const updatedCard = { items: updatedCardItems };
        const db = getDb();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { card: updatedCard } });
    }



    static findById(id) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) }).then(user => {
            console.log(user);
            return user;
        }).catch(err => { throw err });
    }
}

module.exports = User;
