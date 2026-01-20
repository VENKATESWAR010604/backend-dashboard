require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const insightRoutes = require("../routes/insightRoutes");
app.use("/api/insights", insightRoutes);

// Health check (important)
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

// MongoDB connection (prevent multiple connections in serverless)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected ✅");
}

connectDB();

module.exports = app;
