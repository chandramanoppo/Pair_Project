const {Brand, Customer, Shoe, Transaction, User} = require('../models/index')

class Controller {
    static getHome(req, res) {
        res.render('home')
        // let data = User.findAll()
        // res.send(data)
    }

    static async brandList (req, res) {
        try {
            let brands = await Brand.findAll()
            // res.send(brands)
            res.render('brand' , {brands})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async shoeList (req, res) {
        try {
            let shoes = await Shoe.findAll()
            res.render('shoe' , {shoes})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
}

module.exports = Controller