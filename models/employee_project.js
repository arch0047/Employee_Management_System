const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_project",
    {
      employee_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: " employees",
          key: " employee_id",
        },
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: " projects",
          key: " project_id",
        },
      },
    },
    {
      sequelize,
      tableName: "employee_project",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "employee_id" }, { name: "project_id" }],
        },
        {
          name: "employee_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
        
        {
          name: "project_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "project_id" }],
        },
      ],
    }
  );
};
