const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "locations",
    {
      location_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      location_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "locations",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "location_id" }],
        },
      ],
    }
  );
};

