# services/analyzer_service.py
from collections import Counter
from typing import Dict, Tuple, List
from app.core.utils import normalize_domain, counter_to_dict

from app.core.utils import counter_to_dict
from collections import Counter

import math


def compute_geo_score(global_counts: Counter, target_domain: str, total_models: int) -> float:
    """
    GEO score: proportion of models that mention the domain, expressed 0-100.
    If a domain is mentioned multiple times by a model it's still counted once per model in this metric.
    """
    if total_models <= 0:
        return 0.0
    if not target_domain:
        return 0.0

    target = normalize_domain(target_domain)
    # Count models that mentioned the domain at least once
    mentions = global_counts.get(target, 0)

    # This compute assumes global_counts is aggregated counts (across models).
    # To avoid counting multiple mentions from the same model multiple times we'd
    # prefer per-model counters; caller can pass the appropriate aggregated count.
    # We'll treat mentions / total_models as the fraction.
    score = (mentions / total_models) * 100
    return round(score, 2)


def model_comparison(per_model_counts: Dict[str, Dict[str, int]], target_domain: str) -> Dict[str, int]:
    """
    Return how many times each model mentioned the given domain (int).
    Accepts either Counter objects or plain dicts in per_model_counts values.
    """
    tgt = normalize_domain(target_domain)
    result = {}
    for model, counter in per_model_counts.items():
        # support either Counter or dict
        count = 0
        if hasattr(counter, "get"):
            count = int(counter.get(tgt, 0))
        else:
            count = int(counter.get(tgt, 0))
        result[model] = count
    return result


def calculate_visibility_metrics(responses: Dict[str, str], per_model_domains: Dict[str, Counter]) -> Dict[str, Dict]:
    """
    Create visibility metrics per model similar to the Streamlit frontend:
      - response_length
      - domain_count (sum of counts)
      - unique_domains (len of counter)
      - visibility_score (0-100)
    """
    metrics = {}
    for model, text in responses.items():
        text = text or ""
        domain_counter = per_model_domains.get(model, Counter())

        response_length = len(text)
        total_domains = int(sum(domain_counter.values()))
        unique_domains = int(len(domain_counter))

        # scoring heuristics (same as the agent)
        length_score = min(response_length / 1000, 1.0) * 40  # up to 40
        domain_score = min(total_domains / 10, 1.0) * 30      # up to 30
        diversity_score = min(unique_domains / 5, 1.0) * 30   # up to 30

        visibility_score = length_score + domain_score + diversity_score

        metrics[model] = {
            'response_length': int(response_length),
            'domain_count': total_domains,
            'unique_domains': unique_domains,
            'visibility_score': round(float(visibility_score), 2)
        }
    return metrics


def rank_models(metrics: Dict[str, Dict]) -> List[Tuple[str, float]]:
    """
    Return sorted list of (model, visibility_score) descending.
    """
    ranks = []
    for model, data in metrics.items():
        score = float(data.get('visibility_score', 0.0))
        ranks.append((model, score))
    return sorted(ranks, key=lambda x: x[1], reverse=True)


def compute_metrics(text: str):
    """
    Compute simple analysis metrics like word count, unique words, 
    character count, etc.
    """
    words = text.split()
    word_count = len(words)
    unique_words = len(set(words))
    char_count = len(text)

    # You could also use Counter for word frequencies
    word_freq = Counter(words)

    return {
        "word_count": word_count,
        "unique_words": unique_words,
        "char_count": char_count,
        "word_frequency": counter_to_dict(word_freq)
    }
