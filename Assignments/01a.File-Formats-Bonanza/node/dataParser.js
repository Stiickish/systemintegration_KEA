const fs = require("fs");
const csv = require("csv-parser");
const xml2js = require("xml2js");
const yaml = require("js-yaml");

// TXT
function parseTXT(filename) {
  const textContent = fs.readFileSync(filename, "utf-8");
  console.log("Text Content:");
  console.log(textContent);
}

// XML
function parseXML(filename) {
  const xmlContent = fs.readFileSync(filename, "utf-8");
  xml2js.parseString(xmlContent, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("XML Content:");
    console.dir(result);
  });
}

// YAML
function parseYAML(filename) {
  const yamlContent = fs.readFileSync(filename, "utf-8");
  const parsedData = yaml.load(yamlContent);
  console.log("YAML Content:");
  console.log(parsedData);
}

// JSON
function parseJSON(filename) {
  const data = fs.readFileSync(filename, "utf-8");
  const parsedData = JSON.parse(data);
  console.log("JSON Content:");
  console.log(parsedData);
}

// CSV
function parseCSV(filename) {
  const csvData = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("end", () => {
        console.log("CSV Content:");
        console.log(csvData);
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("finish", () => {
        resolve(csvData);
      });
  });
}

parseTXT("../data/me.txt");
parseXML("../data/me.xml");
parseYAML("../data/me.yaml");
parseJSON("../data/me.json");
parseCSV("../data/me.csv");
