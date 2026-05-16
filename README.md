# 🌿 Agriculture Crop Disease Detection Platform

> A web-based plant disease detection platform with React frontend and FastAPI backend.

---

## 📖 Overview

This repository contains a working disease detection prototype that analyzes plant leaf images, predicts disease class with a Keras model, and displays structured results in a modern web UI.

The app combines:
- clean React/Vite frontend upload and preview flow
- FastAPI backend for image ingestion and model inference
- TensorFlow/Keras model weights in `models/final_weights.keras`
- optional disease metadata lookup from MongoDB or local JSON data

---

## 🚀 What It Does Today

- Upload a leaf image via drag-and-drop or camera capture
- Send the image to the backend at `POST /predict`
- Run inference using a TensorFlow/Keras model
- Return a disease label and confidence score
- Enrich predictions with symptoms, causes, treatments, fungicides, and resources when disease metadata is available
- Display results on a responsive results page with a clean UI

---

## 🛠️ Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Python, FastAPI, Uvicorn
- Model: TensorFlow / Keras
- Image processing: Pillow, NumPy
- Database: MongoDB optional, local JSON fallback supported

---

## 📂 Project Structure

```
Agriculture-Crop-Disease-Detection-Platform/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/getdisease.py
│   │   ├── services/models.py
│   │   ├── services/disease_service.py
│   │   ├── services/predict.py
│   │   ├── utils/image_preprocess.py
│   │   └── uploads/
│   ├── requirements.txt
│   └── run.sh
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/UploadPage.jsx
│   │   ├── pages/ResultsPage.jsx
│   │   ├── components/
│   │   └── styles/global.css
│   ├── package.json
│   └── vite.config.js
├── models/
│   └── final_weights.keras
└── dataset.md
```

---

## 🔍 Supported Classes

The current model predicts the following classes:

- Pepper Bell Bacterial Spot
- Pepper Bell Healthy
- Potato Early Blight
- Potato Late Blight
- Potato Healthy
- Tomato Bacterial Spot
- Tomato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold
- Tomato Septoria Leaf Spot
- Tomato Spider Mites
- Tomato Target Spot
- Tomato Yellow Leaf Curl Virus
- Tomato Mosaic Virus
- Tomato Healthy

---

## ⚙️ Local Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
./run.sh
```

This starts the FastAPI server on `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, typically `http://127.0.0.1:5173`.

---

## 🌐 Configuration

- The frontend defaults to `http://127.0.0.1:8000` for the API endpoint.
- Override the backend URL by setting `VITE_API_BASE_URL` in `frontend/.env` or your shell.

---

## 📡 API Reference

### POST /predict

Upload a leaf image using multipart form data with the field name `file`.

**Request**

```http
POST http://127.0.0.1:8000/predict
Content-Type: multipart/form-data

file=@leaf.jpg
```

**Response when disease metadata is available**

```json
{
  "success": true,
  "prediction": {
    "disease": "Tomato Early Blight",
    "crop": "Tomato",
    "scientificName": "Alternaria solani",
    "severity": "Medium",
    "confidence": 92.34,
    "symptoms": ["Dark lesions on lower leaves", "Yellowing between veins"],
    "causes": ["High humidity", "Poor air circulation"],
    "treatments": [{"step": 1, "action": "Remove infected leaves", "priority": "high"}],
    "fungicides": ["Copper oxychloride"],
    "links": ["https://example.com/tomato-early-blight"]
  },
  "source": "database"
}
```

**Response when only model prediction is available**

```json
{
  "success": true,
  "prediction": {
    "disease": "Tomato Early Blight",
    "confidence": 92.34
  },
  "source": "prediction_only"
}
```

---

## 🧠 Notes

- The frontend uses a mock fallback result if the backend request fails.
- Disease metadata enrichment is optional and depends on MongoDB or a local JSON dataset.
- This repo provides the web-based prototype only; it does not include a mobile app.

---

## 📚 Dataset

See `dataset.md` for the dataset reference used to train the model.

---

## ❤️ Credits

Built with React, Vite, FastAPI, TensorFlow, and Keras.
