from fastapi import FastAPI
import requests
from dataParser import parse_csv,parse_json,parse_xml,parse_yaml,read_text



app = FastAPI()

# Endpoints for parsing file types
@app.get("/")
def _():
    return {"message": "Hello, World!"}

@app.get("/csv")
def parsed_csv():
    data = parse_csv("../data/me.csv")
    return data

@app.get("/xml")
def parsed_xml():
    data = parse_xml("../data/me.xml")
    return data

@app.get("/yaml")
def parsed_yaml():
    data = parse_yaml("../data/me.yaml")
    return data

@app.get("/json")
def parsed_json():
    data = parse_json("../data/me.json")
    return data

@app.get("/txt")
def parsed_txt():
    data = read_text("../data/me.txt")
    return {"data": data}


# Endpoints for receiving data from Server A
@app.get("/nodecsv")
def get_csv_from_server():
    try:
        response = requests.get("http://localhost:8080/csv")
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching CSV data from server A: {e}")
        return {"error": "Internal Server Error"}

@app.get("/nodexml")
def get_csv_from_server():
    try:
        response = requests.get("http://localhost:8080/xml")
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching CSV data from server A: {e}")
        return {"error": "Internal Server Error"}
    
@app.get("/nodeyaml")
def get_csv_from_server():
    try:
        response = requests.get("http://localhost:8080/yaml")
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching CSV data from server A: {e}")
        return {"error": "Internal Server Error"}

@app.get("/nodejson")
def get_csv_from_server():
    try:
        response = requests.get("http://localhost:8080/json")
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching CSV data from server A: {e}")
        return {"error": "Internal Server Error"}
    
@app.get("/nodetxt")
def get_csv_from_server():
    try:
        response = requests.get("http://localhost:8080/txt")
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching CSV data from server A: {e}")
        return {"error": "Internal Server Error"}
