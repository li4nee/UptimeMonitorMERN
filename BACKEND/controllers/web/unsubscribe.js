import User from "../../model/User.model.js";
import logger from "../../config/logger.config.js";
const unsubscribe = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send("User not found");
    }
    user.emailNotificationUser = false;
    await user.save();
    res.status(200).send(`
      <p>You have successfully unsubscribed from email notifications.</p>
      <Strong>Please login again to get subscribe </Strong>
    `);
  } catch (error) {
    console.log(error);
    logger.error(error?.message);
    res.status(500).send("Server error");
  }
};
export default unsubscribe;
