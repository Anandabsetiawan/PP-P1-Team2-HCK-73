const express = require('express')
const buyer = express.Router()
const BuyerController = require('../controllers/buyerController')

buyer.get('/', BuyerController.home)
buyer.get('/categories', BuyerController.allCategories)
buyer.get('/categories/:CategoryId', BuyerController.sortByCategory)

buyer.get('/buyProduct/:id', BuyerController.buyProduct)
buyer.get('/buyProduct/:id/stockDecrease', BuyerController.decreaseStock)

module.exports = buyer