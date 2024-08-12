import { check } from "express-validator";

const passwordValidation = [
  check("newPassword", "Password should atleast be 8 characters long")
    .notEmpty()
    .isLength(8),
  check("oldPassword", "Password should atleast be 8 characters long")
    .notEmpty()
    .isLength(8),
];

export { passwordValidation };
