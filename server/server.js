require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
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
//------------deployment---------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/front/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "front", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Is running");
  });
}

//------------deployment---------------
app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.ORIGIN_URL,
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {

    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecived) => {
    let chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.users not defind");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecived.sender._id) return;
      socket.in(user._id).emit("message recived", newMessageRecived);
    });
  });
  socket.off("setup", () => {
    console.log("user disconected");
    socket.leave(userData._id);
  });
});
