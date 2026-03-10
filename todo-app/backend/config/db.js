const mongoose = require("mongoose");

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB database connected successfully");

  }catch (error){
    console.error("Failed to connect with mongoDB", error);
    process.exit(1);
  }
}

module.exports = connectDB;