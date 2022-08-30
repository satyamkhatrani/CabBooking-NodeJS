import { Router } from "express";
import { body } from "express-validator";

import Users from "../models/user";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post(
  "/api/register",
  body("email")
    .isEmail()
    .withMessage("please enter valid e-mail")
    .custom((value, { req }) => {
      return Users.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "E-Mail already exists, please pick a different one."
          );
        }
        return true;
      });
    })
    .normalizeEmail(),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 5 characters."
  )
    .isLength({ min: 5 })
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match");
      }
      return true;
    })
);
