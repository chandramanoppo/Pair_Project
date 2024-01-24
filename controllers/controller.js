const {Brand, Customer, Shoe, Transaction, User} = require('../models/index')

class Controller {
    static getHome(req, res) {
        res.render('home')
        // let data = User.findAll()
        // res.send(data)
    }

    static async testingData(req, res) {
        try {
            let users = await User.findOne({})
            // console.log(users);
            // res.send(users)
            let shoes = await Shoe.findAll({
                include: {
                    model: Customer,
                    // include: Customer
                }
            })
            res.send(shoes)



        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
}

module.exports = Controller