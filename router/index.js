const Controller = require("../controllers/controller");

const router = require('express').Router()

router.get('/', Controller.getHome)

router.get('/brands', Controller.brandList)

router.get('/shoes', Controller.shoeList)



module.exports = router