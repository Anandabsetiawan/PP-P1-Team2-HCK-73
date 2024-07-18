const express = require('express')
const seller = express.Router()
const SellerController = require('../controllers/sellerController')

seller.get('/product', SellerController.productList)

seller.get('/product/add', SellerController.showAddProduct)
seller.post('/product/add', SellerController.postAddProduct)

seller.get('/product/:id/edit', SellerController.showEditProduct)
seller.post('/product/:id/edit', SellerController.postEditProduct)

seller.get('/product/:id/delete', SellerController.deleteProduct)

module.exports = seller