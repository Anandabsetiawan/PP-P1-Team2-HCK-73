const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

const buyer = require('./buyer')
const seller = require('./seller')

router.use('/buyer', buyer)
router.use('/seller', seller)

router.get('/', Controller.home)
router.get('/categories', Controller.allCategories)
router.get('/categories/:CategoryId', Controller.sortByCategory)
router.get('/product/:id', Controller.productDetail)

module.exports = router