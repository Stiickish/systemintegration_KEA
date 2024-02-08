import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.get("/otherRoute", (req, res) => {
  res.send({ message: "Other Route" });
});

app.post("/postRequest", (req, res) => {
  res.send({ message: "Post Request" });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
