#services/ai_client.py
import httpx
import os

API_KEYS = {
    "groq": os.getenv("GROQ_API_KEY"),
    "claude": os.getenv("ANTHROPIC_API_KEY"),
    "gemini": os.getenv("GEMINI_API_KEY"),
    "openrouter": os.getenv("OPENROUTER_API_KEY"),
    "huggingface": os.getenv("HUGGINGFACE_API_KEY"),
}

async def query_model(prompt: str, provider: str, max_tokens: int = 600):
    # For now return mock data
    return f"Simulated response from {provider} for: {prompt}"
