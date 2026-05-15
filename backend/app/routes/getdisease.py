from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from ..services.models import predict_disease
from ..services.disease_service import get_disease_details

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/predict")
async def get_disease(file: UploadFile = File(...)):

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Get prediction from model
        print(f"Getting prediction from model for file: {file.filename}")
        prediction = predict_disease(str(file_path))
        print(f"Model prediction: {prediction}")

        # Fetch disease details from MongoDB
        print(f"Fetching disease details for: {prediction['disease']}")
        disease_details = await get_disease_details(prediction["disease"])
        print(f"Disease details found: {disease_details is not None}")

        if disease_details:
            disease_details["confidence"] = prediction["confidence"]
            disease_details["disease"] = disease_details.get(
                "disease",
                disease_details.get("disease_name", prediction["disease"])
            )
            disease_details["disease_name"] = disease_details.get(
                "disease_name",
                disease_details["disease"]
            )

            print(f"Returning database result with confidence: {disease_details['confidence']}")
            return {
                "success": True,
                "prediction": disease_details,
                "source": "database"
            }

        print("No disease details found, returning prediction only")
        return {
            "success": True,
            "prediction": prediction,
            "source": "prediction_only"
        }
    except Exception as exc:
        print(f"Error in /predict endpoint: {str(exc)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(exc)) from exc