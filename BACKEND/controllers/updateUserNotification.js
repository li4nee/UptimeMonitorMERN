import User from "../model/User.model.js";

const updateUserNotification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.emailNotificationUser = req.body.emailNotificationUser;
    await user.save();
    res
      .status(200)
      .json({ msg: "Notification preference updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default updateUserNotification;
