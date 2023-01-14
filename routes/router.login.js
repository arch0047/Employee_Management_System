const express = require("express");
const router = express.Router();
const { validateLogin } = require("../util/validate");
// const {tokenaAthentication} =require("../util/authenticate")
const ratelimiter = require("../util/rete-limiter");
const path = require("path");
const db = require("../connector/db");
const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();


router.post("/login", ratelimiter, async (req, res) => {
  
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message); //400 = bad request

    //Retrieve the input from frontend
    const email = req.body.email;
    const plainPassword = req.body.password;
    // console.log(req.body.email);

  
    const admin = await db.sequelize.models.admin.findOne({
      where: { email: email },
    });
    
    const employee = await db.sequelize.models.employees.findOne({
      where: { email: email },
    });
  
    if (admin == null && employee == null) {
      res.status(400).json({ message: "User doesn't exist" });

    } else if (employee) {
      if (await bcrypt.compare(plainPassword, employee.password)) {
        const accessToken = jwt.sign(
          {role:'employee', email: employee.email, id: employee.employee_id },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .cookie("accessToken", accessToken)
          // .redirect("/employeePage")
          .render("employeePage.ejs", {
            title: "Employees home page",
            employees: employee,
          });
        console.log(accessToken);
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else if (admin) {
      if (await bcrypt.compare(plainPassword, admin.password)) {
        const accessToken = jwt.sign(
          {role:'admin', email: admin.email, id: admin.id },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .cookie("accessToken", accessToken)
          .render("adminPage.ejs", {
            title: "Admin home page",
            admin: admin,
          });
        console.log(accessToken);
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
});


router.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    return res.status(200).redirect('/login')
})


module.exports = router;
