import { Router } from "express";
import { body } from "express-validator";

import Users from "../models/user";
import * as authController from "../controllers/auth";

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
    }),
  authController.postRegister
);

authRoutes.post(
  "/api/login",
  body("email")
    .isEmail()
    .withMessage("Please Enter Valid Email address")
    .normalizeEmail(),
  body("password", "Password has to be valid.").isLength({ min: 5 }).trim(),
  authController.postLogin
);

export default authRoutes;
