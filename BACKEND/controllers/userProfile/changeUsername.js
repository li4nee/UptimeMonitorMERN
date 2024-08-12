import User from "../../model/User.model.js";
import { validationResult } from "express-validator";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js";

const changeUsername = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newName = req.body.username;
    if (!newName) {
      return res.status(400).json({ error: "No username provided" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = newName;
    await user.save();
    const cacheKey = `user:${req.user.id}:profile`;
    await client.del(cacheKey); 

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error?.message);
    res.status(500).json({ error: "Server error" });
  }
};

export default changeUsername;
