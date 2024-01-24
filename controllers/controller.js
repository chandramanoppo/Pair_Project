const {Brand, Customer, Shoe, Transaction, User} = require('../models/index')

class Controller {
    static getHome(req, res) {
        res.render('home')
    }
    
}

module.exports = Controller