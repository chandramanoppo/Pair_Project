// const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

const {Brand, Customer, Shoe, Transaction, User} = require('../models/index');
const formatCurrency = require("../helper/formatcurreny");

// formatCurrency
class Controller {
  static async renderHome(req, res) {
    try {
      let errorQuery = req.query.error;
      // let shoes = await Shoe.findAll()
      let shoes = await Shoe.findAll( {order: [['id', 'ASC']]})
  
      res.render("home", { errorQuery , shoes , formatCurrency});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static renderLogin(req, res) {
    let errorQuery = req.query.error;
    res.render("login", { errorQuery });
  }

  static async handlerLogin(req, res) {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      let users = await User.findOne({ where: { email } });
      // const validPassword = bcrypt.compareSync(password, user.password);
      
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
      res.send(error);
      console.log(error);
    }
  }

  static renderRegister(req, res) {
    res.render("register");
  }

  static async handlerRegister(req, res) {
    try {
      const { email, password } = req.body;
      await User.create({ email, password });
      res.redirect("/stores/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getLogOut(req,res) {
    try {
        req.session.destroy((err) => {
            if (err){
                res.send(err)
            } 
            else {
                res.redirect('/stores/login')
            }
        })
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
          where : {id},
          order: [['id', 'ASC']],
          plain : true
          
      })
      // console.log(shoes, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      // res.send(shoes)
      res.render('test2', {shoes , formatCurrency})
      // console.log(shoes);

  } catch (error) {
      console.log(error);
      res.send(error)
  }
}

static async shoeList (req, res) {
  try {
      let shoes = await Shoe.findAll(
         {
          include : {
            model : Brand,
            attributes: ['name']
          }
        },
      {order: [['id', 'ASC']]
    })
      // res.send(shoes)
      res.render('test' , {shoes , formatCurrency})
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
      let shoes = await Shoe.decrement({stock:1},{where:{id}}, {order: [['id', 'ASC']]})

      // console.log(shoes);
      res.redirect('/stores/shoes')

  } catch (error) {
      console.log(error);
      res.send(error)
  }
}

static async RenderRestockShoes(req, res) {
  try {
  //    console.log(req.params);
  let id = req.params.id
  let shoes = await Shoe.findOne({where : {id}})

  // console.log(shoes, "????????????????????????????????????????????????????????????????");
  // res.send(shoes)
  res.render('restock', {shoes})

  } catch (error) {
      console.log(error);
      res.send(error)
  }
}

static async HandlerestockShoes(req, res) {
  try {
      
  } catch (error) {
      console.log(err);
      res.send(err)
  }
}

static async DeleteShoes(req,res){
  try {
    
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

  static async renderChart(req, res) {
    try {
      res.render("chart");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
