const mongoose = require("mongoose");
const { DB_NAME } = require("../utils/constants");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

module.exports = connectDB;
