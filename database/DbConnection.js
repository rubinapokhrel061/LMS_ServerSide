const mongoose = require("mongoose");
const connectDatabaseString =
  "mongodb+srv://pokhrelrubina2061:Vo7PNGF1m68SpDR8@cluster0.hdfpviw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDatabase = async () => {
  await mongoose.connect(connectDatabaseString);
  console.log("Database connect succesfully");
};

module.exports = connectToDatabase;
