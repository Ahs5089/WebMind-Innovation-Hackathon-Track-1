# app/models/request_models.py
from pydantic import BaseModel
from typing import List, Dict

class AIQueryRequest(BaseModel):
    prompt: str
    models: List[str]

class AnalysisRequest(BaseModel):
    responses: Dict[str, str]

class GeoScoreRequest(BaseModel):
    global_counts: dict
    target_domain: str
    total_models: int
