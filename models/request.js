import mongoose from "mongoose";

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    rider_id: { type: Schema.ObjectId, require: true },
    driver_id: { type: Schema.ObjectId, require: true },
    start_lat: { type: Number },
    start_long: { type: Number },
    end_lat: { type: Number },
    end_long: { type: Number },
    distance_unit: { type: String },
    distance: { type: Number },
    duration: { type: Number },
    amount: { type: Number },
  },
  { expireAfterSeconds: 10 * 60 }
);

const Requests = mongoose.model("requests", requestSchema);

export default Requests;
