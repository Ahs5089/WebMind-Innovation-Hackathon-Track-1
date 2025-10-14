# app/main.p
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_ai, routes_analysis, routes_geo, routes_health

# app = FastAPI(title="GEO Analyzer Backend", version="1.0")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # or specific frontend domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(routes_health.router, prefix="/api", tags=["Health"])
# app.include_router(routes_ai.router, prefix="/api/ai", tags=["AI"])
# app.include_router(routes_analysis.router, prefix="/api/analysis", tags=["Analysis"])
# app.include_router(routes_geo.router, prefix="/api/geo", tags=["GEO"])


# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# import json

# app = FastAPI()

# # ✅ Enable CORS for frontend connection
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # or specify ["http://localhost:3000"]
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# app.include_router(routes_health.router, prefix="/api", tags=["Health"])
# app.include_router(routes_ai.router, prefix="/api/ai", tags=["AI"])
# app.include_router(routes_analysis.router, prefix="/api/analysis", tags=["Analysis"])
# app.include_router(routes_geo.router, prefix="/api/geo", tags=["GEO"])


# @app.post("/api/metrics")
# async def compute_metrics(request: Request):
#     data = await request.json()
#     try:
#         prompt = data.get("prompt")
#         target_domain = data.get("target_domain")
#         # your logic for metrics...
#         result = {"status": "ok", "metrics": {"score": 98}}
#         return result
#     except Exception as e:
#         return {"error": str(e)}
    




from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Backend running"}

@app.get("/api/health")
async def health():
    return {"status": "ok"}

app.include_router(routes_health.router, prefix="/api", tags=["Health"])
app.include_router(routes_ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(routes_analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(routes_geo.router, prefix="/api/geo", tags=["GEO"])


@app.post("/api/metrics")
async def compute_metrics(request: Request):
    data = await request.json()
    prompt = data.get("prompt")
    domain = data.get("target_domain")

    # Just return something for testing
    return {"status": "ok", "prompt": prompt, "domain": domain}
