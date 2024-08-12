import Website from "../../model/Website.model.js";
import axios from "axios";
import logger from "../../config/logger.config.js";

const getPerformance = async (req, res) => {
  try {
    const websiteId = req.params.id;
    const website = await Website.findOne({
      _id: websiteId,
      user: req.user.id,
    });

    if (!website) {
      return res.status(400).json({ error: "Website not found" });
    }

    const url =
      website.website.startsWith("http://") ||
      website.website.startsWith("https://")
        ? website.website
        : `http://${website.website}`;

    try {
      const start = performance.now();
      const response = await axios.get(url, { timeout: 5000 });
      const timeTaken = performance.now() - start;

      const performanceData = {
        status: response.status,
        timeTaken,
        error: null,
      };

      return res.status(200).json({
        msg: "Website performance fetched",
        performance: performanceData,
      });
    } catch (error) {
      const performanceData = {
        status: 503,
        timeTaken: null,
        error: `${error.message}`,
      };

      return res.status(200).json({
        msg: "Website performance fetched with error",
        performance: performanceData,
      });
    }
  } catch (error) {
    console.log(error);
    logger.error(error?.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};

export default getPerformance;
