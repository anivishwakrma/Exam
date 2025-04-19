import mongoose from "mongoose";

const userScoreSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  total: Number,
  time: String, // or Date
});

const UserScore = mongoose.model("UserScore", userScoreSchema);
export default UserScore;
