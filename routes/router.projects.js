const express = require("express");
const router = express.Router();
const db = require("../connector/db");
const Departments = require("../models/departments");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


// Create and Save a new employee


router.post("/createProject", (req, res) => {
  try {
    db.sequelize.models.projects
      .create({
        project_name: req.body.project_name,
        department_id: req.body.department_id,
        status_id: req.body.status_id,
        assigned_to: req.body.assigned_to,
      })
      .then((newProject) => res.redirect("/allProjects"));
  } catch (error) {
    res.status(501).send(error);
  }
});



router.get("/searchPro", (req, res) => {
  res.render("searchPro.ejs");
});

router.post("/searchProject", (req, res) => {
  var department_id = req.body.department_id;
  var status_id = req.body.status_id;

  console.log(department_id)
  console.log(status_id);
  if (department_id == "0") {
    department_id = "";
  }
  if (status_id == "0") {
    status_id = "";
  }
  
  if (department_id != "" && status_id != "") {
    db.sequelize.models.projects
      .findAll({
        where: {
          [Op.and]: [
            { department_id: { [Op.like]: "%" + department_id + "%" } },
            { status_id: { [Op.like]: "%" + status_id + "%" } },
          ],
        },
      })
      .then((projects) => {
        res.render("allProject.ejs", {
          title: "projects List by term",
          projects: projects,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (status_id !="") {
    db.sequelize.models.projects
      .findAll({
        where: {
          [Op.or]: [
            { status_id: { [Op.like]: "%" + status_id + "%" } },
          ],
        },
      })
      .then((projects) => {
        res.render("allProject.ejs", {
          title: "projects List by Search term",
          projects: projects,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (department_id != "") {
    db.sequelize.models.projects
      .findAll({
        where: {
          [Op.or]: [
            { department_id: { [Op.like]: "%" + department_id + "%" } },
          ],
        },
      })
      .then((projects) => {
        res.render("allProject.ejs", {
          title: "projects List by term",
          projects: projects,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else
    res.send.json({ message: "project doesn't exist" })
});


// find one and update

router.get("/updatePro/:id", (req, res) => {
  db.sequelize.models.projects
    .findOne({
      where: { project_id: req.params.id },
    })
    .then((project) => {
      res.render("updatePro.ejs", {
        title: "Update Project",
        projects: project,
      });
    })
    .catch((err) => res.status(500).send(`Something went wrong ! + ${err}`));
});

// Update and Save project

router.post("/updatePro", (req, res) => {
  db.sequelize.models.projects
    .update(
      {
        project_name: req.body.project_name,
        department_id: req.body.department_id,
        status_id: req.body.status_id,
        assigned_to: req.body.assigned_to,
      },
      { where: { project_id: req.body.project_id } }
    )
    .then((rowsaffected) => {
      if (rowsaffected == 0) {
        res.status(404).send("Projectnot found !" + req.body.employee_id);
      } else {
        res.redirect("/allProjects");
      }
    });
});

// no need to delete the project as want to keep record of all projects

// Delete a Project
router.get("/deletePro/:id", (req, res) => {
  db.sequelize.models.projects
    .destroy({ where: { project_id: req.params.id } })
    .then((rowDeleted) => {
      if (rowDeleted == 0) {
        res.status(404).send("Project not found");
      } else {
        res.status(200).redirect("/allProjects");
      }
    })
    .catch((err) => res.status(500).send("Something went wrong !"));
});


// Find all projects

router.get("/allProjects", (req, res, error) => {
  db.sequelize.models.projects
    .findAll()
    .then((projects) => {
      res.render("allProject.ejs", {
        title: "Project List",
        projects: projects,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});



module.exports = router;
