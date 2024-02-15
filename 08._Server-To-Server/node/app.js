import express from "express";

const app = express();

app.get("/requestFastAPI", async (req, res) => {
  //make a request to fastapiData here and serve it as a reponse
  try {
    const response = await fetch("http://localhost:8000/fastapiData");
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/expressData", (req, res) => {
  res.send({ message: "isRunning" });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
