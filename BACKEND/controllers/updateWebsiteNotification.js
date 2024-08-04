import Website from "../model/Website.model.js";

const updateWebsiteNotification = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    website.notificationsEnabled = req.body.notificationsEnabled;
    await website.save();
    res
      .status(200)
      .json({ msg: "Notification preference updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default updateWebsiteNotification;
