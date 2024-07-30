const express = require('express')
const router = express.Router()
const UserController = require('../controllers/usercontroller')

const buyer = require('./buyer')
const seller = require('./seller')

// get /register
router.get('/', UserController.homepage)
router.get('/register', UserController.registerForm)
// post /register
router.post('/register', UserController.postRegister)
// get /login
router.get('/login', UserController.loginForm)
// post /login
router.post('/login', UserController.postLogin)

router.use(function (req, res, next) {
    if (!req.session.UserId) {
        const error = "Please register before proceed"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }     
})

const buyerSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "buyer") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
}) 

const sellerSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "seller") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
})

router.use('/buyer', buyerSession, buyer)
router.use('/seller', sellerSession, seller)

router.get('/logout', UserController.logOut)

module.exports = router