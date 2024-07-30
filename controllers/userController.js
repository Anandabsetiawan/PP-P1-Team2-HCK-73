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
            console.log(req.body);

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

            if(email.length === 0) {
                throw {name: "required-email"}
            }

            if(password.length === 0) {
                throw {name: "required-password"}
            }
            
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
                    throw {name: "invalid-user"}
                }
            }else{
                throw {name: "invalid-user"}
            }
        } catch (error) {
            if(error.name === "required-email") {
                error = "email is required";
                res.redirect(`/login?errors=${error}`)
            }
            else if(error.name === "required-password") {
                error = "password is required";
                res.redirect(`/login?errors=${error}`)
            }
            else if(error.name === "invalid-user") {
                error = "invalid email / password";
                res.redirect(`/login?errors=${error}`)
            }
            else if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
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