// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const convert = require("xml-js");
const app = express();
const port = 3000;

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

// Our Goodreads relay route!
app.post("/api/:search", (req, res) => {
  // This uses string interpolation to make our search query string
  // it pulls the posted query param and reformats it for goodreads
  const searchString = `q=${req.query.q}`;

  // This is an IIFE (Immediately Invoked Function Expression) - that's why it's
  // wrapped in parentheses and followed immediately by more parentheses
  // It uses node-fetch to call the goodreads api, and reads the key from .env
  (async function fetchGoodReads() {
    const response = await fetch(
      `https://www.goodreads.com/search.xml?key=${process.env.GOODREADS_API_KEY}&${searchString}`,
    );
    const xml = await response.text();

    // Goodreads API returns XML, so to use it easily on the front end, we can
    // convert that to JSON:
    const json = convert.xml2json(xml, { compact: true, spaces: 2 });

    // The API returns stuff we don't care about, so we may as well strip out
    // everything except the results:
    const results = JSON.parse(json).GoodreadsResponse.search.results;

    return res.send(results);
  })();
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
