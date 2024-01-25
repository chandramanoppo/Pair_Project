const {Brand, Customer, Shoe, Transaction, User} = require('../models/index')

const bcrypt = require('bcryptjs')

class Controller {
    
    
    static async registerForm (req, res) {
        try {
            
            res.render('register')
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async handleRegister(req, res){
        try {
            // console.log(req.body);
            const {email, password, role} = req.body
            
            await User.create({
                email, password, role
            })
            
            res.redirect('/login' , )
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    
    static async loginForm (req, res) {
        try {
            res.render('login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async handleLogin(req, res) {
        try {
            const {email, password} = req.body
            
            // console.log(req.body);
            
            const users = await User.findOne({
                where: {email}
            })
            
            // console.log(users);
            if(users){ 
                const valid = bcrypt.compareSync(password, users.password)
                if(valid){
  
                    req.session.userId = users.id
                    req.session.role = users.role 
                return res.redirect('/')
                    
                }else {
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }
            }else {
                const error = "invalid username/password"
                return res.redirect(`/login?error=${error}`)
            }

            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


    static getHome(req, res) {
        res.render('home')
        // let data = User.findAll()
        // res.send(data)
    }
    
    static async brandList (req, res) {
        try {
            let brands = await Brand.findAll( {order : [['id', 'ASC']]})
            // res.send(brands)
            res.render('brand' , {brands})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async shoeList (req, res) {
        try {
            let shoes = await Shoe.findAll( {order: [['id', 'ASC']]})
            res.render('shoe' , {shoes})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async shoesDetail(req, res){
        try {
            // console.log(req.params);
            let id = req.params.id
            let shoes = await Shoe.findAll({
                include: {
                    model: Brand,
                    attributes: ['name']
                },
                where : {BrandId : id},
                order: [['id', 'ASC']]
                
            })
            console.log(shoes);
            // res.send(shoes)
            res.render('shoesDetail', {shoes})
            // console.log(shoes);

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async decreaseStock(req, res) {
        try {
            // console.log(req.params);
            let id = req.params.id
            // console.log(req.body);
            let shoes = await Shoe.decrement({stock:1},{where:{id}})

            // console.log(shoes);
            res.redirect('/shoes')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async decreaseStockByBrand(req, res){
        try {
            console.log(req.params);
            let id = req.params.id

            let shoes = await Shoe.decrement({stock:1},{where:{id}})
            let brand = await Shoe.findOne({ where: {id}, include:Brand })
            // console.log(shoes);
            // console.log(brand, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     ');
            // res.send(shoes)
            // shoes.Brand.id
            res.redirect(`/brands/${brand.Brand.id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller