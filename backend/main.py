from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import router as api_router

app = FastAPI(
    title="Blockchain Storage API",
    version="1.0.0",
    description="Backend for blockchain-backed storage and verification.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api", tags=["api"])


@app.get("/")
async def root():
    return {"message": "Welcome to Blockchain Storage API"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
