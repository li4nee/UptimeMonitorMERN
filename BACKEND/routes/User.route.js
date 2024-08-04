import Router from "express";
import signup from "../controllers/signup.js";
import { signupValidations } from "../utility/signupValidator.js";
import { loginValidations } from "../utility/loginValidation.js";
import login from "../controllers/login.js";
import authenticate from "../middleware/Authentication.middleware.js";
import unsubscribe from "../controllers/unsubscribe.js";
import updateUserNotification from "../controllers/updateUserNotification.js";
const router = Router();

router.post("/signup", signupValidations, signup);
router.post("/login", loginValidations, login);
router.get("/notification", authenticate, updateUserNotification);
router.get("/unsubscribe/:id", unsubscribe);
export default router;
