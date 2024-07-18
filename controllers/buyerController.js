const { Product, Category } = require("../models")
const { Op } = require("sequelize")
const rupiahFormat = require("../helpers/rupiahFormat")
const qr = require('qrcode')

class BuyerController {
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

            res.redirect(`/`)

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = BuyerController