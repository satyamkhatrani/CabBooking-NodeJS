import { validationResult } from "express-validator";

export const postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
};
