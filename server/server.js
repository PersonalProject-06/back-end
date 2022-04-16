require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
connectDB();
const cors = require("cors");
const app = express();
const UserRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddelwares");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/user", UserRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("servuer running");
});
