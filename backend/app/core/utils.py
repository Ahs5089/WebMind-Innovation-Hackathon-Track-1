# core/utils.py
import re
from collections import Counter
from typing import Dict, Tuple, List
from urllib.parse import urlparse


DOMAIN_PATTERN = r'\b(?:https?://)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,6})\b'


def normalize_domain(raw: str) -> str:
    """
    Normalize a domain-like string:
    - strip protocol
    - remove www.
    - lowercase
    - strip trailing slashes
    """
    if not raw:
        return ""
    raw = raw.strip().lower()
    # quick parse
    if raw.startswith("http://") or raw.startswith("https://"):
        try:
            parsed = urlparse(raw)
            host = parsed.netloc or parsed.path
        except Exception:
            host = raw
    else:
        host = raw
    host = host.replace("www.", "")
    host = host.strip().strip("/")
    return host


def counter_to_dict(c: Counter) -> Dict[str, int]:
    """Convert a Counter object to a regular dict (JSON serializable)."""
    return {k: int(v) for k, v in c.items()}


def top_n_from_counter(c: Counter, n: int = 20) -> List[Tuple[str, int]]:
    """Return most common n items from a Counter as a list of tuples."""
    return c.most_common(n)
