import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Users from "../models/user";

export const postRegister = (req, res, next) => {
  const email = req.body.email;
  console.log("email: ", email);
  const password = req.body.password;
  console.log("password: ", password);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors);
  }

  bcrypt
    .hash(password, 16)
    .then((hashedPassword) => {
      const user = new Users({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      console.log("result: ", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).send("User not Registered with this E-Mail");
    }
    bcrypt.compare(password, user.password).then(async (doMatch) => {
      if (doMatch) {
        var token = await jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        req.session.token = token;
        return res.status(200).send({ token });
      }
      return res.status(422).send("Invalid email or password");
    });
  });
};
