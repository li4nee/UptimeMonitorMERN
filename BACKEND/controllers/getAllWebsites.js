import Website from "../model/Website.model.js";

const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.user.id });
    return res.status(200).json(websites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllWebsites;
