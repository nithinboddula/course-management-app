const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "secret_key");
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = authMiddleware;
