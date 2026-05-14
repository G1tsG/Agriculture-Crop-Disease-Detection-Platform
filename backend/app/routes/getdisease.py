from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from ..services.models import predict_disease

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/predict")
async def get_disease(file: UploadFile = File(...)):

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = predict_disease(str(file_path))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {
        "success": True,
        "prediction": result
    }