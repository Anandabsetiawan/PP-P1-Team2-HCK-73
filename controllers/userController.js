const { User, Account } = require('../models/index')
const bcrypt = require('bcryptjs')


class UserController {
    static async homepage(req, res) {
        try {
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
    static async registerForm(req, res) {
        try {
            const {errors}  = req.query
 
            res.render('registerForm', {errors})
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegister(req, res) {
        try {
            const { name, email, password, address, phoneNumber, role } = req.body

            let new_user = await User.create({ email, password, role })

            await Account.create({ name, address, phoneNumber, UserId: new_user.id, role })

            res.redirect('/login')
        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }
    static async loginForm(req, res) {
        try {
            const {errors}  = req.query

            res.render('loginForm', {errors})
        } catch (error) {
            res.send(error)
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

                    if (findUser.role === "buyer") {
                        return res.redirect('/buyer')
                    } else if (findUser.role === "seller") {
                        let account = await Account.findOne({
                            where: {
                                UserId: findUser.id
                            }
                        })
                        return res.redirect(`/seller/${account.id}`)
                    }

                } else {
                    const error = "invalid Email / Password"
                    return res.redirect(`/login?errors=${error}`)
                }
            }else{
                const error = "invalid Email / Password"
                return res.redirect(`/login?errors=${error}`)
            }
        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/login?errors=${error}`)
            }
            else {
                res.send(error)
            } 
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