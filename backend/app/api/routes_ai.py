# app/api/routes_ai.py
from fastapi import APIRouter
from app.models.request_models import AIQueryRequest
from app.services.ai_client import query_model

# router = APIRouter()

# @router.post("/query")
# async def query_ai_models(data: AIQueryRequest):
#     results = {}
#     for model in data.models:
#         text = await query_model(data.prompt, provider=model)
#         results[model] = text
#     return {"responses": results}


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class QueryRequest(BaseModel):
    prompt: str
    models: list[str]

@router.post("/query")
async def query_ai(req: QueryRequest):
    # For demo — later replace with actual API calls to models
    responses = {}
    for m in req.models:
        responses[m] = f"Mocked response from {m} for prompt: {req.prompt}"
    return {"responses": responses}
