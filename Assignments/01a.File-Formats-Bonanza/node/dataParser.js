const fs = require("fs");
const csv = require("csv-parser");
const xml2js = require("xml2js");
const yaml = require("js-yaml");
const path = require("path");

// CSV
function parseCSV(filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, filename);
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("CSV data:", results);
        resolve(results); // Resolver promise med resultaterne
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error);
        reject(error); // Rejecter promise med fejl, hvis der opstår en undervejs
      });
  });
}

// XML
function parseXML(filename) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(__dirname, filename);
    const parser = new xml2js.Parser();
    fs.readFile(absolutePath, (err, data) => {
      if (err) {
        console.error("Error reading XML file:", err);
        reject(err);
        return;
      }
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error("Error parsing XML file:", err);
          reject(err);
          return;
        }
        console.log("XML data:", result);
        resolve(result);
      });
    });
  });
}

// YAML
function parseYAML(filename) {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = path.resolve(__dirname, filename);
      const data = fs.readFileSync(absolutePath, "utf8");
      const parsedData = yaml.load(data);
      console.log("YAML data:", parsedData);
      resolve(parsedData);
    } catch (error) {
      console.error("Error parsing YAML:", error);
      reject(error);
    }
  });
}

// JSON
function parseJSON(filename) {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = path.resolve(__dirname, filename);
      const data = fs.readFileSync(absolutePath, "utf8");
      const parsedData = JSON.parse(data);
      console.log("JSON data:", parsedData);
      resolve(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      reject(error);
    }
  });
}

// TXT
function readText(filename) {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = path.resolve(__dirname, filename);
      const textContent = fs.readFileSync(absolutePath, "utf8");
      console.log("Text content:", textContent);
      resolve(textContent);
    } catch (error) {
      console.error("Error reading text file:", error);
      reject(error);
    }
  });
}

parseCSV("../data/me.csv");
parseXML("../data/me.xml");
parseYAML("../data/me.yaml");
parseJSON("../data/me.json");
readText("../data/me.txt");

module.exports = {
  parseCSV,
  parseJSON,
  parseXML,
  parseYAML,
  readText,
};
