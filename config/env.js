require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME || "sid",
  SESSION_DURATION: parseInt(process.env.SESSION_DURATION) || 21600, // 6 hrs in seconds
};
