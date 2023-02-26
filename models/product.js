const crypto = require('crypto');
const Cart = require('./cart')
const db = require('../utils/database')


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  // Insert data to database
  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description])
  }


  static deleteById() {

  } 

  static fetchAll() {
   return db.execute('SELECT * FROM products')
  }
  // find one product in database
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
};
