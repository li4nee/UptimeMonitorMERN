import User from "../../model/User.model.js";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js";

const updateUserNotification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.emailNotificationUser = req.body.emailNotificationUser;
    await user.save();


    const cacheKey = `user:${req.user.id}:profile`;
    await client.del(cacheKey); 

    res
      .status(200)
      .json({ msg: "Notification preference updated successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error?.message);
    res.status(500).json({ error: "Server error" });
  }
};

export default updateUserNotification;
