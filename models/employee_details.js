const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_details",
    {
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Fullname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Location: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      Position: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      Department_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Projects: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      treatAsView: true,
      viewDefinition: `
      CREATE VIEW "employee_details" AS
      SELECT 
      emp.employee_id AS employee_id,
      employee_name AS Fullname,
      employee_email AS Email,
      employee_phone AS Phone,
      employee_location AS Location,
      ro.role_name AS Position,
      dep.department_name AS Department_name,
      pro.project_name AS Projects
      FROM 
      employees AS emp INNER JOIN roles AS ro, departments AS dep, projects As pro , employee_project AS ep
      WHERE pro.department_id = dep.department_id
      AND pro.project_id = ep.project_id
      AND emp.role_id = ro.role_id;
    `,
    },

    {
      sequelize,
      viewName: "employee_details",
      timestamps: false,
    }
    
  );
};
