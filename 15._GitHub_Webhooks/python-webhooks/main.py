from fastapi import FastAPI, Response
from fastapi.requests import Request


app = FastAPI()

@app.post("/githubwebhookjson")
async def github_webhook(request: Request):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        data = await request.body()
        print(data)
        return

@app.post("/githubwebhookform")
async def github_webhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        form_data = await request.form()
        payload = form_data.get("payload")
        print(payload)
        response.status_code = 200
    else:
        response.status_code = 400