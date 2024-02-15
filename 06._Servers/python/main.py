from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, World!"}

@app.get("/firstroute")
def first():
    return {"message": "First route"}