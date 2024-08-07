import axios from "axios";
import Website from "../model/Website.model.js";

const getWebsiteImmediately = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    const url =
      website.website.startsWith("http://") ||
      website.website.startsWith("https://")
        ? website.website
        : `http://${website.website}`;

    try {
      const response = await axios.get(url, { timeout: 5000 });

      if (response.status >= 200 && response.status < 300) {
        website.status = "Active";
      } else {
        website.status = "Down";
      }
      website.lastChecked = Date.now();
      await website.save();
      return res.status(200).json({
        msg: website.status,
        serverStatus: response.status,
        website,
      });
    } catch (error) {
      console.error("Axios error:", error.message);
      website.status = "Down";
      website.lastChecked = Date.now();
      await website.save();

      return res.status(503).json({
        msg: "Down",
        serverStatus: error.response ? error.response.status : 503,
        website,
      });
    }
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export default getWebsiteImmediately;
