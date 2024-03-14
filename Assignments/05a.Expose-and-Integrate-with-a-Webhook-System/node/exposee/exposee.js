import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
  `mongodb+srv://sys-admin:${process.env.MONGO_PASSWORD}@cluster1.yuqjxxt.mongodb.net/sys-webhook`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


const webhookSchema = new mongoose.Schema(
  {
    orderID: String,
    webhook: String,
    status: {
      type: String,
      default: "order pending",
    },
  },
  { collection: "registeredWebhooks" }
);

// Create webhook model
const Webhook = mongoose.model("Webhook", webhookSchema);

const app = express();
app.use(express.json());

// Endpoint to register a webhook
app.post("/order", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;
    const newWebhook = new Webhook({ orderID, webhook });
    await newWebhook.save();

    // Construct the response object with desired fields
    const responseWebhook = {
      orderID: newWebhook.orderID,
      status: newWebhook.status,
      webhook: newWebhook.webhook,
    };

    res.json(responseWebhook);
  } catch (error) {
    console.error("Error registering webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to unregister a webhook
app.delete("/delete", async (req, res) => {
  try {
    const { orderID, webhook } = req.body;

    // Update status to "deleting"
    const updatedWebhook = await Webhook.findOneAndUpdate(
      { orderID, webhook },
      { status: "deleting" },
      { new: true }
    );

    if (!updatedWebhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    // Delete the webhook
    await Webhook.deleteOne({ orderID, webhook });

    res.json({ message: "Webhook unregistered successfully" });
  } catch (error) {
    console.log("Error deleting webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to ping all webhooks
const fetchTimeout = 10000; // 10 seconds

app.get("/ping", async (req, res) => {
  console.log("Received ping request from:", req.ip);
  try {
    const registeredWebhooks = await Webhook.find();
    const pingResponses = [];

    for (const webhook of registeredWebhooks) {
      try {
        const pingResponse = await fetch(webhook.webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ping: true }),
          timeout: fetchTimeout, // Specify timeout
        });

        const responseData = await pingResponse.json();
        pingResponses.push(responseData);
      } catch (error) {
        console.error(`Error pinging webhook ${webhook.webhook}:`, error);
        pingResponses.push({ error: `Failed to ping webhook ${webhook.webhook}` });
      }
    }

    res.json({
      message: "Ping sent to all webhooks",
      responses: pingResponses,
    });
  } catch (error) {
    console.log("Error pinging all webhooks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to update the status of a webhook only for admin use
app.post("/updateStatus", async (req, res) => {
  try {
    const { orderID, newStatus } = req.body;

    // Find webhook in the database based on orderID
    const webhook = await Webhook.findOne({ orderID });

    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    // Update webhook status
    webhook.status = newStatus;
    await webhook.save();

    // Send a notification to your partner's server
    const notificationEndpoint = 'https://zack.serveo.net/webhook';
    const notificationResponse = await fetch(notificationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: webhook.orderID,
        newStatus: webhook.status,
      }),
    });

    if (notificationResponse.ok) {
      console.log('Notification sent successfully');
    } else {
      console.error('Failed to send notification');
    }

    res.json({ message: "Webhook status updated successfully" });
  } catch (error) {
    console.error("Error updating webhook status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Exposee server is running on port ${PORT}`);
});
