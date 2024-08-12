import { validationResult } from "express-validator";
import Website from "../../model/Website.model.js";
import logger from "../../config/logger.config.js";
const formhandle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, website } = req.body;
  try {
    let existingWebsite = await Website.findOne({ website, user: req.user.id });
    if (existingWebsite) {
      return res
        .status(400)
        .json({ error: "You have already added this website" });
    }

    const newWebsite = await Website.create({
      email,
      website,
      user: req.user.id,
    });

    return res.status(200).json({
      msg: "Website Added",
      id: newWebsite._id,
    });
  } catch (error) {
    console.error("Error during website addition:", error);
    logger.error(error?.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export default formhandle;
