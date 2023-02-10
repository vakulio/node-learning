const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: '/products',
        })
    })
}


exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Shop',
            path: '/',
        })
    })
}

exports.getCart = (req, res) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path: '/cart',
    })
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout',
    })
}
