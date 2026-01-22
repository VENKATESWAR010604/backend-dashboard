const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ ROUTES ------------------
const insightRoutes = require("./routes/insightRoutes");
app.use("/api/insights", insightRoutes);

// ------------------ MONGODB CONNECTION ------------------
// ⚠️ Replace YOUR_PASSWORD with your real MongoDB password
const MONGO_URI =
  "mongodb+srv://root:Reddy%4012345@cluster0.bzdnkmy.mongodb.net/dashboardDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// ------------------ SERVER ------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
