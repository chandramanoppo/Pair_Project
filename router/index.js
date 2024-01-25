const Controller = require("../controllers/controller");

const router = require('express').Router()

router.get('/register' , Controller.registerForm)

router.post('/register' , Controller.handleRegister)

router.get('/login', Controller.loginForm)

router.post('/login', Controller.handleLogin)

router.get('/', Controller.getHome)

router.get('/logout', Controller.getLogOut)


router.use(function(req, res, next) {
    console.log(req.session);
    if(
        !req.session.userId
        ) {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
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

router.get(isAdmin)


router.get('/brands', Controller.brandList)
router.get('/brands/:id', Controller.shoesDetail)
router.get('/brands/:id/buy', Controller.decreaseStockByBrand)



router.get('/shoes', Controller.shoeList)

router.get('/shoes/:id/buy', Controller.decreaseStock)







module.exports = router