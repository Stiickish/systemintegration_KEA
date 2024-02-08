const fs = require("fs");

// XML
const xmlContent = fs.readFileSync("./me.xml", "utf-8");
console.log("XML:");
console.log(xmlContent);

// JSON
const jsonContent = JSON.parse(fs.readFileSync("./me.json", "utf-8"));
console.log("JSON:");
console.log(jsonContent);

//YAML
const yamlContent = fs.readFileSync("./me.yaml", "utf-8");
console.log("YAML:");
console.log(yamlContent);

//CSV
const csvData = fs.readFileSync("./me.csv", "utf-8");
const csvContent = csvData.split("\n").map((row) => row.split(","));
console.log("CSV:");
console.log(csvContent);

//TXT
const txtContent = fs.readFileSync("./me.txt", "utf-8");
console.log("TXT:");
console.log(txtContent);
