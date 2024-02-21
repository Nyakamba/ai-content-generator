const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://omwegaenock:enock4501@ai-mern.noph0yj.mongodb.net/AI-MERN?retryWrites=true&w=majority"
    );
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error.message}`);
  }
};

module.exports = connectDB;
