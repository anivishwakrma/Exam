import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserScore from './models/UserScore.js';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://aniketvishwakarma1815:Aniket8585R@cluster0.ccjbzli.mongodb.net/", ).then(() => 
  console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  // Define the route to save the score data
app.post("/api/save-score", async (req, res) => {
  console.log("Button Clicked and Call");
  try {
    const { name, dob, total, time } = req.body;
console.log(name)
console.log(dob)
console.log(total)
    // Create a new score entry
    const newScore = new UserScore({
      name,
      dob,
      total,
      time,
    });
console.log(newScore);
    // Save the new score to the database
    await newScore.save();

    // Send success response
    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ message: "Server error. Could not save score." });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
