const { Product, Category, AccountProduct, Account } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")
const qr = require('qrcode')

class BuyerController {
    static async home(req, res) {
        try {
            const { search } = req.query
            
            let products = await Product.searchProduct(search)

            let categories = await Category.findAll()

            res.render('homepage', { title: 'Homepage', products, categories, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }

    static async allCategories(req, res) {
        try {
            let products = await Product.findAll()
            let categories = await Category.findAll()

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

            res.render('sortByCategory', { title: `${category.categoryName}`, category, categories, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }

    static async buyProduct(req, res) {
        try {
            const { id } = req.params

            let product = await Product.findByPk(+id, {
                include: {
                    model: Category
                }
            })

            let dataQR = await Product.dataQR(+id)
            
            dataQR = JSON.stringify(dataQR)

            qr.toDataURL(dataQR, (err, qrDataURL) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error generating QR code');
                }
        
                res.render('buyProduct', { title: 'Buy Product', product, rupiahFormat, qrDataURL })
            });


        } catch (error) {
            res.send(error)
        }
    }

    static async decreaseStock(req, res) {
        try {
            const { id } = req.params
            let findProduct = await Product.findByPk(+id)
            await findProduct.decrement('stock', { by: 1 })

            res.redirect(`/buyer`)

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = BuyerController