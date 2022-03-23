const UserRouter = require("express").Router();
const {registerUser,userAuth} = require("../controllers/userContoller");

UserRouter.route("/").post(registerUser);
UserRouter.post("/login",userAuth)
module.exports = UserRouter;
