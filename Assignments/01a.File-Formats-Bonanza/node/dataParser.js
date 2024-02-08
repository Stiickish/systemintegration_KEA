const fs = require("fs");
const csv = require("csv-parser");
const xml2js = require("xml2js");
const yaml = require("js-yaml");

// CSV
function parseCSV(filename) {
  const results = [];
  fs.createReadStream(filename)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("CSV data:", results);
    });
}

// XML
function parseXML(filename) {
  const parser = new xml2js.Parser();
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return;
    }
    parser.parseString(data, (err, result) => {
      if (err) {
        console.error("Error parsing XML file:", err);
        return;
      }
      console.log("XML data:", result);
    });
  });
}

// YAML
function parseYAML(filename) {
  const data = fs.readFileSync(filename, "utf8");
  const parsedData = yaml.load(data);
  console.log("YAML data:", parsedData);
}

// JSON
function parseJSON(filename) {
  const data = fs.readFileSync(filename, "utf8");
  const parsedData = JSON.parse(data);
  console.log("JSON data:", parsedData);
}

// TXt
function readText(filename) {
  const textContent = fs.readFileSync(filename, "utf8");
  console.log("Text content:", textContent);
}

parseCSV("../me.csv");
parseXML("../me.xml");
parseYAML("../me.yaml");
parseJSON("../me.json");
readText("../me.txt");
