const { Product, Category } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")

class Controller {
    

    

    

    static async productDetail(req, res) {
        try {
            const { id } = req.params

            let product = await Product.findByPk(+id, {
                include: {
                    model: Category
                }
            })

            res.render('productDetails', { title: `${product.productName}`, product, rupiahFormat })

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller