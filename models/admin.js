const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define(
    "admin",
    {
      admin_id: {
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
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "admin",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "admin_id" }],
        },
        {
          name: "admin_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "admin_id" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
 
  Admin.beforeCreate(async (admin) => {
    if (admin.password) {
      const salt = await bcrypt.genSaltSync(10, "a");
      admin.password = bcrypt.hashSync(admin.password, salt);
      return bcrypt.hashSync( admin.password, bcrypt.genSaltSync(8), null);
    }
  });

  
 // Admin.sync();
};



