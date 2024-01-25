const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
class Controller {
  static async renderHome(req, res) {
    try {
      let errorQuery = req.query.error;
      res.render("home", { errorQuery });
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
      console.log(req.body);
      const { email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      const validPassword = bcrypt.compareSync(password, user.password);

      if (validPassword) {
        res.render("chart");
      } else {
        let error = "Invalid Username or Password";
        return res.redirect(`/stores/login?error=${error}`);
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
