// import MongoStore from "connect-mongo";

const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Expense_Management_System";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Conneted to Mongo Successfully."))

    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectToMongo;
