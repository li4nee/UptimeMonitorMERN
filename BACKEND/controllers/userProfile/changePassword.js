import { validationResult } from "express-validator";
import User from "../../model/User.model.js";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js"; 

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.user;
    const { newPassword, oldPassword } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = await user.checkPassword(oldPassword);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    user.password = newPassword;
    await user.save();


    const cacheKey = `user:${id}:profile`;
    await client.del(cacheKey); 

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default changePassword;
