import mongoose from "mongoose";

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: { type: String, required: true },
  current_cab: { type: Schema.ObjectId, required: true },
});

const Driver = mongoose.model("drivers", driverSchema);

export default Driver;
