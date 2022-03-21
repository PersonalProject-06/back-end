const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.createConnection(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`Mongo connected`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
