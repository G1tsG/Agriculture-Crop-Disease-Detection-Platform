from functools import lru_cache
from importlib import import_module
from pathlib import Path

import numpy as np

from ..utils.image_preprocess import preprocess_image

MODEL_PATH = Path(__file__).resolve().parents[3] / "models" / "final_weights.keras"

CLASS_NAMES = [
    "Pepper Bell Bacterial Spot",
    "Pepper Bell Healthy",
    "Potato Early Blight",
    "Potato Late Blight",
    "Potato Healthy",
    "Tomato Bacterial Spot",
    "Tomato Early Blight",
    "Tomato Late Blight",
    "Tomato Leaf Mold",
    "Tomato Septoria Leaf Spot",
    "Tomato Spider Mites",
    "Tomato Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Tomato Healthy",
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
