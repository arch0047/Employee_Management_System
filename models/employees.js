const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Employees = sequelize.define(
    "employees",
    {
      employee_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(120),
        allowNull: false,
        len: {
          args: [8],
          msg: "Password must be 8 digits long",
        },
      },
      employee_phone: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        validate: {
          len: {
            args: [8,8],
            msg: "Phone number must be either 8 digits long",
          },
        },
      },
      employee_location: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "department_id",
        },
      },
      employee_salary: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employees",
      timestamps: false,
      indexes: [
        {
          name: "employee_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
        {
          name: "department_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "department_id" }],
        },
        {
          name: "role_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "role_id" }],
        },
      ],
    }
  );
  {
    hooks: 
    Employees.beforeCreate(async (employee) => {
      if (employee.password) {
        const salt = bcrypt.genSaltSync(10, "a");
        employee.password = bcrypt.hashSync(employee.password, salt);
        return bcrypt.hashSync(employee.password, bcrypt.genSaltSync(8), null);
      }
    });
  
      
  };
  
function encryptPasswordIfChanged(employees, options) {
  if (employees.changed("password")) {
    encryptPassword(employees.get("password"));
  }
}

Employees.beforeUpdate(encryptPasswordIfChanged);


   

  //Employees.sync();
  return Employees;
};
  


