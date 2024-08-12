import axios from "axios";
import Website from "../model/Website.model.js";
import sendMail from "../utility/sendEmail.js";
import User from "../model/User.model.js";
import { emailQueue, emailJobName } from "../Job/sendEmailQueue.js";
import logger from "../config/logger.config.js";

const checkStatusForAllWebsites = async () => {
  try {
    const websites = await Website.find();
    if (websites.length === 0) {
      console.log("No websites found.");
      return;
    }

    for (const website of websites) {
      try {
        const user = await User.findById(website.user);
        if (!user) {
          console.log(`User not found for website ${website.website}`);
          continue;
        }
        const url =
          website.website.startsWith("http://") ||
          website.website.startsWith("https://")
            ? website.website
            : `http://${website.website}`;
        const response = await axios.get(url, { timeout: 3000 });

        if (response.status === 200) {
          website.status = "Active";
        } else {
          website.status = "Down";
          if (user.emailNotificationUser && website.notificationsEnabled) {
            const payload = {
              website: website.website,
              email: website.email,
              userId: user._id,
            };
            await emailQueue.add(emailJobName, payload);
          }
        }
      } catch (error) {
        website.status = "Down";
        const user = await User.findById(website.user);
        if (
          user &&
          user.emailNotificationUser &&
          website.notificationsEnabled
        ) {
          const payload = {
            website: website.website,
            email: website.email,
            userId: user._id,
          };
          await emailQueue.add(emailJobName, payload);
        }
        logger.error(`${website.website} : ${error.message}`);
        console.error(`Error checking ${website.website}:`, error.message);
      }
      website.lastChecked = Date.now();
      await website.save();
    }
    logger.info("Check completed for all websites.");
    console.log("Check completed for all websites.");
  } catch (error) {
    logger.error(error.message);
    console.log("Error during website status check all:", error);
  }
};

export default checkStatusForAllWebsites;
