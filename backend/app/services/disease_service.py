import json
from copy import deepcopy
from pathlib import Path
import re

from ..database import db

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "diseases.json"


def _load_local_disease_data():
    if not DATA_FILE.exists():
        return []

    try:
        with DATA_FILE.open("r", encoding="utf-8") as stream:
            return json.load(stream)
    except Exception as exc:
        print(f"Error loading local disease database: {exc}")
        return []


LOCAL_DISEASES = _load_local_disease_data()


def _normalize_name(name: str) -> str:
    return name.strip().replace(" ", "_").replace("__", "_").lower()


async def get_disease_details(disease_name: str):
    """
    Fetch disease details from MongoDB collection.

    Searches for the disease by disease_name field and returns
    all symptoms, treatments, prevention, and other details.
    """
    if not disease_name:
        print("No disease name provided")
        return None

    normalized_name = _normalize_name(disease_name)
    print(f"Fetching disease details for: {disease_name} (normalized: {normalized_name})")

    try:
        collection = db.diseases
        print(f"Connected to diseases collection")

        # Try several lookup strategies for robustness
        disease_doc = None

        # 1) Exact match on `disease_name`
        disease_doc = await collection.find_one({"disease_name": disease_name})
        if disease_doc:
            print("Exact match on disease_name")

        # 2) Exact match on alternative `disease` field
        if not disease_doc:
            disease_doc = await collection.find_one({"disease": disease_name})
            if disease_doc:
                print("Exact match on disease")

        # 3) Case-insensitive regex match on `disease_name` and `disease`
        if not disease_doc:
            disease_doc = await collection.find_one({
                "disease_name": {"$regex": disease_name, "$options": "i"}
            })
            if disease_doc:
                print("Regex match on disease_name")

        if not disease_doc:
            disease_doc = await collection.find_one({
                "disease": {"$regex": disease_name, "$options": "i"}
            })
            if disease_doc:
                print("Regex match on disease")

        # 4) Lastly, fall back to scanning documents and matching normalized names
        if not disease_doc:
            async for doc in collection.find({}):
                try:
                    doc_name = _normalize_name(doc.get("disease_name", ""))
                    doc_alias = _normalize_name(doc.get("disease", ""))
                    if normalized_name == doc_name or normalized_name == doc_alias:
                        disease_doc = doc
                        print("Found by normalized scan")
                        break
                except Exception:
                    continue

        if disease_doc:
            print(f"Found disease document: {disease_doc.get('disease_name', disease_doc.get('disease', 'N/A'))}")
            disease_doc.pop("_id", None)
            return disease_doc
        else:
            print(f"No disease document found for: {disease_name}")
    except Exception as e:
        print(f"Error fetching disease details from MongoDB: {str(e)}")
        import traceback
        traceback.print_exc()

    # Fallback to local JSON data if available
    print(f"Attempting to find disease in LOCAL_DISEASES ({len(LOCAL_DISEASES)} entries)")
    for disease_doc in LOCAL_DISEASES:
        if not disease_doc:
            continue

        doc_name = _normalize_name(disease_doc.get("disease_name", ""))
        doc_alias = _normalize_name(disease_doc.get("disease", ""))

        if normalized_name == doc_name or normalized_name == doc_alias:
            print(f"Found disease in local data: {disease_doc.get('disease_name', 'N/A')}")
            return deepcopy(disease_doc)

    print(f"No disease found in MongoDB or local data for: {disease_name}")
    return None


def _transform_disease_data(disease_doc: dict) -> dict:
    """
    Transform disease data from database structure to frontend structure.
    Maps database fields to frontend expected fields.
    """
    if not disease_doc:
        return None

    # Build a clean, predictable object for the frontend and keep the original
    # document under `raw` so we don't accidentally overwrite mapped fields.
    return {
        # Core identification
        "disease": disease_doc.get("disease_name", ""),
        "crop": disease_doc.get("plant_name", ""),
        "scientificName": disease_doc.get("scientific_name", "N/A"),

        # Assessment
        "severity": disease_doc.get("severity", "Medium"),
        "confidence": disease_doc.get("confidence_baseline", 0),

        # Classification
        "pathogen": disease_doc.get("pathogen", "Unknown"),
        "pathogen_type": disease_doc.get("pathogen_type", ""),

        # Symptoms and diagnosis
        "symptoms": disease_doc.get("symptoms", []) if isinstance(disease_doc.get("symptoms", []), list) else [],
        "causes": disease_doc.get("causes", []) if isinstance(disease_doc.get("causes", []), list) else [],

        # Treatment protocol
        "treatments": disease_doc.get("treatment_steps", []) if isinstance(disease_doc.get("treatment_steps", []), list) else [],

        # Fungicides/pesticides
        "fungicides": disease_doc.get("fungicides", []) if isinstance(disease_doc.get("fungicides", []), list) else [],

        # Additional info
        "prevention": disease_doc.get("prevention", []) if isinstance(disease_doc.get("prevention", []), list) else [],
        "additional_information": disease_doc.get("additional_information", ""),

        # Resources/links
        "links": disease_doc.get("resources", []) if isinstance(disease_doc.get("resources", []), list) else [],

        # Keep original document accessible but avoid merging top-level keys
        "raw": deepcopy(disease_doc)
    }


async def get_disease_details_mapped(disease_name: str):
    """
    Fetch disease details and transform to frontend structure.
    """
    disease_doc = await get_disease_details(disease_name)
    if disease_doc:
        return _transform_disease_data(disease_doc)
    return None
