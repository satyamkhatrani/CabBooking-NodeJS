import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  rider_id: { type: Schema.ObjectId, require: true },
  cab_id: { type: Schema.ObjectId, require: true },
  driver_id: { type: Schema.ObjectId, require: true },
  status: { type: String },
  pickup_lat: { type: Number },
  pickup_long: { type: Number },
  destination_lat: { type: Number },
  destination_long: { type: Number },
  distance_unit: { type: String },
  distance: { type: Number },
  duration: { type: Number },
  amount: { type: Number },
});

const Trips = mongoose.model("Trips", tripSchema);

export default Trips;
