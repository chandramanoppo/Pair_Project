const router = require("express").Router();

const Controller = require("../controllers/controller");
router.get("/", Controller.renderLogin);

module.exports = router;
