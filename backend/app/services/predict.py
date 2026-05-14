from fastapi import APIRouter, File, UploadFile

from .models import predict_disease

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

@router.post("/image")
async def predict_image(file: UploadFile = File(...)):

    contents = await file.read()

    result = predict_disease(contents)

    return result