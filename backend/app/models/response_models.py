# models/response_models.py
from pydantic import BaseModel
from typing import Dict, List, Optional, Any


class LLMResponses(BaseModel):
    """
    Map of UI model-label -> model response text
    Example:
      { "Claude 3.5 Sonnet": "text...", "GPT-4 (OpenRouter)": "text..." }
    """
    responses: Dict[str, str]


class ParseResult(BaseModel):
    global_domains: Dict[str, int]
    per_model_domains: Dict[str, Dict[str, int]]
    topics: List[List]  # list of [word, count] pairs
    citations: Dict[str, int]


class MetricsPerModel(BaseModel):
    response_length: int
    domain_count: int
    unique_domains: int
    visibility_score: float


class MetricsResult(BaseModel):
    metrics: Dict[str, MetricsPerModel]


class GeoScoreResult(BaseModel):
    target_domain: str
    geo_score: float
    per_model_mentions: Dict[str, int]


class SummaryResult(BaseModel):
    summary: str
    insights: str
