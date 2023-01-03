const rateLimiter = require("express-rate-limit");

module.exports = rateLimiter({
  windowMS: 05 * 60 * 1000, //keeps the attempts 'logged' for 5 min (300,000 miliseconds)
  max: 5, //Max attempts
  message: "You have exceeded maximum attempts. Try again in 5 min",
  statusCode: 429, //code for too many requests
});
