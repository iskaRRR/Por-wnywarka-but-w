from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import json
import os

app = FastAPI(title="Sneaker Market Analyzer")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ===== STATIC FILES =====
app.mount(
    "/static",
    StaticFiles(directory=os.path.join(BASE_DIR, "static")),
    name="static"
)

# ===== STRONA STARTOWA =====
@app.get("/")
def landing_page():
    return FileResponse(
        os.path.join(BASE_DIR, "static", "landing.html")
    )

# ===== PORÓWNYWARKA =====
@app.get("/compare")
def compare_page():
    return FileResponse(
        os.path.join(BASE_DIR, "static", "index.html")
    )

# ===== DANE =====
with open(os.path.join(BASE_DIR, "shoes.json"), encoding="utf-8") as f:
    shoes = json.load(f)

# ===== PORÓWNANIE =====
@app.get("/api/compare")
def compare_model(query: str):
    q = query.lower()

    for item in shoes:
        if q in item["model"].lower() or q == item["sku"].lower():
            return [{
                "model": item["model"],
                "sku": item["sku"],
                "image": item["image"],
                "description": item.get("description", ""),
                "prices": item["prices"]
            }]

    return []




@app.get("/api/similar")
def similar_models(model: str):
    base = model.split()[0].lower()  # np "nike"

    result = []
    for s in shoes:
        if base in s["model"].lower() and s["model"] != model:
            result.append({
                "model": s["model"],
                "image": s["image"]
            })

    return result[:4]
