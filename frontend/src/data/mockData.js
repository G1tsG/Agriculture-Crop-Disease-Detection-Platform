export const MOCK_RESULT = {
  disease: "Late Blight",
  scientificName: "Phytophthora infestans",
  confidence: 94.7,
  severity: "High",
  crop: "Tomato",
  symptoms: [
    "Dark brown to black water-soaked lesions on leaves",
    "White mold growth on underside of leaves in humid conditions",
    "Rapid wilting and collapse of affected tissue",
    "Brown lesions on stems and petioles",
    "Firm, dark brown rot on fruits",
  ],
  causes: [
    "Fungal-like pathogen Phytophthora infestans",
    "Cool temperatures (10–25°C) with high humidity",
    "Extended periods of leaf wetness (>10 hrs)",
    "Infected seed tubers or plant material",
  ],
  features: [
    "Water-soaked spots on lower leaves",
    "White fungal growth under leaf surface",
    "Fruit lesions that turn brown and rot",
    "Stem and petiole discoloration",
  ],
  precautions: [
    "Remove and destroy infected foliage immediately",
    "Avoid overhead watering and keep foliage dry",
    "Apply preventive fungicide at first sign of disease",
    "Rotate susceptible crops to reduce pathogen load",
  ],
  treatments: [
    { step: 1, action: "Remove infected plants immediately", priority: "urgent" },
    { step: 2, action: "Apply copper-based fungicide spray", priority: "urgent" },
    { step: 3, action: "Improve air circulation around plants", priority: "high" },
    { step: 4, action: "Avoid overhead irrigation", priority: "high" },
    { step: 5, action: "Apply preventive fungicide weekly", priority: "medium" },
    { step: 6, action: "Rotate crops next season", priority: "medium" },
  ],
  fungicides: [
    { name: "Mancozeb", type: "Protectant", dose: "2.5 g/L water", frequency: "7 days" },
    { name: "Metalaxyl-M", type: "Systemic", dose: "2 g/L water", frequency: "10 days" },
    { name: "Copper Oxychloride", type: "Contact", dose: "3 g/L water", frequency: "5 days" },
    { name: "Chlorothalonil", type: "Broad-spectrum", dose: "2 g/L water", frequency: "7 days" },
  ],
  links: [
    { title: "ICAR Late Blight Management Guide", url: "#" },
    { title: "FAO Plant Disease Factsheet", url: "#" },
    { title: "Krishi Vigyan Kendra Resources", url: "#" },
  ],
};

export const SCAN_HISTORY = [
  { id: 1, crop: "Tomato", disease: "Late Blight", date: "May 12, 2026", confidence: 94, severity: "High", img: "🍅" },
  { id: 2, crop: "Wheat", disease: "Rust (Yellow)", date: "May 10, 2026", confidence: 88, severity: "Medium", img: "🌾" },
  { id: 3, crop: "Rice", disease: "Blast", date: "May 8, 2026", confidence: 91, severity: "High", img: "🌿" },
  { id: 4, crop: "Maize", disease: "Northern Leaf Blight", date: "May 5, 2026", confidence: 79, severity: "Low", img: "🌽" },
  { id: 5, crop: "Tomato", disease: "Healthy", date: "May 2, 2026", confidence: 97, severity: "None", img: "🍅" },
];

export const RISK_DATA = [
  { region: "Hisar", risk: 85, lat: 29.1, lng: 75.7 },
  { region: "Rohtak", risk: 62, lat: 28.9, lng: 76.5 },
  { region: "Karnal", risk: 71, lat: 29.7, lng: 77.0 },
  { region: "Sirsa", risk: 45, lat: 29.5, lng: 75.0 },
  { region: "Ambala", risk: 38, lat: 30.4, lng: 76.8 },
  { region: "Kurukshetra", risk: 55, lat: 30.0, lng: 76.8 },
];