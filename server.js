const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// 4e217d74f13cbb3ffc5a663829a68264
const API_KEY = "4e217d74f13cbb3ffc5a663829a68264";
const NEWS_URL =
  `https://gnews.io/api/v4/top-headlines?lang=en&max=20&token=${API_KEY}`;

async function updateNews() {
  try {
    const res = await fetch(NEWS_URL);
    const json = await res.json();

    const articles = json.articles.map(a => ({
      title: a.title,
      source: a.source.name
    }));

    fs.writeFileSync("data.json", JSON.stringify(articles, null, 2));
    console.log("BOT: berita diperbarui");
  } catch (err) {
    console.log("BOT ERROR", err.message);
  }
}

// Jalan saat server hidup
updateNews();

// Update otomatis tiap 30 menit
setInterval(updateNews, 1000 * 60 * 30);

app.use(express.static("public"));

app.get("/data", (req, res) => {
  res.sendFile(__dirname + "/data.json");
});

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});