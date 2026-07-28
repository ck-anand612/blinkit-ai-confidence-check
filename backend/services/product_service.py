import json
import os
from typing import List, Dict, Any, Optional

PRODUCTS_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'products.json')

def load_products() -> List[Dict[str, Any]]:
    if not os.path.exists(PRODUCTS_FILE_PATH):
        return []
    with open(PRODUCTS_FILE_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_product_by_id(product_id: str) -> Optional[Dict[str, Any]]:
    products = load_products()
    for product in products:
        if product.get("id") == product_id:
            return product
    return None
