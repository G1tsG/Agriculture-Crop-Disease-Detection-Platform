from functools import lru_cache
from importlib import import_module
from pathlib import Path

import numpy as np

from ..utils.image_preprocess import preprocess_image

MODEL_PATH = Path(__file__).resolve().parents[3] / "models" / "final_weights.keras"

CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites",
    "Tomato_Target_Spot",
    "Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato_mosaic_virus",
    "Tomato_healthy",
]


@lru_cache(maxsize=1)
def _load_model():
    tensorflow = import_module("tensorflow")
    return tensorflow.keras.models.load_model(str(MODEL_PATH))


def predict_disease(file_path: str):
    with open(file_path, "rb") as file:
        processed_image = preprocess_image(file.read())

    model = _load_model()
    prediction = model.predict(processed_image)

    predicted_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction)) * 100
    predicted_class = CLASS_NAMES[predicted_index]

    return {
        "disease": predicted_class,
        "confidence": round(confidence, 2),
    }
