from fastapi import APIRouter, HTTPException, status
from services.product_service import load_products, get_product_by_id

router = APIRouter(tags=["Products"])

@router.get("/products")
def get_products():
    """
    Returns all product records from products.json.
    """
    return load_products()

@router.get("/products/{product_id}")
def get_product(product_id: str):
    """
    Returns a single product record matching the given ID.
    Returns HTTP 404 if product is not found.
    """
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id '{product_id}' not found"
        )
    return product
