const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    region: String,
    country: String,
    relevance: Number,
    likelihood: Number,
    pestle: String,
    source: String,
    title: String,
  },
  { collection: "insights" } // MUST match MongoDB collection name
);

module.exports = mongoose.model("Insight", insightSchema);
