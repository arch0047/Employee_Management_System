const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../connector/db");


router.get("/adminPage", (req, res) => {
})



// Create and Save a new admin
router.post("/AdminC",(req, res) => {

  try {
    db.sequelize.models.admin
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then((newAdmin) => res.send(newAdmin));
  } catch (error) {
    res.status(501).send(error);
  }
});

//Find admin by id

router.get("/findAdmin/:id", (req, res) => {
  db.sequelize.models.admin
    .findOne({
      where: { admin_id: req.params.id },
    })
    .then((oneAdmin) => {
      if (!oneAdmin) {
        res.status(404).send("Admin not found !");
      } else {
        res.send(oneAdmin.toJSON());
      }
    })
    .catch((err) => res.status(500).send(`Something went wrong ! + ${err}`));
});

// Update and Save admin

router.post("/updateAdmin/:id", async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  db.sequelize.models.admin
  await bcrypt.hash(password, 10).then((hash) => {
    db.sequelize.models
      .admin.update(
        {
          name: name,
          email: email,
          password: hash,
        },
        { where: { admin_id: req.params.id } }
      )
      .then((rowsaffected) => {
        if (rowsaffected == 0) {
          res.status(404).send("Admin not found !");
        } else {
          res.send("Admin with ID: " + req.params.id + " is Updated !");
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          message: "Unable to update data !",
          errors: error,
        });
      });
  });
});


// Delete an admin Do not want to delete admin

// Find all admin
router.get("/allAdmin", (req, res) => {
  db.sequelize.models.admin
    .findAll()
    .then((allAdmin) => res.send(allAdmin));
});




module.exports = router;




