const express = require("express");
const router = express.Router();
const Insight = require("../models/Insights.js");

router.get("/kpis", async (req, res) => {
  try {
    const result = await Insight.aggregate([
      {
        $group: {
          _id: null,
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          totalRecords: { $sum: 1 }
        }
      }
    ]);

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ---------------- DONUT (Topics) ---------------- */
router.get("/topics", async (req, res) => {
  try {
    const data = await Insight.aggregate([
      { $match: { topic: { $ne: "" } } },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- BAR (Sector Intensity) ---------------- */
router.get("/sector", async (req, res) => {
  try {
    const data = await Insight.aggregate([
      { $match: { sector: { $ne: "" } } },
      {
        $group: {
          _id: "$sector",
          avgIntensity: { $avg: "$intensity" }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- REGION HEATMAP ---------------- */
router.get("/region", async (req, res) => {
  try {
    const data = await Insight.aggregate([
      { $match: { region: { $ne: "" } } },
      {
        $group: {
          _id: "$region",
          avgIntensity: { $avg: "$intensity" }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 END YEAR FILTER API
router.get("/filter", async (req, res) => {
  try {
    const { startYear, endYear } = req.query;

    const query = {};

    if (startYear) {
  query.end_year = { $gte: String(startYear) };
}

if (endYear) {
  query.end_year = {
    ...(query.end_year || {}),
    $lte: String(endYear),
  };
}


    const data = await Insight.find(query).limit(200);

    res.json(data);
  } catch (error) {
    console.error("Filter API Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ---------------- COUNTRY ---------------- */
router.get("/country", async (req, res) => {
  try {
    const data = await Insight.aggregate([
      { $match: { country: { $ne: "" } } },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 8 }   // Top 8 countries
    ]);

    res.json(data);
  } catch (err) {
    console.error("Country API Error:", err);
    res.status(500).json({ error: err.message });
  }
});



 /* ---------------- SWOT ---------------- */
router.get("/swot", async (req, res) => {
  try {
    const data = await Insight.aggregate([
      { $match: { pestle: { $ne: "" } } },
      {
        $group: {
          _id: "$pestle",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    console.error("SWOT API Error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
