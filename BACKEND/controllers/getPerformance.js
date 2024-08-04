import Website from "../model/Website.model.js";
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
    try {
      const start = performance.now();
      const response = await axios.get(website.website, { timeout: 5000 });
      const timeTaken = performance.now() - start;

      return res.status(200).json({
        msg: "Website performance fetched",
        performance: {
          status: response.status,
          timeTaken,
          error: null,
        },
      });
    } catch (error) {
      return res.status(200).json({
        msg: "Website performance fetched",
        performance: {
          status: 503 ,
          timeTaken: null,
          error: `${error.message}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error !" });
  }
};
export default getPerformance;