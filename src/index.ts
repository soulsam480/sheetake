import cors from "cors";
import fetch from "node-fetch";
import express from "express";
import csv from "csv-parse/lib/sync";

const app = express();
app.use(cors());

app.get('/api/:spreadsheet/:sheet', async function (req, res, next) {
  const sheet = req.params.sheet;
  const spreadsheet = req.params.spreadsheet;
  const endpoint = `https://docs.google.com/spreadsheets/d/${spreadsheet}/gviz/tq?tqx=out:csv&sheet=${sheet}`;
  const response = await fetch(endpoint);
  const buffer = await response.buffer();
  res.json(csv(buffer, {columns: true}));
});

// This is particularly important for App Engine.
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
