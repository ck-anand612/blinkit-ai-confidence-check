# Implementation Plan — Blinkit Confidence Experience (AI-Native MVP)

> **Sources:** `docs/problem_statement.md` · `docs/architecture.md`
> This document describes the step-by-step implementation plan for the AI-Native MVP. It is organized by build phase, ordered to minimize dependency conflicts.

---

## 1. Goal

Build a working AI-augmented Product Detail Page (PDP) for Beauty & Personal Care products on Blinkit that:

- Displays product information and static trust signals.
- Enables users to select a purchase concern (Authenticity, Suitability, Quality, Returns).
- Calls the Groq API via FastAPI to generate a real-time, concern-specific confidence summary.
- Returns the confidence summary to the user on the same product page without leaving Blinkit.

---

## 2. Prerequisites

| Requirement | Details |
|---|---|
| Node.js | v18+ (for React/Vite frontend) |
| Python | 3.10+ (for FastAPI backend) |
| Groq API Key | Obtain from [console.groq.com](https://console.groq.com) |
| Package manager (frontend) | npm or yarn |
| Package manager (backend) | pip |

---

## 3. Repository Structure

The project follows a monorepo layout with a clear `frontend/` and `backend/` split, as defined in `architecture.md §9`.

```
blinkit-confidence-mvp/
├── docs/
│   ├── problem_statement.md
│   ├── architecture.md
│   └── implementation.md          ← this document
├── frontend/
├── backend/
├── .env
└── README.md
```

---

## 4. Phase 1 — Project Scaffolding

### 4.1 Initialize Frontend

- Scaffold a new Vite + React project inside `frontend/`.
- Install Tailwind CSS and configure it with the Vite project.
- Install Axios as a dependency.
- Install React Router for client-side routing between `/` and `/products/:id`.
- Confirm the dev server runs on `http://localhost:5173`.

### 4.2 Initialize Backend

- Create the `backend/` directory.
- Initialize a Python virtual environment inside `backend/`.
- Install FastAPI, Uvicorn, httpx (or the Groq Python SDK), and python-dotenv.
- Create `requirements.txt` listing all backend dependencies.
- Confirm the Uvicorn dev server runs on `http://localhost:8000`.

### 4.3 Environment Configuration

- Create a root-level `.env` file.
- Add `GROQ_API_KEY=<your_key>` to `.env`.
- Add `.env` to `.gitignore`.
- The FastAPI backend must load `GROQ_API_KEY` from the environment at startup using python-dotenv.

---

## 5. Phase 2 — Data Layer

### 5.1 Create `products.json`

Place `products.json` at `backend/data/products.json`.

Each product record must include the following fields as specified in `architecture.md §7.1`:

| Field | Type | Purpose |
|---|---|---|
| `id` | string | Unique product identifier |
| `name` | string | Product display name |
| `brand` | string | Brand name |
| `category` | string | Always `"Beauty & Personal Care"` for MVP |
| `subCategory` | string | e.g., Skincare, Haircare |
| `price` | number | Price in INR |
| `images` | string[] | Product image URLs |
| `description` | string | Short product description |
| `trustSignals.authenticity` | string | Displayed in `AuthenticityBadge` |
| `trustSignals.returnPolicy` | string | Displayed in `ReturnPolicyBadge` |
| `trustSignals.localConfidence` | string | Displayed in `LocalConfidenceSignal` |
| `concernContext.authenticity` | string | Injected into the Groq prompt |
| `concernContext.suitability` | string | Injected into the Groq prompt |
| `concernContext.quality` | string | Injected into the Groq prompt |
| `concernContext.returns` | string | Injected into the Groq prompt |

### 5.2 Populate Initial Product Records

- Add a minimum of 5–8 Beauty & Personal Care product records covering multiple sub-categories (Skincare, Haircare, etc.).
- All `concernContext` values must be product-specific to ensure the AI summary is grounded, not generic.

---

## 6. Phase 3 — Backend (FastAPI)

Build the FastAPI application in the following order.

### 6.1 Application Entry Point — `backend/main.py`

- Initialize the FastAPI app instance.
- Register the `products` and `confidence` routers.
- Configure CORS to allow requests from the React frontend (`http://localhost:5173`).
- Load environment variables at startup.

### 6.2 Products Router — `backend/routers/products.py`

Implement the following two endpoints:

**`GET /api/products`**
- Reads and returns all records from `products.json`.
- Response: array of product objects.

**`GET /api/products/{id}`**
- Reads `products.json` and returns the record matching `id`.
- Returns HTTP 404 if the product is not found.

### 6.3 Groq Service — `backend/services/groq_service.py`

- Accept `product` (the full product record) and `concern` (one of: `authenticity`, `suitability`, `quality`, `returns`) as inputs.
- Construct the concern-specific prompt using the product's `concernContext` field for the selected concern.
- Call the Groq Chat Completions API with the following parameters:

  | Parameter | Value |
  |---|---|
  | Model | `llama3-8b-8192` (or equivalent fast Groq model) |
  | Temperature | `0.4` |
  | Max tokens | `150` |

- Return the completion text from Groq.
- **Fallback:** If the Groq call fails, return the static `concernContext[concern]` string from the product record.

**Prompt structure:**

```
System:
You are a purchase confidence assistant for Blinkit.
Do not mention competitors. Do not recommend alternative products.
Keep the response under 3 sentences. Be clear and reassuring.

User:
Product: {name} by {brand}
Category: Beauty & Personal Care
Customer concern: {concern}
Product context: {concernContext[concern]}

Respond to the customer's concern.
```

### 6.4 Confidence Router — `backend/routers/confidence.py`

Implement:

**`POST /api/confidence-check`**
- Request body: `{ "product_id": string, "concern": string }`
- Validate that `concern` is one of the four allowed values.
- Look up the product by `product_id` from `products.json`.
- Call `groq_service` with the product and concern.
- Return the structured response:

```json
{
  "concern": "authenticity",
  "summary": "<AI-generated or fallback text>",
  "trust_signals": ["<relevant trustSignals values from the product record>"]
}
```

- Return HTTP 404 if `product_id` is not found.
- Return HTTP 422 if `concern` is invalid.

---

## 7. Phase 4 — Frontend (React + Vite + Tailwind)

Build the frontend in the following component-first order.

### 7.1 Axios Client — `frontend/src/api/client.js`

- Create a single shared Axios instance with `baseURL` pointing to `http://localhost:8000`.
- Export two functions:
  - `getProduct(id)` — calls `GET /api/products/{id}`
  - `getProducts()` — calls `GET /api/products`
  - `getConfidenceCheck(productId, concern)` — calls `POST /api/confidence-check`

### 7.2 Routing — `frontend/src/App.jsx`

- Configure React Router with two routes:
  - `/` → `ProductListingPage`
  - `/products/:id` → `ProductDetailPage`

### 7.3 Shared Components

Build these components before the pages, as pages depend on them.

#### `ProductCard.jsx`
- Displays product image, name, brand, price, and sub-category.
- Links to `/products/:id` on click.

#### `LoadingSpinner.jsx`
- Displayed while Axios calls are in-flight.

### 7.4 Product Listing Page — `frontend/src/pages/ProductListingPage.jsx`

- On mount, call `getProducts()` via Axios.
- Display a `LoadingSpinner` during fetch.
- Render a grid of `ProductCard` components once data loads.

### 7.5 Product Detail Page — `frontend/src/pages/ProductDetailPage.jsx`

This is the primary MVP surface. Build in the following sub-component order:

#### `ProductHeader` (in `components/ProductHeader/`)
- Renders: `ProductImage`, `ProductName`, `ProductBrand`, `PriceDisplay`.
- Receives product data as props.

#### `TrustSignals` (in `components/TrustSignals/`)

Three sub-components, each receiving its value from `product.trustSignals`:

| Component | Data source |
|---|---|
| `AuthenticityBadge` | `trustSignals.authenticity` |
| `ReturnPolicyBadge` | `trustSignals.returnPolicy` |
| `LocalConfidenceSignal` | `trustSignals.localConfidence` |

These render unconditionally as static UI elements. They are always visible regardless of AI call state.

#### `AIConfidenceCheck` (in `components/AIConfidenceCheck/`)

This is the core MVP feature. Build in this internal order:

1. **`ConcernSelector`**
   - Renders four concern buttons: Authenticity, Suitability, Quality, Returns.
   - On selection, sets `activeConcern` in parent state and triggers the Groq API call.

2. **`LoadingSpinner`** (reuse shared)
   - Displayed while `POST /api/confidence-check` is in-flight.

3. **`ConfidenceSummaryCard`**
   - Receives `summary` and `trust_signals` as props.
   - Rendered only after the API response is received.
   - Displays the AI-generated summary text and any trust signal tags.

**State managed in `AIConfidenceCheck`:**

| State variable | Type | Purpose |
|---|---|---|
| `activeConcern` | string or null | Currently selected concern |
| `summaryData` | object or null | API response (summary + trust_signals) |
| `loading` | boolean | True while Axios call is in-flight |
| `error` | boolean | True if API call fails and fallback is unavailable |

#### `AddToCartCTA`
- Renders the Add to Cart button.
- No cart implementation in scope; the button is rendered as a UI element only.

### 7.6 Page Assembly — `ProductDetailPage.jsx`

- On mount, call `getProduct(id)` using the `id` from the URL params.
- Display `LoadingSpinner` during fetch.
- Once data loads, render: `ProductHeader` → `TrustSignals` → `AIConfidenceCheck` → `AddToCartCTA`.
- Pass the `productId` down to `AIConfidenceCheck` for use in `POST /api/confidence-check`.

---

## 8. Phase 5 — Integration & Verification

### 8.1 End-to-End Flow Verification

Verify the following flows work correctly against the running frontend and backend:

| Flow | Steps | Expected Outcome |
|---|---|---|
| Page load | Navigate to `/products/:id` | Product data renders with header, trust signals, and empty confidence panel |
| Concern selection | Click "Authenticity" concern button | Loading spinner appears; confidence summary renders after API response |
| Concern switching | Click a different concern | Previous summary clears; new summary renders |
| Groq fallback | Temporarily invalidate GROQ_API_KEY | Static `concernContext` text renders; no error shown to user |
| 404 handling | Navigate to `/products/invalid-id` | Appropriate not-found state renders |

### 8.2 CORS Verification

- Confirm the React frontend at `http://localhost:5173` can call the FastAPI backend at `http://localhost:8000` without CORS errors in the browser console.

### 8.3 Scope Check

Before marking the MVP complete, verify each in-scope item from `problem_statement.md` is implemented:

- [ ] Beauty & Personal Care product pages render correctly
- [ ] Product Detail Page (PDP) is the only surface implemented
- [ ] AI Confidence Check generates concern-specific summaries
- [ ] Authenticity Assurance signal is displayed
- [ ] Trust Signals (all three) are visible on the PDP
- [ ] Local Confidence Signal (delivery cue) is displayed
- [ ] Risk-Free Purchase Assurance (return policy) is displayed
- [ ] None of the out-of-scope features are present (chatbot, recommendations, checkout, etc.)

---

## 9. Milestones Summary

| Phase | Deliverable | Dependencies |
|---|---|---|
| Phase 1 | Scaffolded frontend + backend, `.env` configured | None |
| Phase 2 | `products.json` populated with 5–8 products | Phase 1 |
| Phase 3 | FastAPI serving product data + Groq confidence endpoint | Phase 2 |
| Phase 4 | React PDP rendering trust signals + AI confidence panel | Phase 3 |
| Phase 5 | End-to-end integration verified; scope checklist complete | Phase 4 |

---

## 10. Out-of-Scope Constraints

The following must not be implemented during this MVP build, as explicitly defined in `problem_statement.md`:

- Shopping chatbot or conversational AI
- Personalized or algorithmic product recommendations
- Checkout flow changes
- Loyalty or rewards program
- Search feature or improvements
- Cart implementation
- Inventory management
- Delivery optimization

---

*Implementation Plan version: 1.0 — aligned to Architecture v2.0 and Problem Statement (Part 4, AI-Native MVP)*
