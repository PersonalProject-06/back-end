const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHanlder = require("express-async-handler");

const protect = asyncHanlder(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id).select("-password");
      if (!currentUser) {
        return res.status(401).json({ msg: "unauthorized" });
      }
      req.user = currentUser;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("unauthorized");
  }
});
module.exports = { protect };
