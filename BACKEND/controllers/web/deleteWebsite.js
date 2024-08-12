import Website from "../../model/Website.model.js";
import logger from "../../config/logger.config.js";
import client from "../../config/redis.config.js";

const deleteWebsite = async (req, res) => {
  try {
    const websiteId = req.params.id;
    const userId = req.user.id;

    // Delete the website from the database
    const response = await Website.deleteOne({
      _id: websiteId,
      user: userId,
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        error: "Website not found or you don't have permission to delete it",
      });
    }
    
    const cacheKey = `user${userId}websites`;
    await client.del(cacheKey);

    return res.status(200).json({ msg: "Website deleted successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error?.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteWebsite;
