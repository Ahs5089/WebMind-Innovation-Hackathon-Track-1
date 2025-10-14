# core/config.py
from pydantic import BaseSettings, AnyHttpUrl
from typing import List, Optional


class Settings(BaseSettings):
    # API keys for LLM providers (optional, depending on which providers you use)
    GROQ_API_KEY: Optional[str] = None
    OPENROUTER_API_KEY: Optional[str] = None
    HUGGINGFACE_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None

    # CORS / app
    CORS_ORIGINS: str = "http://localhost:3000"

    # Defaults for LLM query
    DEFAULT_MAX_TOKENS: int = 600
    DEFAULT_TEMPERATURE: float = 0.7

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
