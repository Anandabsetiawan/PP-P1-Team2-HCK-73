const { where } = require('sequelize')
const { User, Account } = require('../models/index')
const bcrypt = require('bcryptjs')


class UserController {
    static async registerForm(req, res) {
        try {
            res.render('registerForm')
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postRegister(req, res) {
        try {
            const { name, accountEmail, accountPassword, address, phoneNumber, role } = req.body
            console.log(req.body);
            // 1. create user ditampung k dalam variabel new_user
            let new_user = await User.create({ email: accountEmail, password: accountPassword, role })
            // 2. create account dengan UserId adalah new_user.id

            await Account.create({ name, address, phoneNumber, UserId: new_user.id, role })

            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }
    static async loginForm(req, res) {
        try {
            res.render('loginForm')
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postLogin(req, res) {
        try {
            const { email, password } = req.body
            
            let findUser = await User.findOne({ where: { email } })
            
            if (findUser) {
                const isValidPassword = bcrypt.compareSync(password, findUser.password)
                
                if (isValidPassword) {

                    req.session.UserId = findUser.id
                    req.session.role = findUser.role;

                    return res.redirect('/') // menuju ke halaman home buyer/ seller
                } else {
                    const error = "invalid Email / Password"
                    return res.redirect(`/login?error=${error}`)// balik ke halaman login lagi dan mengembalikan nilai error
                }
            }else{
                const error = "invalid Email / Password"
                return res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
           
            res.send(error.message)
        }
    }
    static async home(req, res) {
        try {
            res.render('logout')
        } catch (error) {
            res.send(error.message)
        }
    }
    static async logOut(req, res){
        req.session.destroy((error)=>{
            if (error) {
                res.send(error)
            }else{
                res.redirect('/login')
            }
        }) 

        
    }
}
module.exports = UserController