import { check } from "express-validator";

const signupValidations = [
  check("username", "Username can't be empty").notEmpty(),
  check("email", "Invalid Email").isEmail(),
  check("password", "Password can't be empty").notEmpty(),
];

export { signupValidations };
