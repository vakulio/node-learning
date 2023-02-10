const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}


exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        {
            docTitle: 'Add product',
            path: '/admin/add-product',
            activeAddProduct: true
        })
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            docTitle: 'Admin Products',
            path: 'admin/products',
        })
    })
}
