const { Product, Category } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")

class Controller {
    static async home(req, res) {
        try {
            const { search } = req.query
            
            let products = await Product.searchProduct(search)
            // let products = await Product.findAll()
            let categories = await Category.findAll()
            // let totalProducts = totalProducts()
            // console.log(totalProducts());

            res.render('homepage', { title: 'Homepage', products, categories, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }

    static async allCategories(req, res) {
        try {
            let products = await Product.findAll()
            let categories = await Category.findAll()
            // console.log(categories);

            res.render('allCategories', { title: 'All  Products', products, categories, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }

    static async sortByCategory(req, res) {
        try {
            const { CategoryId } = req.params

            let category = await Category.findByPk(+CategoryId, {
                include: {
                    model: Product
                }
            })

            let categories = await Category.findAll()

            // console.log(category);

            res.render('sortByCategory', { title: `${category.categoryName}`, category, categories, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }

    static async productDetail(req, res) {
        try {
            const { id } = req.params

            let product = await Product.findByPk(+id, {
                include: {
                    model: Category
                }
            })

            // console.log(product);

            res.render('productDetails', { title: `${product.productName}`, product, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller