# Blinkit Confidence Guarantee — AI-Native MVP (Part 4)

> **A product case study MVP demonstrating the Blinkit Confidence Guarantee: an AI-powered Confidence Check for Blinkit's Beauty & Personal Care category.**

🔗 **Live Demo:** [blinkit-ai-confidence-check.vercel.app](https://blinkit-ai-confidence-check.vercel.app)

---

## Problem Statement

Blinkit has successfully established itself as India's leading quick-commerce platform, but despite growing awareness of its Beauty & Personal Care catalogue, conversion in this category remains lower than expected. Users already know Blinkit sells these products — the barrier is not discovery, it is **purchase confidence**: customers leave Blinkit to research authenticity, suitability, and quality on ChatGPT, Reddit, Nykaa, and Amazon before buying. This confidence gap introduces friction into what is otherwise a fast, frictionless shopping experience.

---

## What This MVP Does

**Blinkit Confidence Guarantee** surfaces an **AI-powered Confidence Check** inline on the Product Detail Page, eliminating the need for users to leave Blinkit to validate a purchase. The user selects their concern — **Authenticity**, **Skin Suitability**, **Quality**, or **Returns** — and the system generates a grounded, product-specific response derived from verified product data (ingredients, supply chain signals, batch information, and return policies).

Key surfaces:
- **Purchase Confidence panel** — 4-dimension trust score (Authenticity, Skin Match, Quality, Returns) with progress bars and an AI recommendation snippet
- **AI Evidence Report** — a full-screen detail sheet with dedicated sections for Authenticity Evidence, Skin Compatibility Analysis, Ingredient Intelligence, Community Review Insights, Risk Assessment, Return Protection Analysis, and a Final AI Recommendation

The product principle: **Engineer Purchase Confidence, not Product Discovery.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| AI Model | Groq — Llama 3.3 70B (`llama-3.3-70b-versatile`) |
| Backend API | Python + FastAPI |
| Product Data | `backend/data/products.json` (6 curated Beauty & Personal Care SKUs) |
| Deployment | Vercel (frontend) |
| HTTP Client | Axios |

---

## Local Setup

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- A Groq API key — get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/ck-anand612/blinkit-ai-confidence-check.git
cd blinkit-ai-confidence-check
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
LLM_MODEL=llama-3.3-70b-versatile
```

### 3. Start the backend

```bash
cd backend
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`. Confirm health: [http://localhost:8000/health](http://localhost:8000/health)

### 4. Start the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### 5. Navigate to a product

Open [http://localhost:5173](http://localhost:5173) → select any product → scroll to the **Purchase Confidence** panel → tap **See all evidence** to open the AI Evidence Report.

---

## Project Structure

```
blinkit-ai-confidence-check/
├── backend/
│   ├── data/
│   │   └── products.json          # 6 curated Beauty & Personal Care SKUs
│   ├── routers/
│   │   ├── products.py            # GET /api/products, GET /api/products/:id
│   │   └── confidence.py         # POST /api/confidence-check (Groq/LLM)
│   ├── services/
│   ├── main.py                    # FastAPI app entry point
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── images/products/      # Product image assets
│   └── src/
│       ├── api/client.js          # Axios API client
│       ├── components/
│       │   ├── AIConfidenceCheck/ # Purchase Confidence panel + Evidence Sheet
│       │   ├── ProductHeader/     # Hero image, price, delivery badge
│       │   ├── TrustSignals/      # Brand Verified, Batch Verified badges
│       │   ├── AddToCartCTA/      # Sticky Add-to-Cart footer
│       │   └── Common/            # Header, BottomNav, LoadingSpinner, etc.
│       ├── pages/
│       │   ├── ProductDetailPage.jsx  # ← Core MVP page
│       │   ├── HomePage.jsx
│       │   └── ProductListingPage.jsx
│       └── utils/aiContentGenerator.js  # Client-side fallback content
├── docs/
│   ├── problem_statement.md       # Full problem statement (Part 4)
│   ├── architecture.md
│   ├── implementation.md
│   └── edge_cases.md
├── .env.example                   # Environment variable template
└── README.md
```

---

## Scope

### Included in this MVP

- Beauty & Personal Care products on the Product Detail Page
- Blinkit Confidence Guarantee — AI-powered Confidence Check (concern-driven summary generation via Groq Llama 3.3 70B)
- Authenticity Assurance signals
- Trust Signal badges (Brand Verified, Batch Verified, Cold Chain)
- Local Confidence Signals (delivery time, dark store proximity)
- Risk-Free Purchase Assurance (return policy)

### Out of Scope

- Shopping chatbot or general-purpose AI assistant
- Personalized / algorithmic product recommendations
- Checkout redesign
- Loyalty programme
- Inventory optimization
- Search improvements
- Cart experience
- Delivery optimization

> See [`docs/problem_statement.md`](docs/problem_statement.md) for the full scoping rationale.

---

## Documentation

| Document | Description |
|---|---|
| [`docs/problem_statement.md`](docs/problem_statement.md) | User research findings, root cause analysis, problem statement, success metrics, and scope |
| [`docs/architecture.md`](docs/architecture.md) | System architecture, data flow, and API design |
| [`docs/implementation.md`](docs/implementation.md) | Implementation details and component breakdown |
| [`docs/edge_cases.md`](docs/edge_cases.md) | Edge cases and error handling decisions |
