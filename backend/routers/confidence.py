from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from services.product_service import get_product_by_id
from services.groq_service import generate_confidence_summary

class ConfidenceCheckRequest(BaseModel):
    product_id: str
    concern: str

ALLOWED_CONCERNS = {"authenticity", "suitability", "quality", "returns"}

router = APIRouter(tags=["Confidence"])

@router.post("/confidence-check")
def confidence_check(request: ConfidenceCheckRequest):
    """
    POST /api/confidence-check
    Validates concern, fetches product, and calls Groq service for AI confidence summary.
    """
    if request.concern not in ALLOWED_CONCERNS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid concern '{request.concern}'. Allowed concerns: {sorted(list(ALLOWED_CONCERNS))}"
        )

    product = get_product_by_id(request.product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id '{request.product_id}' not found"
        )

    summary = generate_confidence_summary(product, request.concern)

    trust_signals_dict = product.get("trustSignals", {})
    trust_signals_list = [val for val in trust_signals_dict.values() if val]

    return {
        "concern": request.concern,
        "summary": summary,
        "trust_signals": trust_signals_list
    }
