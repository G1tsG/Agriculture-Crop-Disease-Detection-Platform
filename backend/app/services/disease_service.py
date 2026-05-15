import json
from copy import deepcopy
from pathlib import Path

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

        # Try exact match first
        disease_doc = await collection.find_one({"disease_name": disease_name})
        print(f"Exact match result: {disease_doc is not None}")

        # Try case-insensitive regex match
        if not disease_doc:
            disease_doc = await collection.find_one({
                "disease_name": {"$regex": disease_name, "$options": "i"}
            })
            print(f"Case-insensitive match result: {disease_doc is not None}")

        if disease_doc:
            print(f"Found disease document: {disease_doc.get('disease_name', 'N/A')}")
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
