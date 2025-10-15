# app/main.p
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
# from app.api import routes_ai, routes_analysis, routes_geo, routes_health

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

# Routes commented out to avoid import issues


@app.post("/api/multi-llm-analysis")
async def multi_llm_analysis(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    models = data.get("models", [])
    target_domain = data.get("target_domain")

    # Mock responses for each model
    model_results = {}
    for model in models:
        model_results[model] = {
            "response": f"Mocked response from {model} for prompt: {prompt}",
            "response_time": 1500 + len(models) * 100,  # Mock response time
            "accuracy": 0.85,
            "confidence": 0.78
        }

    # Mock analysis results
    results = {
        "modelResults": model_results,
        "summary": f"Analysis completed for {len(models)} models with prompt: {prompt}",
        "topPerformer": models[0] if models else "N/A",
        "uniqueDomains": 3,
        "totalCitations": 15,
        "avgResponse": 1200,
        "domains": {
            "example.com": 5,
            "research.org": 3,
            "academic.edu": 2
        },
        "metrics": {
            "total_responses": len(models),
            "avg_confidence": 0.78,
            "processing_time": 2500
        }
    }

    return {
        "analysis_id": f"analysis_{len(prompt)}_{len(models)}",
        "status": "completed",
        "results": results
    }

@app.post("/api/analysis-progress/{analysis_id}")
async def get_analysis_progress(analysis_id: str):
    # Mock progress endpoint
    return {
        "status": "completed",
        "results": {
            "modelResults": {
                "gpt4": {
                    "response": "Mocked GPT-4 response with detailed analysis",
                    "response_time": 1200,
                    "accuracy": 0.92,
                    "confidence": 0.85
                },
                "claude": {
                    "response": "Mocked Claude response with comprehensive insights",
                    "response_time": 1100,
                    "accuracy": 0.88,
                    "confidence": 0.82
                }
            },
            "summary": "Multi-LLM analysis completed successfully",
            "topPerformer": "gpt4",
            "uniqueDomains": 4,
            "totalCitations": 18,
            "avgResponse": 1150,
            "domains": {
                "example.com": 6,
                "research.org": 4,
                "academic.edu": 3,
                "science.gov": 2
            },
            "metrics": {
                "total_responses": 2,
                "avg_confidence": 0.835,
                "processing_time": 2300
            }
        }
    }
