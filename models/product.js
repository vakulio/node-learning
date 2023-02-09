const fs = require('fs');
const path = require('path');
const pathName = require('../utils/path')

const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(pathName, 'data', 'products.json');
        fs.readFile(p, (err, contents) => {
            let products = []
            if (!err) {
                products = JSON.parse(contents)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err, contents) => {
                console.log(err)
            })
        });
    }

    static fetchAll(cb) {
        const p = path.join(pathName, 'data', 'products.json');
        fs.readFile(p, (err, contents) => {
            if (err) {
                cb([])
            }
            cb(JSON.parse(contents))
        })
    }
}