# app/api/routes_analysis.py
from fastapi import APIRouter
from app.models.request_models import AnalysisRequest
from app.services.analyzer_service import compute_metrics
# from app.services.analyzer_service import analyze_data



# router = APIRouter()

# @router.post("/analysis")
# def analyze_text(data: dict):
#     text = data.get("text", "")
#     result = compute_metrics(text)
#     return result


from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AnalysisRequest(BaseModel):
    responses: dict[str, str]

@router.post("/metrics")
async def compute_metrics(req: AnalysisRequest):
    metrics = {}
    global_domains = {}
    for model, text in req.responses.items():
        words = text.split()
        metrics[model] = {
            "response_length": len(text),
            "domain_count": 2,
            "unique_domains": 1,
            "visibility_score": 80,
        }
        global_domains["example.com"] = 5

    summary = "Mocked summary of model performances."
    rankings = sorted(
        [(m, data["visibility_score"]) for m, data in metrics.items()],
        key=lambda x: x[1],
        reverse=True,
    )
    return {
        "metrics": metrics,
        "rankings": rankings,
        "global_domains": global_domains,
        "citations": {"example.com": 5},
        "summary": summary,
    }
