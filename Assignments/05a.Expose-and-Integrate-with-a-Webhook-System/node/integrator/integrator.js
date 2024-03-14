import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const EXPOSEE_REGISTER_ENDPOINT = "https://zack.serveo.net/order";
const EXPOSEE_DELETE_ENDPOINT = "https://zack.serveo.net/delete";
const EXPOSEE_PING_ENDPOINT = "https://zack.serveo.net/ping";

async function makeHttpRequest(endpoint, method, body) {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error ${method} request to ${endpoint}:`, error);
    throw error;
  }
}

// Endpoint to register a webhook
app.post("/register", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;
    const data = await makeHttpRequest(EXPOSEE_REGISTER_ENDPOINT, "POST", {
      orderID,
      webhook,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete a webhook
app.post("/delete", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;
    const data = await makeHttpRequest(EXPOSEE_DELETE_ENDPOINT, "POST", {
      orderID,
      webhook,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to trigger the ping event
app.get("/ping", async (req, res) => {
  try {
    const data = await makeHttpRequest(EXPOSEE_PING_ENDPOINT, "GET");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/orderWebhook", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Integrator server is running on port ${PORT}`);
});
