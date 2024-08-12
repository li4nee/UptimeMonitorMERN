import { validationResult } from "express-validator";
import User from "../../model/User.model.js";
import jwt from "jsonwebtoken";
import logger from "../../config/logger.config.js";
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Email address not found. Please register for an account",
      });
    }
    const isVerified = await user.checkPassword(password);
    if (!isVerified) {
      return res.status(400).json({ error: "Wrong password" });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: 9000,
    });
    return res
      .status(200)
      .json({ token, user: { username: user.email, email } });
  } catch (error) {
    console.log(error.message);
    logger.error(error?.message);
    return res.status(500).json({ error: "Server error" });
  }
};
export default login;
