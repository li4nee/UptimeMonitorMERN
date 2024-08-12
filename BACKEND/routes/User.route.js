import Router from "express";
import signup from "../controllers/userProfile/signup.js";
import { signupValidations } from "../utility/signupValidator.js";
import { loginValidations } from "../utility/loginValidation.js";
import login from "../controllers/userProfile/login.js";
import authenticate from "../middleware/Authentication.middleware.js";
import unsubscribe from "../controllers/web/unsubscribe.js";
import updateUserNotification from "../controllers/userProfile/updateUserNotification.js";
import showProfile from "../controllers/userProfile/showProfile.js";
import changeUsername from "../controllers/userProfile/changeUsername.js";
import changeEmail from "../controllers/userProfile/changeEmail.js";
import { emailValidations } from "../utility/emailValidation.js";
import { passwordValidation } from "../utility/passwordValidation.js";
import changePassword from "../controllers/userProfile/changePassword.js";
import { usernameValidation } from "../utility/usernameValidation.js";
const router = Router();

router.post("/signup", signupValidations, signup);
router.post("/login", loginValidations, login);
router.get("/unsubscribe/:id", unsubscribe);
router.get("/profile/", authenticate, showProfile);
router.put(
  "/profile/username",
  authenticate,
  usernameValidation,
  changeUsername
);
router.put("/profile/notification", authenticate, updateUserNotification);
router.put("/profile/email", authenticate, emailValidations, changeEmail);
router.put(
  "/profile/password",
  authenticate,
  passwordValidation,
  changePassword
);
export default router;
