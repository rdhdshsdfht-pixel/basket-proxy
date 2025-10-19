import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Proxy server is running and ready for requests.");
});

app.get("/api/live", async (req, res) => {
  console.log("➡️ /api/live endpoint hit — starting RapidAPI request...");

  try {
    const r = await fetch("https://basketapi1.p.rapidapi.com/api/basketball/match/LiveMatches", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8b957c6cf1msh8470ba55f5411a6p1c376ejsn4774bf854134",
        "x-rapidapi-host": "basketapi1.p.rapidapi.com",
        "accept": "application/json",
      },
      timeout: 15000, // 15 секунд на случай зависания
    });

    console.log("✅ Got response from RapidAPI:", r.status, r.statusText);

    const text = await r.text();
    console.log("📦 Response length:", text.length);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(r.status).send(text);

  } catch (err) {
    console.error("❌ RapidAPI request failed:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
