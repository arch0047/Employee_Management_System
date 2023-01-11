const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const tokenaAthentication = (role) => {
  return (req, res, next) => {
      const authHeader = req.headers[("authorization", accessToken)];
      console.log(authHeader);
      const token = authHeader && authHeader.split(" ")[1];
      console.log(token)
    if (token == null)
      return res.status(401).send("You do not have access to this page");

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.sendStatus(403);
      if ((decoded.role = role)) {
        req.email = decoded.email;
        next();
      } else {
        return res.status(403).send("User is not: " + role);
      }
    });
  };
};

module.exports.tokenaAthentication = tokenaAthentication;