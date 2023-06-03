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
        const updatedCartItems = [...this.cart.items];

        if (existingProductIndex >= 0) {
            updatedCartItems[existingProductIndex].quantity = updatedCartItems[existingProductIndex].quantity + 1;
        } else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
        }
        const updatedCart = { items: updatedCartItems };
        const db = getDb();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products').find({ _id: { $in: productIds } }).toArray().then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            });
        }).catch(err => { throw err });
    }

    deleteItemfromCard(prodId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== prodId.toString();
        })
        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } });
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name,
                }
            }
            return db.collection('orders').insertOne(order);
        })
            .then(result => {
                this.cart = { items: [] };
                return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: this.cart } });
            })

    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
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
