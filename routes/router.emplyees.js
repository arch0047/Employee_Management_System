const express = require("express");
const router = express.Router();
const { validateCreateEmp } = require("../util/validate");
const { tokenaAthentication } = require("../util/authenticate");
const bcrypt = require("bcrypt");
const db = require("../connector/db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const admin = require("../models/admin");




// Create and Save a new employee
router.post("/empC",tokenaAthentication("admin"), (req, res) => {

    const { error } = validateCreateEmp(req.body);
    if (error) return res.status(400).send(error.details[0].message); //400 = bad request

    // console.log(req.body);
  try {
    db.sequelize.models.employees
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        employee_phone: req.body.employee_phone,
        employee_location: req.body.employee_location,
        role_id: req.body.role_id,
        department_id: req.body.department_id,
        employee_salary: req.body.employee_salary,
      })
      .then((newemployee) => res.redirect("/allEmp"));
  } catch (error) {
    res.status(501).send(error);
  }
});

// Find all employee

router.get("/allEmp", tokenaAthentication("admin"), (req, res, error) => {
  db.sequelize.models.employees
    .findAll({ raw: true })
    .then((employees) => {
      res.render("allEmp.ejs", {
        title: "Employees List",
        employees: employees,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Find one employee by id rest

// router.get("/findOne/:id", (req, res) => {
//   db.sequelize.models.employees
//     .findOne({
//       where: { employee_id: req.params.id },
//     })
//     .then((oneEmployee) => {
//       if (!oneEmployee) {
//         res.status(404).send("Employee not found !");
//       } else {
//         res.send(oneEmployee.toJSON());
//       }
//     })
//     .catch((err) => res.status(500).send(`Something went wrong ! + ${err}`));
// });


// Update and Save employee
router.get("/findOne/:id", (req, res) => {
  db.sequelize.models.employees
    .findOne({
      where: { employee_id: req.params.id },
    })
    .then((employee) => {
      res.render("updateEmp.ejs", {
        title: "See Employee",
        employees: employee,
      });
    })
    .catch((err) => res.status(500).send(`Something went wrong ! + ${err}`));
});

// Delete an employee

router.get("/deleteEmp/:id", (req, res) => {
  db.sequelize.models.employees
    .destroy({ where: { employee_id: req.params.id } })
    .then((rowDeleted) => {
      if (rowDeleted == 0) {
        res.status(404).send("Employee not found");
      } else {
        res.status(200).redirect("/allEmp");
      }
    })
    .catch((err) => res.status(500).send("Something went wrong !"));
});

// Update and Save employee
router.get("/updateEmp/:id", tokenaAthentication("admin"), (req, res) => {
  db.sequelize.models.employees
    .findOne({
      where: { employee_id: req.params.id },
    })
    .then((employee) => {
      res.render("updateEmp.ejs", {
        title: "Update Employee",
        employees: employee,
      });
    })
    .catch((err) => res.status(500).send(`Something went wrong ! + ${err}`));
});



router.post("/updateEmp", (req, res) => {
   console.log(req.body);

  db.sequelize.models.employees
    .update(
      {
        name: req.body.name,
        email: req.body.email,
        employee_phone: req.body.employee_phone,
        employee_location: req.body.employee_location,
        role_id: req.body.role_id,
        department_id: req.body.department_id,
        employee_salary: req.body.employee_salary,
      },
      { where: { employee_id: req.body.employee_id } }
    )
    .then((rowsaffected) => {
      if (rowsaffected == 0) {
        res.status(404).send("Employee not found !" + req.body.employee_id);
      } else {
        res.redirect("/allEmp");
      }
    });
}); 



router.get("/searchEmp",tokenaAthentication("admin"), (req, res) => {
  res.render("searchEmp.ejs")

});


router.post("/search",tokenaAthentication("admin"), (req, res) => {

  var department_id = req.body.department_id;
  var employee_location = req.body.employee_location;

  if (department_id == 0) {
    department_id = ""
  }
  if (employee_location == 0) {
    employee_location = "";
  }

  if (department_id != "" && employee_location != "") {
    db.sequelize.models.employees
      .findAll({
        where: {
          [Op.and]: [
            { department_id: { [Op.like]: "%" + department_id + "%" } },
            { employee_location: { [Op.like]: "%" + employee_location + "%" } },
          ],
        },
      })
      .then((employees) => {
        res.render("allEmp.ejs", {
          title: "Employees List by term",
          employees: employees,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else if (employee_location != "") {
    db.sequelize.models.employees
      .findAll({
        where: {
          [Op.or]: [{ employee_location: { [Op.like]: "%" + employee_location + "%" } }],
        },
      })
      .then((employees) => {
        res.render("allEmp.ejs", {
          title: "Employees List by term",
          employees: employees,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else if (department_id != "") {
    db.sequelize.models.employees
      .findAll({
        where: {
          [Op.or]: [
            { department_id: { [Op.like]: "%" + department_id + "%" } },
          ],
        },
      })
      .then((employees) => {
        res.render("allEmp.ejs", {
          title: "Employees List by term",
          employees: employees,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else { 
    res.redirect("/searchEmp");}
});


router.get("/empList", (req, res, error) => {
  db.sequelize.models.employees
    .findAll({ raw: true })
    .then((employees) => {
      res.render("list.ejs", {
        title: "Employees List",
        employees: employees,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
