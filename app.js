const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const PORT = process.env.PORT || 3000;


//Allows the use of JSON (for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/routes.mysql")(app);

// server static files
app.use(express.static("frontend", { extensions: ["html", "ejs"] }));
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));


//welcome page
app.get('/welcome', (req, res) => {
    return res.sendFile(path.join(`${__dirname}/frontend/welcome.html`));
});

//contact page
app.get("/contact", (req, res) => {
  return res.sendFile(path.join(`${__dirname}/frontend/contact.html`));
});
//about page
app.get("/about", (req, res) => {
  return res.sendFile(path.join(`${__dirname}/frontend/about.html`));
});




const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error on: ${error}`);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});

module.exports = server;