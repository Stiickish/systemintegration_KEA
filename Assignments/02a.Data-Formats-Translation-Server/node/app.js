import express from "express";
import {
  parseCSV,
  parseXML,
  parseYAML,
  parseJSON,
  readText,
} from "./dataParser.js";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// Endpoint for CSV
app.get("/csv", async (req, res) => {
  try {
    const data = await parseCSV("../data/me.csv");
    res.json(data);
  } catch (error) {
    console.log("Error handling CSV request: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for XML
app.get("/xml", async (req, res) => {
  try {
    const data = await parseXML("../data/me.xml");
    res.json(data);
  } catch (error) {
    console.log("Error handling XML request: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for YAML
app.get("/yaml", async (req, res) => {
  try {
    const data = await parseYAML("../data/me.yaml");
    res.json(data);
  } catch (error) {
    console.error("Error handling YAML request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for JSON
app.get("/json", async (req, res) => {
  try {
    const data = await parseJSON("../data/me.json");
    res.json(data);
  } catch (error) {
    console.error("Error handling JSON request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for at læse en TXT-fil
app.get("/txt", async (req, res) => {
  try {
    const data = await readText("../data/me.txt");
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
