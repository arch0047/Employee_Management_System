const { Sequelize } = require("sequelize");
const { initModels } = require("../models/init-models.js");
const dotenv = require("dotenv");
dotenv.config();

// define mysql database connection
const sequelize = new Sequelize({

  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
});
// define sequelize models
initModels(sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to database has been established successfully");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

module.exports = db;



//This creates the table if it doesn't exist (and does nothing if it already exists)
//db.sequelize.sync(),

//This creates the table, dropping it first if it already existed
//db.sequelize.sync({ force: true }) 

//This checks what is the current state of the table in the database (which columns it has,
// what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
//db.sequelize.sync({ alter: true });