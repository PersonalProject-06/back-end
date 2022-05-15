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

const server = app.listen(PORT, () => {
  console.log("server running");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joind chat ", room);
  });
  socket.on("new message", (newMessageRecived) => {
    let chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.users not defind");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecived.sender._id) return;
      socket.in(user._id).emit("message recived", newMessageRecived);
    });
  });
});
