import express from "express";

const app = express();

app.use(express.json()); // Parse incoming requests data as JSON
app.use(express.urlencoded({ extended: true })); // Parse incoming requests data as URL encoded data with the query string parser

app.post("/githubwebhookjson", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});

app.post("/githubwebhookform", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
