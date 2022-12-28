import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cabSchema = new Schema({
  reg_no: { type: String, required: true, index: { unique: true } },
  brand: { type: String, required: true },
  model: { type: String },
  type: { type: String },
  base_rate: { type: Number },
});

const Cab = mongoose.model("Cabs", cabSchema);

export default Cab;
