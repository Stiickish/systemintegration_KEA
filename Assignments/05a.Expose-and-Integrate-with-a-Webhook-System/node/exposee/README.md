# Exposee Documentation

This is the documentation for the Webhook - Exposee and Integrator assignment. Exposee provides endpoints for registering and managing webhooks, as well as triggering events via ping requests. This document outlines how to use the Exposee service.

## Base URL

The base URL for the Exposee service is `https://zack.serveo.net/`.

## Register Webhook

### Endpoint

### `POST /order`

### Description

Registers a webhook for receiving notifications related to specific events.

### Request Body

| Field    | Type   | Description                 |
|----------|--------|-----------------------------|
| orderID  | String | Unique identifier for event |
| webhook  | String | URL to receive notifications |

### Example

```json
{
  "orderID": "123456",
  "webhook": "https://your-webhook-url.com"
}
```
### Response 
Returns the registered webhook details.

```json
{
  "orderID": "123456",
  "status": "order pending",
  "webhook": "https://your-webhook-url.com"
}
```
## Delete Webhook

### Endpoint

### `POST /delete`

### Description

Deletes a registered webhook

### Request Body

| Field    | Type   | Description                 |
|----------|--------|-----------------------------|
| orderID  | String | Unique identifier for event |
| webhook  | String | URL to receive notifications |

### Example

```json
{
  "orderID": "123456",
  "webhook": "https://your-webhook-url.com"
}
```
### Response
Returns a message indicating the success of the deletion operation.

```json
{
  "message": "Webhook unregistered successfully"
}
```

## Trigger Ping Event

### Endpoint

### `GET /ping`

### Description

Triggers a ping event to all registered webhooks to verify their availability.

### Response

Returns a message indicating the success of the ping operation and responses from each webhook.
If an error occurs a error message will be displayed instead of the response message. 

### Example 
```json
{
  "message": "Ping sent to all webhooks",
  "responses": [
    {
      "orderID": "123456",
      "status": "order pending",
      "webhook": "https://your-webhook-url.com"
    },
    {
      "error": "Failed to ping webhook https://another-webhook-url.com"
    }
  ]
}
```

