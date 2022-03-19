const express = require("express");
const chats = require("./data/data");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json(chats);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("servuer running");
});
