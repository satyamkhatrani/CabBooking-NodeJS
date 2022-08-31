import Driver from "../models/driver";
import { ObjectId } from "mongodb";
export const getBookings = (req, res, next) => {
  res.status(200).send(req.auth.email);
};

export const rideRequest = (req, res, next) => {
  if (
    req.query.driver_id &&
    req.query.start_lat &&
    req.query.start_long &&
    req.query.end_lat &&
    req.query.end_long
  ) {
    Driver.aggregate([
      { $match: { _id: ObjectId(req.query.driver_id) } },
      {
        $lookup: {
          from: "cabs",
          localField: "current_cab",
          foreignField: "_id",
          as: "cab_detail",
        },
      },
    ]).then((result) => {});
  } else {
    res.status(400).send("parameter missing");
  }
};

export const getNearbyCabs = (req, res, next) => {
  if (req.query.lat && req.query.long) {
    Driver.aggregate([
      { $sample: { size: 5 } },
      {
        $lookup: {
          from: "cabs",
          localField: "current_cab",
          foreignField: "_id",
          as: "cab_detail",
        },
      },
    ]).then((result) => {
      res.json(result);
    });
  } else {
    res.status(400).send("Latitude and Longitude not Found");
  }
};
