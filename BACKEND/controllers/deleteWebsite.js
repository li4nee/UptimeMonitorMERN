import Website from "../model/Website.model.js";

const deleteWebsite = async (req, res) => {
  try {
    const response = await Website.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (response.deletedCount === 0) {
      return res
        .status(404)
        .json({
          error: "Website not found or you don't have permission to delete it",
        });
    }
    return res.status(200).json({ msg: "Website deleted successfully" });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteWebsite;
