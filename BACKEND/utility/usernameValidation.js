import { check } from "express-validator";

const usernameValidation = [
  check("username", "Username can't be empty").notEmpty(),
];

export { usernameValidation };
