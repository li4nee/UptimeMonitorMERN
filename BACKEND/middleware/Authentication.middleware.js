import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1].replace(/"/g, "");

    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }
    const jwtResponse = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = jwtResponse.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    req.user = {
      username: user.username,
      email: user.email,
      id: user._id,
      emailNotificationUser: user.emailNotificationUser,
    };

    next();
  } catch (error) {
    console.log(error.message, "at authentication middleware");
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};

export default authenticate;

