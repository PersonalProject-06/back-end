const UserRouter = require("express").Router();
const { registerUser, userAuth ,allUsers} = require("../controllers/userContoller");
const { protect } = require("../middlewares/AuthMiddelwares");

UserRouter.route("/").post(registerUser).get(protect ,allUsers);
UserRouter.post("/login", userAuth);
module.exports = UserRouter;
