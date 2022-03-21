const express = require("express");
const chats = require("./data/data");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
app.use(bodyParser.json());
connectDB();
app.get("/", (req, res) => {
  res.json("chats");
});
app.get("/chat", (req, res) => {
  res.send(chats);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("servuer running");
});
