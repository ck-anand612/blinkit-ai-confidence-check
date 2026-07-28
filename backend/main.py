import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, confidence

# Load .env from project root (one level above backend/)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI(title="Blinkit Confidence Experience API", version="1.0.0")

# CORS — allow the Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Phase 3 routers
app.include_router(products.router, prefix="/api")
app.include_router(confidence.router, prefix="/api")

@app.get("/health")
def health_check():
    """Confirms the server is running and the Groq API key is loaded."""
    key_loaded = bool(os.getenv("GROQ_API_KEY") and os.getenv("GROQ_API_KEY") != "your_groq_api_key_here")
    return {"status": "ok", "groq_key_loaded": key_loaded}
