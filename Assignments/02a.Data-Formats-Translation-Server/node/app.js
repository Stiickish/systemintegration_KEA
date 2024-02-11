import express from "express";
import {
  parseCSV,
  parseXML,
  parseYAML,
  parseJSON,
  readText,
} from "../../01a.File-Formats-Bonanza/node/dataParser.js";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// Endpoint for at parse en CSV-fil
app.get("/csv", (req, res) => {
  parseCSV("../../01a.File-Formats-Bonanza/data/me.csv")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error handling CSV request:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Endpoint for at parse en XML-fil
app.get("/xml", async (req, res) => {
  try {
    const data = await parseXML("../../01a.File-Formats-Bonanza/data/me.xml");
    res.json(data);
  } catch (error) {
    console.error("Error handling XML request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for at parse en YAML-fil
app.get("/yaml", async (req, res) => {
  try {
    const data = await parseYAML("../../01a.File-Formats-Bonanza/data/me.yaml");
    res.json(data);
  } catch (error) {
    console.error("Error handling YAML request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for at parse en JSON-fil
app.get("/json", async (req, res) => {
  try {
    const data = await parseJSON("../../01a.File-Formats-Bonanza/data/me.json");
    res.json(data);
  } catch (error) {
    console.error("Error handling JSON request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for at læse en TXT-fil
app.get("/txt", async (req, res) => {
  try {
    const data = await readText("../../01a.File-Formats-Bonanza/data/me.txt");
    res.send(data);
  } catch (error) {
    console.error("Error handling TXT request:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
