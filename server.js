import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/api/live", async (req, res) => {
  try {
    const r = await fetch("https://basketapi1.p.rapidapi.com/api/basketball/match/liveMatches", {
      headers: {
        "x-rapidapi-key": "8b957c6cf1msh8470ba55f5411a6p1c376ejsn4774bf854134",
        "x-rapidapi-host": "basketapi1.p.rapidapi.com",
        "accept": "application/json"
      }
    });

    const text = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(r.status).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));