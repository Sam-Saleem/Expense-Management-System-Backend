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
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Expense Management System!");
});

const user = require("./routes/user");
app.use("/api/v1/user", user);

app.listen(port, () => {
  console.log(
    `Expense Management System backend listening at http://localhost:${port}`
  );
});
