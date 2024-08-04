import mongoose from "mongoose";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const websiteSchema = new mongoose.Schema({
  website: {
    type: String,
    match: [urlRegex, "Not a valid url"],
    required: true,
  },
  email: {
    type: String,
    match: [emailRegex, "Not valid email"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Active", "Down", "Checking"],
    default: "Checking",
  },
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
});

const Website = mongoose.model("Website", websiteSchema);

export default Website;
