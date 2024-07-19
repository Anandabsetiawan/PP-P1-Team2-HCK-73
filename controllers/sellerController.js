const { Product, Category, AccountProduct, Account } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")
const accountproduct = require("../models/accountproduct")

class SellerController {
    static async productList(req, res) {
        try {
            const { deleted } = req.query

            const { sellerId } = req.params

            let products = await Product.findAll({
                include: [
                    {
                        model: Account,
                        where: { id: sellerId }
                    },
                    {
                        model: Category
                    }
                ], 
                order: ["productName"],
            })
            let account = await Account.findByPk(sellerId)

            res.render('sellerProducts', { title: `Seller Products`, products, rupiahFormat, deleted, sellerId, account })

        } catch (error) {
            res.send(error)
        }
    }

    static async showAddProduct(req, res) {
        try {
            const { errors } = req.query
            const { sellerId } = req.params
            let categories = await Category.findAll()

            res.render('addProduct', { title: 'Add Product', categories, errors, sellerId })

        } catch (error) {
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            const { sellerId } = req.params

            const { productName, imageURL, CategoryId, price, stock, description } = req.body
            
            let newProduct = await Product.create({ 
                productName, imageURL, CategoryId, price, stock, description
            })

            await AccountProduct.create({AccountId: sellerId, ProductId: newProduct.id})

            res.redirect(`/seller/${sellerId}`)

        } catch (error) {
            const { sellerId } = req.params
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/${sellerId}/product/add?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async showEditProduct(req, res) {
        try {
            const { errors } = req.query
            const { id, sellerId } = req.params
            let product = await Product.findByPk(+id)
            let categories = await Category.findAll()

            res.render('editProduct', { title: 'Edit Product', product, categories, rupiahFormat, errors, sellerId })

        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProduct(req, res) {
        try {
            const { id, sellerId } = req.params

            const { productName, imageURL, CategoryId, price, stock, description } = req.body

            await Product.update({ productName, imageURL, CategoryId, price, stock, description }, { where: { id } })

            res.redirect(`/seller/${sellerId}`)

        } catch (error) {
            const { id, sellerId } = req.params
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/${sellerId}/product/${id}/edit?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id, sellerId } = req.params

            let deletedProduct = await Product.findByPk(+id)

            await AccountProduct.destroy({ where: { AccountId: sellerId,  ProductId: id} })

            await Product.destroy({ where: { id} })

            res.redirect(`/seller/${sellerId}?deleted=${deletedProduct.productName}`)

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = SellerController