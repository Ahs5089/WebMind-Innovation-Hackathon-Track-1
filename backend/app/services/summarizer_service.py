# services/summarizer_service.py
import asyncio
from typing import Dict
from app.core.utils import normalize_domain, counter_to_dict

from app.services.ai_client import query_model as query_llm  # or query_llm if you rename it later
# your existing ai_client module

DEFAULT_SUMMARY_PROVIDER = "claude"  # prefer Claude if available


async def synthesize_summary(responses: Dict[str, str], prefer_provider: str = DEFAULT_SUMMARY_PROVIDER) -> str:
    """
    Combine responses and ask an LLM to create a short professional summary.
    This function runs the blocking query_llm in a thread to avoid blocking the event loop.
    """
    if not responses:
        return "No responses to summarize."

    combined = []
    for model, text in responses.items():
        # skip error tokens
        if text and not text.startswith("⚠️"):
            snippet = text.strip()
            combined.append(f"**{model}:** {snippet[:800]}")

    combined_text = "\n\n".join(combined).strip()
    if not combined_text:
        return "⚠️ All models returned errors or empty responses."

    synthesis_prompt = f"""
You are an expert analyst. Analyze these AI model responses and create a concise 4-sentence professional summary that:
1) Identifies common themes across all responses
2) Notes any unique insights from specific models
3) Highlights disagreements or contradictions
4) Assesses citation quality and source diversity

Model Responses:
{combined_text}

Provide your analysis:
"""

    # call query_llm in a thread (query_llm is synchronous in ai_client.py)
    try:
        # try preferred provider first
        summary = await asyncio.to_thread(
            query_llm,
            synthesis_prompt,
            prefer_provider,
            None,
            300,
            0.5
        )
        if isinstance(summary, str) and summary.startswith("⚠️"):
            # fallback to groq
            summary = await asyncio.to_thread(query_llm, synthesis_prompt, "groq", None, 300, 0.5)
        return summary
    except Exception as e:
        return f"⚠️ Summary generation failed: {str(e)}"


def generate_insights(global_domains, per_model_domains, metrics) -> str:
    """
    Create short bullet insights from analysis results (non-LLM).
    """
    insights = []

    # global_domains expected as Counter or dict-like
    if hasattr(global_domains, "most_common"):
        most = global_domains.most_common(1)
    else:
        # convert dict to list of tuples sorted
        most = sorted(global_domains.items(), key=lambda x: x[1], reverse=True)[:1]

    if most:
        top_domain = most[0]
        insights.append(f"🔝 Most mentioned domain: **{top_domain[0]}** ({top_domain[1]} mentions)")

    if metrics:
        best = max(metrics.items(), key=lambda kv: kv[1].get('visibility_score', 0.0))
        insights.append(f"🏆 Highest visibility score: **{best[0]}** ({best[1]['visibility_score']}%)")

    total_unique = len(global_domains) if not hasattr(global_domains, "most_common") else len(global_domains)
    insights.append(f"🌐 Total unique domains mentioned: **{total_unique}**")

    if metrics:
        avg_len = sum(m['response_length'] for m in metrics.values()) / len(metrics)
        insights.append(f"📝 Average response length: **{int(avg_len)} characters**")

    return "\n\n".join(insights)
