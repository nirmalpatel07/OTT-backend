const rateLimit = require("express-rate-limit");

// LIMIT: 5 requests per 15 minutes per IP
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                 // limit each IP to 5 requests
  message: {
    message: "Too many signup attempts. Please try again after 15 minutes."
  },
  standardHeaders: true,  // return rate limit info in headers
  legacyHeaders: false   // disable X-RateLimit headers
});

module.exports = { signupLimiter };
