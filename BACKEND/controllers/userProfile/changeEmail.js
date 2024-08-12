import { validationResult } from "express-validator";
import User from "../../model/User.model.js";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js";

const changeEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.user;
    const newEmail = req.body.newEmail;
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = newEmail;
    await user.save();

    const cacheKey = `user:${id}:profile`;
    await client.del(cacheKey);

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default changeEmail;
