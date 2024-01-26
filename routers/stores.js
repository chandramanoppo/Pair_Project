const router = require("express").Router();

const Controller = require("../controllers/controller");

router.get("/", Controller.renderHome);
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handlerLogin);
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handlerRegister);
router.get('/logout', Controller.getLogOut)


router.use(function(req, res, next) {
    console.log(req.session);
    if(
        !req.session.userId
        ) {
        const error = "Please login first"
        res.redirect(`/stores/login?error=${error}`)
    } else {
        next()
    }
})

const isAdmin = function(req, res, next) {
    // console.log(req.session);
    if(
        req.session.userId
        && 
        req.session.role !== 'admin' 
        ) {    
        const error = "You have no acces"
        res.redirect(`/`)
    } else {
        next()
    }    
}


router.get('/shoes', Controller.shoeList)

router.get('/shoes/:id', Controller.shoesDetail)

router.get('/shoes/:id/buy', Controller.decreaseStock)

router.post('/shoes/:id/buy', Controller.BuyingTransaction)



router.use(isAdmin)

router.get('/shoes/:id/restock', Controller.RenderRestockShoes)

router.post('/shoes/:id/restock', Controller.HandlerestockShoes)


router.get('/shoes/:id/delete', Controller.DeleteShoes)


router.get("/chart", Controller.renderChart);

module.exports = router;
