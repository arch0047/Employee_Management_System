var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _departments = require("./departments");
var _employee_project = require("./employee_project");
var _Employees = require("./employees");
var _project_status = require("./project_status");
var _projects = require("./projects");
var _roles = require("./roles");
var _employee_details = require("./employee_details");


function initModels(sequelize) {
    var admin = _admin(sequelize, DataTypes);
    var departments = _departments(sequelize, DataTypes);
    var employee_project = _employee_project(sequelize, DataTypes);
    var Employees = _Employees(sequelize, DataTypes);
    var project_status = _project_status(sequelize, DataTypes);
    var projects = _projects(sequelize, DataTypes);
    var roles = _roles(sequelize, DataTypes);
    var employee_details =_employee_details(sequelize, DataTypes);


// Employees.belongsToMany(projects, { as: "project_id_projects", through: employee_project, foreignKey: "employee_id", otherKey: "project_id",});
// projects.belongsToMany(Employees, { as: "employee_id_employees", through: employee_project, foreignKey: "project_id", otherKey: "employee_id",});
    
// roles.hasMany(Employees, { as: "employees", foreignKey: "role_id" });   
// Employees.belongsTo(roles, { as: "roles", foreignKey: "employee_id" });

// departments.hasMany(Employees, { as: "employees", foreignKey: "department_id",}); 
// Employees.belongsTo(departments, { as: "departments",foreignKey: "employee_id",});    

// departments.hasMany(projects, { as: "projects", foreignKey: "department_id",});  
// projects.belongsTo(departments, { as: "departments", foreignKey: "project_id",}); 

// project_status.hasMany(projects, { as: "projects", foreignKey: "status_id",});   
// projects.belongsTo(project_status, { as: "project_status", foreignKey: "project_id",}); 
    
// employee_project.belongsTo(Employees, { as: "employees", foreignKey: "employee_id", });
    
// Employees.hasMany(employee_project, { as: "employee_project", foreignKey: "employee_id",}); 

return {
    admin,
    departments,
    employee_project,
    Employees,
    projects,
    project_status,
    roles,
    employee_details 
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
