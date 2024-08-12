import { validationResult } from "express-validator";
import User from "../../model/User.model.js";
import jwt from "jsonwebtoken";
import logger from "../../config/logger.config.js";
const signup = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    user = await User.create({ username, email, password });
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 9000 });
    return res.status(200).json({ token, user: { username, email } });
  } catch (error) {
    console.log(error.message);
    logger.error(error?.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export default signup;
