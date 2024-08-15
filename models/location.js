import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
  {
    location: String,
  },
  {
    timestamps: true,
  }
);

const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;
