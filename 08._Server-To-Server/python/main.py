from fastapi import  FastAPI
import requests


app = FastAPI()

@app.get("/fastapiData")
def _():
    return {"message": [1,2,3,4,5]}

@app.get("/firstroute")
def first():
    return {"message": "First route"}

@app.get("/expressData")
def get_express_data():
    express_data = requests.get("http://localhost:8080/expressData").json()
    return {"data": express_data}