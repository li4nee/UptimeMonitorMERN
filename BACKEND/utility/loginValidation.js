import { check } from "express-validator";

const loginValidations = [
  check("email", "Invalid Email").notEmpty().isEmail(),
  check("password", "Password should atleast be 8 characters long").notEmpty().isLength(8)
];

export { loginValidations };