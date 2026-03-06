# Blockchain Storage Backend

FastAPI backend for the Blockchain Storage project.

## Setup

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

- API: **http://127.0.0.1:8000**
- Docs: **http://127.0.0.1:8000/docs**

For the React frontend, set `VITE_API_BASE_URL=http://localhost:8000` in `frontend/.env.local`.

## Troubleshooting

- **"The module 'venv' could not be loaded"** — Use `.\venv\Scripts\Activate.ps1` (with `.\`).
- **Execution policy error** — Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
