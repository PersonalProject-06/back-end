const { protect } = require("../middlewares/AuthMiddelwares");
const {
  accessChat,
  getAllChats,
  createGroup,
  renameGroup,
  deleteGroup,
  addToGroup,
} = require("../controllers/chatControllers");

const chatRoutes = require("express").Router();

chatRoutes.route("/").post(protect, accessChat);
chatRoutes.route("/").get(protect, getAllChats);
chatRoutes.route("/group").post(protect, createGroup);
chatRoutes.route("/renamegroup").put(protect, renameGroup);
chatRoutes.route("/addgroup").post(protect, addToGroup);
chatRoutes.route("/deletegroup").delete(protect, deleteGroup);

module.exports = chatRoutes;
