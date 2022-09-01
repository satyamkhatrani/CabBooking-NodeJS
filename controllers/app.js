import Driver from "../models/driver";
import { ObjectId } from "mongodb";
import Requests from "../models/request";
export const getBookings = (req, res, next) => {
  res.status(200).send(req.auth.email);
};

export const rideRequest = (req, res, next) => {
  if (
    req.query.driver_id &&
    req.query.driver_id.length === 24 &&
    req.query.start_lat &&
    req.query.start_long &&
    req.query.end_lat &&
    req.query.end_long
  ) {
    Driver.find({ _id: ObjectId(req.query.driver_id) })
      .then((result) => {
        if (result.length > 0) {
          const random_distance = Math.floor(Math.random() * 15) + 1;
          const request = new Requests({
            rider_id: req.auth._id,
            driver_id: req.query.driver_id,
            cab_id: result[0].current_cab,
            start_lat: req.query.start_lat,
            start_long: req.query.start_long,
            end_lat: req.query.end_lat,
            end_long: req.query.end_long,
            distance_unit: "km",
            distance: random_distance,
            duration: random_distance * 180,
            amount: random_distance * 12,
          });
          return request.save();
        } else {
          res
            .status(400)
            .send("Error while creating request, driver not found");
        }
      })
      .then((savedData) => {
        res.json(savedData);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send("Invalid parameters");
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
