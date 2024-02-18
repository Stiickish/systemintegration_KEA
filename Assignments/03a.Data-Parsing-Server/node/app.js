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
  res.send({ message: "Hello, World!" });
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

// Endpoint for TXT
app.get("/txt", async (req, res) => {
  try {
    const data = await readText("../data/me.txt");
    res.send(data);
  } catch (error) {
    console.error("Error handling TXT request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for at hente data fra FastAPI for CSV
app.get("/pythoncsv", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/csv");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error handling CSV request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Endpoint for at hente data fra FastAPI for XML
app.get("pythonxml", async (res, req) => {
  try {
    const response = await fetch("http://localhost:8000/xml");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error handling XML request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Endpoint for at hente data fra FastAPI for YAML
app.get("pythonyaml", async (res, req) => {
  try {
    const response = await fetch("http://localhost:8000/yaml");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error handling YAML request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Endpoint for at hente data fra FastAPI for JSON
app.get("pythonjson", async (res, req) => {
  try {
    const response = await fetch("http://localhost:8000/json");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error handling JSON request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Endpoint for at hente data fra FastAPI for TXT
app.get("pythontxt", async (res, req) => {
  try {
    const response = await fetch("http://localhost:8000/txt");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error handling TXT request:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
