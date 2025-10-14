from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_analysis():
    response = client.post("/analysis", json={"text": "hello hello world"})
    assert response.status_code == 200
    data = response.json()
    assert data["word_count"] == 3
    assert data["unique_words"] == 2
