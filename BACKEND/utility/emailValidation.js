import { check } from "express-validator";

const emailValidations = [check("newEmail", "Invalid Email").notEmpty().isEmail()];

export { emailValidations };
