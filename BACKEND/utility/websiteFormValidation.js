import { check } from "express-validator";

const formValidate = [
  check("website", "Invalid URL")
    .notEmpty()
    .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  check("email", "Invalid email")
    .notEmpty()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
];

export { formValidate };
