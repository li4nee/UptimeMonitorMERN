import User from "../../model/User.model.js";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js";

const showProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user:${userId}:profile`;
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const user = await User.findById(userId).select("-password").select("-_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await client.set(cacheKey, JSON.stringify(user), "EX", 500);

    res.status(200).json(user);
  } catch (error) {
    logger.error(error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default showProfile;
