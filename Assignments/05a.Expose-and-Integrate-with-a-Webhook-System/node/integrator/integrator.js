import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const EXPOSEE_REGISTER_ENDPOINT = "https://zack.serveo.net/order";
const EXPOSEE_DELETE_ENDPOINT = "https://zack.serveo.net/delete";
const EXPOSEE_PING_ENDPOINT = "https://zack.serveo.net/ping";

// Endpoint to register a webhook
app.post("/register", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;

    const response = await fetch(EXPOSEE_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID, webhook }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error registering webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete a webhook
app.post("/delete", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;

    const response = await fetch(EXPOSEE_DELETE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID , webhook}),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error deleting webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to trigger the ping event
app.get("/ping", async (req, res) => {
  try {

    const response = await fetch(EXPOSEE_PING_ENDPOINT, {
      method: "GET",
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error triggering ping event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/orderWebhook", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Integrator server is running on port ${PORT}`);
});
