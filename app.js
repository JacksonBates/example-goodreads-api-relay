// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const convert = require("xml-js");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const port = 3000;

// Allow CORS from any origin
app.use(cors());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

// Our Open Weather Map relay route!
app.get("/onecall", async (req, res) => {
  try {
    // This uses string interpolation to make our search query string
    // it pulls the posted query param and reformats it for goodreads
    const lat = `${req.query.lat}`;
    const lon = `${req.query.lon}`;
    console.log(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&${lon}&exclude=hourly,daily&appid=${process.env.OPEN_WEATHER_MAP_KEY}`
    );
    // It uses node-fetch to call the goodreads api, and reads the key from .env
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${process.env.OPEN_WEATHER_MAP_KEY}`
    );
    const json = await response.json();

    return res.json({
      success: true,
      json,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
