import User from "../model/User.model.js";
const unsubscribe = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send("User not found");
    }
    user.emailNotificationUser = false;
    await user.save();
    res
      .status(200)
      .send("You have successfully unsubscribed from email notifications.");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
export default unsubscribe;
