# services/parser_service.py
import re
from collections import Counter
from typing import Dict, Tuple, List

from app.core.utils import normalize_domain, counter_to_dict


# reuse same regex (kept intentionally simple)
DOMAIN_PATTERN = r'\b(?:https?://)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,6})\b'


def parse_domains(responses: Dict[str, str]) -> Tuple[Counter, Dict[str, Counter]]:
    """
    Extract domains from each model response and return:
      - global Counter of all domains
      - per-model mapping to Counters
    """
    global_domains = []
    per_model_domains = {}

    for model_label, text in responses.items():
        text = text or ""
        found = re.findall(DOMAIN_PATTERN, text)
        # normalize
        cleaned = [normalize_domain(d) for d in found if d]
        per_model_domains[model_label] = Counter(cleaned)
        global_domains.extend(cleaned)

    return Counter(global_domains), per_model_domains


def parse_topics(responses: Dict[str, str], top_n: int = 20) -> List[tuple]:
    """
    Extract simple keyword frequency (words >=4 chars, filtered by stop words)
    Returns list of (word, count)
    """
    words = []
    stop_words = {
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'this', 'that', 'these', 'those', 'is',
        'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
        'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might',
        'can', 'your', 'you', 'it', 'its', 'their', 'them', 'they', 'also',
        'more', 'most', 'some', 'such', 'into', 'through', 'during', 'before',
        'after', 'above', 'below', 'between', 'under', 'again', 'further',
        'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
        'both', 'each', 'few', 'other', 'than', 'too', 'very', 'just', 'about',
        'only', 'which', 'what', 'who', 'whom', 'whose', 'while', 'because',
        'if', 'so', 'as', 'until', 'since', 'like', 'make', 'made', 'many',
        'much', 'well', 'back', 'even', 'still', 'way', 'take'
    }

    for text in responses.values():
        text = text or ""
        tokens = re.findall(r'\b\w{4,}\b', text.lower())
        filtered = [t for t in tokens if t not in stop_words]
        words.extend(filtered)

    c = Counter(words)
    return c.most_common(top_n)


def extract_citations(responses: Dict[str, str]) -> Dict[str, int]:
    """
    Count citation-like patterns per model
    """
    citation_patterns = [
        r'\[\d+\]',      # [1], [2]
        r'\(\d{4}\)',    # (2024)
        r'according to',
        r'source:',
        r'reference:',
        r'cited in',
        r'study by',
        r'research shows',
        r'report by',
        r'published in'
    ]
    counts = {}
    for model, text in responses.items():
        text = text or ""
        total = 0
        for p in citation_patterns:
            total += len(re.findall(p, text, flags=re.IGNORECASE))
        counts[model] = int(total)
    return counts
