const { Product, Category } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")

class SellerController {
    static async productList(req, res) {
        try {
            const { deleted } = req.query

            let products = await Product.findAll({
                order: ["productName"],
                include: {
                    model: Category
                }
            })

            res.render('sellerProducts', { title: 'Seller Products', products, rupiahFormat, deleted })

        } catch (error) {
            res.send(error)
        }
    }

    static async showAddProduct(req, res) {
        try {
            const { errors } = req.query
            let categories = await Category.findAll()

            res.render('addProduct', { title: 'Add Product', categories, errors })

        } catch (error) {
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            const { productName, imageURL, CategoryId, price, stock, description } = req.body
            // console.log(req.body);

            await Product.create({ productName, imageURL, CategoryId, price, stock, description })

            res.redirect('/seller/product')

        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/product/add?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async showEditProduct(req, res) {
        try {
            const { errors } = req.query
            const { id } = req.params
            let product = await Product.findByPk(+id)
            let categories = await Category.findAll()
            // console.log(product);

            res.render('editProduct', { title: 'Edit Product', product, categories, rupiahFormat, errors })

        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProduct(req, res) {
        try {
            const { id } = req.params

            const { productName, imageURL, CategoryId, price, stock, description } = req.body

            await Product.update({ productName, imageURL, CategoryId, price, stock, description }, { where: { id } })

            res.redirect(`/seller/product`)

        } catch (error) {
            const { id } = req.params
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/product/${id}/edit?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params

            let deletedProduct = await Product.findByPk(+id)

            await Product.destroy({ where: { id } })

            res.redirect(`/seller/product?deleted=${deletedProduct.productName}`)

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = SellerController