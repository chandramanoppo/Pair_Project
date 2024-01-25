const router = require("express").Router();

const Controller = require("../controllers/controller");

router.get("/", Controller.renderHome);
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handlerLogin);
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handlerRegister);
router.get("/chart", Controller.renderChart);

module.exports = router;
