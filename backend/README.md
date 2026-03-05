# Blockchain Storage Backend

This directory contains a FastAPI application serving as the backend for the Blockchain Storage project.

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
```

## Running

```powershell
cd backend
.\.venv\Scripts\Activate
uvicorn main:app --reload
```

The application will be available at `http://127.0.0.1:8000` with documentation at `/docs`.
