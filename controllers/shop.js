const Product = require('../models/product')
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((prod) => {
      res.render('shop/product-list', {
        prods: prod,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch((err) => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((prod) => {
      res.render('shop/product-detail', {
        product: prod,
        pageTitle: prod.title,
        path: '/products'
      })
    })
    .catch((err) => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((prod) => {
      res.render('shop/index', {
        prods: prod,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch((err) => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch((err) => {
      throw err
    })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product)
    })
    .then((result) => {
      res.redirect('/cart')
    })
    .catch((err) => {
      throw err
    })
}

exports.postCardDeleteItem = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect('/cart')
    })
    .catch((err) => console.log(err))
}

exports.postCreateOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      })
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })
      return order.save()
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch((err) => console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
    })
    .catch((err) => console.log(err))
}
