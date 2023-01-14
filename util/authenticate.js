const jwt = require('jsonwebtoken');


const tokenaAthentication = (role) => {
  return (req, res, next) => {
      const cookie = req.headers['cookie'];
      console.log(cookie);
      const token = cookie && cookie.split("accessToken=")[1];
      console.log(token)
    if (token == null)
      return res.status(401).send("You need to login ! ");

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      console.log(role)
      console.log(user.role);
      if (error) return res.sendStatus(403);
      if ((user.role == role)) {
        req.user = user;
        next();
      } else {
        return res.status(403).send("User is not: " + role);
      }
    });
  };
};


module.exports.tokenaAthentication = tokenaAthentication;