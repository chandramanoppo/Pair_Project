const Controller = require("../controllers/controller");

const router = require('express').Router()

router.get('/', Controller.getHome)
router.get('/data', Controller.testingData)


module.exports = router