const rateLimiter = require("express-rate-limit");

module.exports = rateLimiter({
  windowMS: 10 * 60 * 1000, //keeps the attempts 'logged' for 10 min (600,000 miliseconds)
  max: 3, //Max attempts
  message: "You have exceeded maximum attempts. Try again in 5 min",
  statusCode: 429, //code for too many requests
});
