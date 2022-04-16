const messageRoutes = require("express").Router();
const { protect } = require("../middlewares/AuthMiddelwares");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
messageRoutes.route("/").post(protect, sendMessage);
messageRoutes.route("/:chatId").get(protect, allMessages);

module.exports = messageRoutes;
