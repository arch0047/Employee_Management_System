const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "project_status",
    {
      status_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "project_status",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "status_id" }],
        },
        {
          name: "status_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "status_id" }],
        },
      ],
    }
  );
};
