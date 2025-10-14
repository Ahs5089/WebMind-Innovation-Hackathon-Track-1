# GEO Analyzer Project 🌍

A full-stack application for intelligent GEO insights.

## 🔧 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** FastAPI (Python)
- **Database:** (optional or mention your choice)
- **API Docs:** `http://127.0.0.1:8000/docs`

## 🚀 How to Run Locally

### Backend
```bash
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload


### 1️⃣ frontend Setup 
cd ../frontend
python -m http.server 5500


project_root/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── requirements.txt
│
└── frontend/
    ├── index.html
    ├── styles/
    │   └── style.css
    ├── scripts/
    │   └── app.js
    └── assets/
        └── logo.png
