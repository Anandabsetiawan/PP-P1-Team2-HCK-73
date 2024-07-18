const express = require('express')
const router = express.Router()
const UserController = require('../controllers/usercontroller')


// get /register
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
            return res.redirect(`/login?error=${error}`)
        }else{
            next()       
        }     
}) 

const buyer = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "buyer") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?error=${error}`)
    }else{
        next()       
    }
}) 

const seller = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "seller") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?error=${error}`)
    }else{
        next()       
    }
})


// get /home dummy
router.get('/',buyer, UserController.home)
// get/ logout
router.get('/logout', UserController.logOut)
// router.get('/', Controller.home)
// router.get('/arts/add', Controller.showAddForm)
// router.post('/arts/add', Controller.postData)
// router.get('/arts/:id', Controller.getArtById)
// router.post('/arts/:id/edit', Controller.postEdit)
// router.get('/arts/:id/delete', Controller.deleteArtById)



module.exports = router