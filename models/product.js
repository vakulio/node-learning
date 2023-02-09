const fs = require('fs');
const path = require('path');
const pathName = require('../utils/path')

const p = path.join(pathName, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, contents) => {
        if (err) {
            return cb([])
        } else {
            cb(JSON.parse(contents))
        }
    })
}


module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err, contents) => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}