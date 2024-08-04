import Router from "express";
import authenticate from "../middleware/Authentication.middleware.js";
import formhandle from "../controllers/formHandleForWebsite.js";
import { formValidate } from "../utility/websiteFormValidation.js";
import getAllWebsites from "../controllers/getAllWebsites.js";
import deleteWebsite from "../controllers/deleteWebsite.js";
import getWebsiteImmediately from "../controllers/getWebsiteStatusImmediately.js";
import getPerformance from "../controllers/getPerformance.js";
import updateWebsiteNotification from "../controllers/updateWebsiteNotification.js";
const router = Router();

router.post("/website", authenticate, formValidate, formhandle);
router.get("/website", authenticate, getAllWebsites);
router.delete("/website/:id", authenticate, deleteWebsite);
router.get("/website/status/:id", authenticate, getWebsiteImmediately);
router.get("/website/performance/:id", authenticate, getPerformance);
router.put(
  "/website/notification/:id",
  authenticate,
  updateWebsiteNotification
);
export default router;
