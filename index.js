const connectToMongo = require("./db");

const express = require("express");
var cors = require("cors");
require("dotenv").config();

connectToMongo();
const app = express();
const port = process.env.PORT;

//using cors
app.use(cors());
//if you want to use the body of request use a middle-ware:
app.use(express.json());
//and set the  header content-type as json

// Available Routes:
app.get("/api", (req, res) => {
  res.send("Welcome to Expense Management System!");
});

const user = require("./routes/user");
app.use("/api/user", user);

const location = require("./routes/location");
app.use("/api/location", location);

const categoryType = require("./routes/categoryType");
app.use("/api/category", categoryType);

app.listen(port, () => {
  console.log(
    `Expense Management System backend listening at http://localhost:${port}`
  );
});
