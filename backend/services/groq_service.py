import os
import logging
from groq import Groq

logger = logging.getLogger(__name__)

def generate_confidence_summary(product: dict, concern: str) -> str:
    """
    Generates an AI-driven confidence summary for a given product and concern using Groq API.
    Falls back to static concernContext[concern] if Groq API fails or key is missing.
    """
    fallback_text = product.get("concernContext", {}).get(concern, "")
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key or api_key == "your_groq_api_key_here":
        logger.warning("GROQ_API_KEY not configured or using default placeholder. Returning fallback context.")
        return fallback_text

    try:
        client = Groq(api_key=api_key)
        product_name = product.get("name", "")
        brand = product.get("brand", "")
        concern_context = product.get("concernContext", {}).get(concern, "")

        system_prompt = (
            "You are a purchase confidence assistant for Blinkit.\n"
            "STRICT GROUNDING RULE: Rely ONLY and STRICTLY on the provided Product context. "
            "Do NOT fabricate, invent, or extrapolate any external facts, statistics, percentages, clinical claims, or details not explicitly present in the provided Product context.\n"
            "Do not mention competitors. Do not recommend alternative products.\n"
            "Keep the response under 3 sentences. Be clear, reassuring, and 100% faithful to the source data."
        )

        user_prompt = (
            f"Product: {product_name} by {brand}\n"
            f"Category: Beauty & Personal Care\n"
            f"Customer concern: {concern}\n"
            f"Product context: {concern_context}\n\n"
            f"Respond to the customer's concern using ONLY the facts above."
        )

        models_to_try = ["llama-3.1-8b-instant", "llama3-8b-8192"]
        completion = None
        for model in models_to_try:
            try:
                completion = client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=0.4,
                    max_tokens=150
                )
                if completion and completion.choices:
                    break
            except Exception as e:
                logger.warning(f"Failed to generate summary with model '{model}': {e}")
                continue

        if completion and completion.choices and completion.choices[0].message.content:
            return completion.choices[0].message.content.strip()

        return fallback_text
    except Exception as e:
        logger.error(f"Error calling Groq API: {e}")
        return fallback_text
