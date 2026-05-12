# 🌿 Agriculture Crop Disease Detection Platform

> AI-powered early disease detection system for farmers — detect plant diseases from leaf images and get instant treatment recommendations.

---

## 📖 Overview

Crop diseases cause massive agricultural losses every year. This platform empowers farmers with an accessible, mobile-first tool that uses computer vision and machine learning to **detect plant diseases early** from simple leaf photographs — before the damage spreads.

Whether online or offline, in the field or at home, farmers get instant, actionable guidance.

---

## 🚀 Key Features

### Core Functionality
- 📸 **Leaf Image Input** — Snap or upload a photo of a diseased leaf
- 🔍 **Disease Classification** — Identifies disease type with high accuracy using deep learning
- 💊 **Treatment Suggestions** — Provides immediate, crop-specific treatment recommendations
- 📊 **Confidence Score** — Shows prediction confidence to guide decision-making

### Advanced Features
- 📱 **Mobile App for Farmers** — Intuitive, low-bandwidth Android/iOS app designed for rural use
- ⚡ **Offline Inference Optimization** — On-device ML model (TensorFlow Lite / ONNX) for areas with no connectivity
- 🌦️ **Weather API Integration** — Correlates local weather conditions with disease risk levels to provide context-aware alerts
- 🗺️ **Regional Disease Mapping** — Aggregates detection data to show disease hotspots by geography
- 🔔 **Early Warning Alerts** — Notifies farmers when weather + regional data suggests high disease risk

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Farmer (Mobile App)                 │
│          [ Capture Leaf Image ]                      │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │   Offline Inference     │  ← TFLite Model
          │   (On-Device ML)        │     (No internet needed)
          └────────────┬────────────┘
                       │ (if online)
          ┌────────────▼────────────┐
          │   Cloud ML API Server   │  ← Full Model (higher accuracy)
          └────────────┬────────────┘
                       │
          ┌────────────▼────────────┐
          │  Disease Classification │
          │  + Treatment Engine     │
          └────────────┬────────────┘
                       │
          ┌────────────▼────────────┐
          │  Weather API Layer      │  ← OpenWeatherMap / IMD API
          │  (Risk Contextualization│
          └────────────┬────────────┘
                       │
          ┌────────────▼────────────┐
          │  Results Dashboard      │
          │  Disease + Treatment    │
          │  + Weather Risk Score   │
          └─────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | Flutter (Android + iOS) |
| On-Device ML | TensorFlow Lite / ONNX Runtime |
| Cloud ML Backend | Python, FastAPI, PyTorch |
| Model Architecture | EfficientNet / ResNet (Transfer Learning) |
| Weather Integration | OpenWeatherMap API / IMD API |
| Database | PostgreSQL + Redis (caching) |
| Cloud Hosting | AWS / Google Cloud |
| Dataset | PlantVillage Dataset + Custom Data |

---

## 📂 Project Structure

```
crop-disease-detection/
├── mobile/                  # Flutter mobile application
│   ├── lib/
│   ├── assets/models/       # TFLite models for offline inference
│   └── pubspec.yaml
├── backend/                 # FastAPI ML server
│   ├── api/
│   ├── models/              # Trained model weights
│   ├── inference/
│   └── weather/             # Weather API integration
├── ml/                      # Model training pipeline
│   ├── train.py
│   ├── evaluate.py
│   └── datasets/
├── docs/                    # Documentation
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.9+
- Flutter SDK 3.x
- Node.js 18+

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-org/crop-disease-detection.git
cd crop-disease-detection/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your WEATHER_API_KEY and DATABASE_URL in .env

# Run the server
uvicorn api.main:app --reload
```

### Mobile App Setup
```bash
cd mobile
flutter pub get
flutter run
```

---

## 🌾 Supported Crops & Diseases

| Crop | Detected Diseases |
|---|---|
| Tomato | Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot |
| Potato | Early Blight, Late Blight |
| Corn | Common Rust, Northern Leaf Blight, Gray Leaf Spot |
| Wheat | Stripe Rust, Leaf Rust, Powdery Mildew |
| Rice | Blast, Brown Spot, Bacterial Blight |
| Grapes | Black Rot, Esca, Leaf Blight |

> More crops being added continuously.

---

## 📡 API Reference

### Detect Disease
```http
POST /api/v1/detect
Content-Type: multipart/form-data

{
  "image": <leaf_image_file>,
  "crop_type": "tomato",
  "location": { "lat": 29.15, "lon": 75.72 }
}
```

**Response:**
```json
{
  "disease": "Early Blight",
  "confidence": 0.94,
  "treatment": "Apply copper-based fungicide every 7-10 days...",
  "weather_risk": "High (humid conditions detected)",
  "severity": "Moderate"
}
```

---

## 👥 Team Members

| Name | Student ID | Role |
|---|---|---|
| **Manik** | 123110033 | ML Model Development & Training |
| **Gitansh** | 123110038 | Mobile App Development (Flutter) |
| **Raghav** | 123110031 | Backend API & Cloud Infrastructure |
| **Harsha** | 123110035 | Weather API Integration & UI/UX |

---

## 🙏 Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/api) — Weather data
- Indian Meteorological Department (IMD) — Regional weather data
- TensorFlow Lite team — On-device ML framework

---

*Built with ❤️ to empower Indian farmers through technology.*
