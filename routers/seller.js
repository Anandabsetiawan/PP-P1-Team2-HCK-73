const express = require('express')
const seller = express.Router()
const SellerController = require('../controllers/sellerController')

seller.get('/:sellerId', SellerController.productList)

seller.get('/:sellerId/product/add', SellerController.showAddProduct)
seller.post('/:sellerId/product/add', SellerController.postAddProduct)

seller.get('/:sellerId/product/:id/edit', SellerController.showEditProduct)
seller.post('/:sellerId/product/:id/edit', SellerController.postEditProduct)

seller.get('/:sellerId/product/:id/delete', SellerController.deleteProduct)

module.exports = seller