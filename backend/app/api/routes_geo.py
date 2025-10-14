# app/api/routes_geo.py
from fastapi import APIRouter
from app.models.request_models import GeoScoreRequest
from app.services.analyzer_service import compute_geo_score

# router = APIRouter()

# @router.post("/score")
# async def geo_score(data: GeoScoreRequest):
#     score = compute_geo_score(data.global_counts, data.target_domain, data.total_models)
#     return {"geo_score": score}



from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class GeoRequest(BaseModel):
    global_counts: dict[str, int]
    target_domain: str
    total_models: int

@router.post("/score")
async def compute_geo(req: GeoRequest):
    # simple fake GEO score
    mentions = req.global_counts.get(req.target_domain, 0)
    geo_score = round((mentions / (req.total_models or 1)) * 100, 2)
    return {"geo_score": geo_score}

from fastapi import APIRouter
from pydantic import BaseModel
from collections import Counter

router = APIRouter()

class GeoRequest(BaseModel):
    global_counts: dict[str, int]
    target_domain: str
    total_models: int

@router.post("/score")
async def compute_geo(req: GeoRequest):
    # Use your analyzer logic
    score = compute_geo_score(Counter(req.global_counts), req.target_domain, req.total_models)
    return {"geo_score": score}