const express = require('express')

const rootDir = require('../utils/path')
const router = express.Router()
const path = require('path')

const products = []

router.get('/add-product', (req, res, next) => {
	res.render('add-product', { docTitle: 'Add product', path: '/admin/add-product' })
})

router.post('/add-product', (req, res, next) => {
	products.push({title: req.body.title})
	console.log(products)
	res.redirect('/')
})



exports.routes = router
exports.products = products