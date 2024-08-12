import Website from "../../model/Website.model.js";
import logger from "../../config/logger.config.js";

const getAllWebsites = async (req, res) => {
  try {
    const id = req.user.id;
    const websites = await Website.find({ user: id });
    return res
      .status(200)
      .json({ websites, userNotification: req.user.emailNotificationUser });
  } catch (error) {
    console.log(error);
    logger.error(error?.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllWebsites;

// const cachedData = await client.get("user"+id +"websites");
// if (cachedData) {
//   return res.status(200).json({ websites: JSON.parse(cachedData) });
// }
// await client.set("user"+id +"websites", JSON.stringify(websites), "EX", 60);
