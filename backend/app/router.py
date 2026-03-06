from pathlib import Path

from fastapi import APIRouter, File, UploadFile, HTTPException

router = APIRouter()

STORAGE_DIR = Path(__file__).resolve().parent.parent.parent / "Storage"


@router.get("/")
async def api_root():
    return {"message": "API ready", "docs": "/docs"}


@router.get("/files")
async def list_files():
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    files = []
    for p in sorted(STORAGE_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if p.is_file():
            stat = p.stat()
            files.append({"name": p.name, "size": stat.st_size})
    return {"files": files}


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    dest = STORAGE_DIR / file.filename or "unnamed"
    if dest.exists():
        base = dest.stem
        ext = dest.suffix
        n = 1
        while dest.exists():
            dest = STORAGE_DIR / f"{base} ({n}){ext}"
            n += 1
    content = await file.read()
    dest.write_bytes(content)
    return {"path": str(dest), "filename": dest.name}
