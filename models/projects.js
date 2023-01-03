const Sequelize = require("sequelize");



module.exports = function (sequelize, DataTypes) {

  const Projects = sequelize.define(
    "projects",
    {
      project_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      project_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "department_id",
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "project_status",
          key: "status_id",
        },
      },
      assigned_to: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "projects",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "project_id" }],
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

