const mongoose = require("mongoose");

const connectDatabase = async (mongoURI) => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log("Database Conenction Succesful......");
  } catch (err) {
    console.error("Database connection failed => ", err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
