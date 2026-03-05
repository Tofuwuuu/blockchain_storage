from fastapi import FastAPI

app = FastAPI(title="Blockchain Storage API", version="1.0.0")

# include routers from app package
from .app import router as app_router

app.include_router(app_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to Blockchain Storage API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}