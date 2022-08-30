import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import { expressjwt } from "express-jwt";
import mongoose from "mongoose";

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/api",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: ["/api/login", "/api/register"],
  })
);

app.get("/", (req, res) => {
  //   console.log(process.env);
  res.json("Server is running");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
