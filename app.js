const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// load the mysql routers to the app
require("./routes/routes.mysql")(app);
const path = require("path");
const PORT = process.env.PORT || 3000;


// server static files
app.use(express.static("frontend", { extensions: ["html", "ejs"] }));
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

//Allows the use of JSON (for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// server static files
app.use(express.static('frontend', { extensions: ['html'] }))

//welcome page
app.get('/welcome', (req, res) => {
    return res.sendFile(path.join(`${__dirname}/frontend/welcome.html`));
});

app.get("/contact", (req, res) => {
  return res.sendFile(path.join(`${__dirname}/frontend/contact.html`));
});

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