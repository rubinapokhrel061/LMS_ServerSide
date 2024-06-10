const mongoose = require("mongoose");
const connectDatabaseString =
  "mongodb+srv://pokhrelrubina2061:TS3N76IPitX9hm5s@cluster1.a0ntasq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const connectToDatabase = async () => {
  await mongoose.connect(connectDatabaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connect succesfully");
};

module.exports = connectToDatabase;
