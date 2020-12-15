const express = require("express");
const app = express();
const fetch = require("node-fetch");

// Grabbing API

app.get("/covid", async (req, res) => {
  const covidData = await fetch(
    "https://api.covid19api.com/live/country/mexico"
  );

  const covidJson = await covidData.json();

  res.json(covidJson);
});

app.get("/", (req, res) => {
  res.send("Root API");
});

// Server
app.listen(3000, (req, res) => {
  console.log("Server is running");
});
