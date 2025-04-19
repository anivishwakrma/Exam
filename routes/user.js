import express from "express";
import UserScore from "./models/UserScore.js";

const router = express.Router();

router.post("/save-score", async (req, res) => {
  try {
    const { name, dob, total, time } = req.body;
    const newEntry = new UserScore({ name, dob, total, time });
    await newEntry.save();
    res.status(201).json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save score",err});
  }
});

export default router;
