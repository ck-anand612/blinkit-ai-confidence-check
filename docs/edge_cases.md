# Edge Cases — Blinkit Confidence Experience (AI-Native MVP)

> **Sources:** `docs/problem_statement.md` · `docs/architecture.md` · `docs/implementation.md`
> This document enumerates edge cases across all system layers. For each case, it defines the trigger condition, the expected behavior, and which layer is responsible for handling it.

---

## 1. AI / Groq API Edge Cases

These cases affect `POST /api/confidence-check` and `backend/services/groq_service.py`.

---

### EC-AI-01 — Groq API call times out

| Field | Detail |
|---|---|
| **Trigger** | The Groq API does not respond within the configured timeout window |
| **Expected behavior** | Backend falls back to the static `concernContext[concern]` value from `products.json` and returns it as the `summary` field |
| **User-facing impact** | User sees a valid (static) confidence summary; no error message is shown |
| **Handling layer** | `groq_service.py` |

---

### EC-AI-02 — Groq API returns an HTTP error (4xx / 5xx)

| Field | Detail |
|---|---|
| **Trigger** | Groq returns a non-200 status code (e.g., 429 rate limit, 503 unavailable) |
| **Expected behavior** | Backend catches the error, falls back to static `concernContext[concern]` |
| **User-facing impact** | User sees the static fallback summary; no error is surfaced |
| **Handling layer** | `groq_service.py` |

---

### EC-AI-03 — Groq API key is missing or invalid

| Field | Detail |
|---|---|
| **Trigger** | `GROQ_API_KEY` is not set in `.env`, is empty, or has been revoked |
| **Expected behavior** | Backend catches the authentication error; falls back to static `concernContext[concern]` |
| **User-facing impact** | Static fallback summary renders; no credentials are exposed to the frontend |
| **Handling layer** | `groq_service.py`, `main.py` startup validation |

---

### EC-AI-04 — Groq returns an empty or whitespace-only completion

| Field | Detail |
|---|---|
| **Trigger** | The Groq API responds with HTTP 200 but the `content` field is empty or only whitespace |
| **Expected behavior** | Backend detects the empty response and falls back to static `concernContext[concern]` |
| **User-facing impact** | Static fallback summary renders; the `ConfidenceSummaryCard` is never shown empty |
| **Handling layer** | `groq_service.py` (post-response validation) |

---

### EC-AI-05 — Groq returns a response that is excessively long

| Field | Detail |
|---|---|
| **Trigger** | Despite the 150-token cap, the returned text is longer than expected (edge of model behavior) |
| **Expected behavior** | Backend truncates or accepts the response as-is; the `ConfidenceSummaryCard` renders the full text |
| **User-facing impact** | Minor layout overflow risk; handled with CSS text clamping in the card component |
| **Handling layer** | `groq_service.py` (token cap parameter); `ConfidenceSummaryCard.jsx` (CSS) |

---

### EC-AI-06 — Groq response mentions a competitor

| Field | Detail |
|---|---|
| **Trigger** | Despite the system prompt instruction, the LLM includes a competitor name (e.g., Nykaa, Amazon) |
| **Expected behavior** | For MVP: the response is returned as-is; competitor mention guard is a post-MVP improvement |
| **User-facing impact** | Edge case; system prompt instruction reduces but does not guarantee elimination |
| **Handling layer** | System prompt (soft guardrail only in MVP) |

> [!NOTE]
> A post-processing filter for competitor names is out of scope for the MVP but should be added pre-production.

---

## 2. Backend / FastAPI Edge Cases

These cases affect the API endpoints in `backend/routers/`.

---

### EC-BE-01 — `GET /api/products/{id}` — product ID not found

| Field | Detail |
|---|---|
| **Trigger** | The `id` in the URL does not match any product in `products.json` |
| **Expected behavior** | FastAPI returns HTTP 404 with a structured error message |
| **User-facing impact** | React renders a not-found state on the PDP |
| **Handling layer** | `backend/routers/products.py` |

---

### EC-BE-02 — `POST /api/confidence-check` — invalid `concern` value

| Field | Detail |
|---|---|
| **Trigger** | The `concern` field in the request body is not one of: `authenticity`, `suitability`, `quality`, `returns` |
| **Expected behavior** | FastAPI returns HTTP 422 (Unprocessable Entity) with a validation error |
| **User-facing impact** | This should never reach the user; the `ConcernSelector` only emits valid concern values |
| **Handling layer** | `backend/routers/confidence.py` (Pydantic model validation) |

---

### EC-BE-03 — `POST /api/confidence-check` — `product_id` not found

| Field | Detail |
|---|---|
| **Trigger** | The `product_id` in the request body does not match any record in `products.json` |
| **Expected behavior** | FastAPI returns HTTP 404 |
| **User-facing impact** | React renders an error state in the `AIConfidenceCheck` panel |
| **Handling layer** | `backend/routers/confidence.py` |

---

### EC-BE-04 — `POST /api/confidence-check` — missing required fields

| Field | Detail |
|---|---|
| **Trigger** | Request body is missing `product_id` or `concern` |
| **Expected behavior** | FastAPI returns HTTP 422 (Pydantic validation failure) |
| **User-facing impact** | Should not be reachable via the UI; defensive handling in `client.js` guards against it |
| **Handling layer** | `backend/routers/confidence.py` (Pydantic schema) |

---

### EC-BE-05 — `products.json` file is missing at startup

| Field | Detail |
|---|---|
| **Trigger** | `backend/data/products.json` does not exist when the FastAPI server starts |
| **Expected behavior** | FastAPI raises a startup error with a clear message; server does not start |
| **User-facing impact** | Server is unreachable; all API calls fail with a network error |
| **Handling layer** | `main.py` or router startup validation |

---

### EC-BE-06 — `products.json` contains malformed JSON

| Field | Detail |
|---|---|
| **Trigger** | `products.json` has a JSON syntax error |
| **Expected behavior** | FastAPI raises a parse error at startup or at first read; all product endpoints return HTTP 500 |
| **User-facing impact** | The product listing page and PDP both fail to render data |
| **Handling layer** | `backend/routers/products.py` (try/except on JSON load) |

---

### EC-BE-07 — A product record is missing a required field

| Field | Detail |
|---|---|
| **Trigger** | A product in `products.json` is missing a field such as `concernContext` or a sub-key like `concernContext.authenticity` |
| **Expected behavior** | Backend catches the `KeyError`; falls back to a generic trust message for that concern |
| **User-facing impact** | Confidence panel renders with a generic fallback; PDP does not crash |
| **Handling layer** | `groq_service.py` (safe dict access with `.get()`) |

---

### EC-BE-08 — CORS request from an unexpected origin

| Field | Detail |
|---|---|
| **Trigger** | A request arrives from an origin other than `http://localhost:5173` (e.g., a different port or domain) |
| **Expected behavior** | FastAPI's CORS middleware blocks the request with a 403 or omits the CORS headers |
| **User-facing impact** | Browser blocks the request; the UI shows a network error |
| **Handling layer** | `main.py` CORS configuration |

---

## 3. Data Layer / `products.json` Edge Cases

---

### EC-DATA-01 — Empty products array

| Field | Detail |
|---|---|
| **Trigger** | `products.json` exists but contains an empty array `[]` |
| **Expected behavior** | `GET /api/products` returns an empty array; the listing page renders an empty state |
| **User-facing impact** | Listing page shows a "no products found" message; PDP is unreachable |
| **Handling layer** | `ProductListingPage.jsx` (empty state render condition) |

---

### EC-DATA-02 — Duplicate product IDs in `products.json`

| Field | Detail |
|---|---|
| **Trigger** | Two or more product records share the same `id` value |
| **Expected behavior** | The first matching record is returned; duplicates are silently ignored |
| **User-facing impact** | Only one product renders; no crash |
| **Handling layer** | Data authoring responsibility; no runtime guard needed for MVP |

---

### EC-DATA-03 — Product has no images

| Field | Detail |
|---|---|
| **Trigger** | A product record has an empty `images` array `[]` or the field is absent |
| **Expected behavior** | `ProductImage` renders a placeholder image |
| **User-facing impact** | No broken image icon; placeholder is shown |
| **Handling layer** | `ProductImage` component (conditional render or default src) |

---

### EC-DATA-04 — Product image URL is broken or returns 404

| Field | Detail |
|---|---|
| **Trigger** | The image URL in `products.json` points to a resource that does not exist |
| **Expected behavior** | Browser fails to load the image; `ProductImage` falls back to a placeholder via `onError` handler |
| **User-facing impact** | Placeholder image displayed; no broken image icon |
| **Handling layer** | `ProductImage` component (`onError` → fallback src) |

---

## 4. Frontend / React UI Edge Cases

---

### EC-FE-01 — User navigates directly to `/products/:id` with an invalid ID

| Field | Detail |
|---|---|
| **Trigger** | User manually types or bookmarks a URL with a non-existent product ID |
| **Expected behavior** | Axios receives HTTP 404 from the backend; `ProductDetailPage` renders a not-found state |
| **User-facing impact** | Clear "product not found" message; no white screen or unhandled error |
| **Handling layer** | `ProductDetailPage.jsx` (error state from Axios response) |

---

### EC-FE-02 — User selects a concern while a previous Groq call is still in-flight

| Field | Detail |
|---|---|
| **Trigger** | User clicks a second concern before the first `POST /api/confidence-check` response arrives |
| **Expected behavior** | The previous request is cancelled or its response is discarded; only the latest concern's response renders |
| **User-facing impact** | No stale summary is shown; the loading spinner reflects the active concern |
| **Handling layer** | `AIConfidenceCheck.jsx` (cancel previous request using Axios cancel token or `AbortController`) |

---

### EC-FE-03 — User re-selects the same concern

| Field | Detail |
|---|---|
| **Trigger** | User clicks the same concern button that is already active |
| **Expected behavior** | No new API call is made; existing summary remains displayed |
| **User-facing impact** | No duplicate requests; no flickering |
| **Handling layer** | `AIConfidenceCheck.jsx` (guard: skip call if `activeConcern === selectedConcern`) |

---

### EC-FE-04 — Backend is unreachable (network error)

| Field | Detail |
|---|---|
| **Trigger** | The FastAPI backend is not running or the network is unavailable when the frontend makes any Axios call |
| **Expected behavior** | Axios throws a network error; the component renders an error state |
| **User-facing impact** | "Unable to load data" message; no white screen or unhandled promise rejection |
| **Handling layer** | `client.js` (Axios error interceptor or `catch` in calling component) |

---

### EC-FE-05 — `ConfidenceSummaryCard` receives an empty `trust_signals` array

| Field | Detail |
|---|---|
| **Trigger** | The backend response has `"trust_signals": []` |
| **Expected behavior** | `ConfidenceSummaryCard` renders only the summary text; no trust signal tags are shown |
| **User-facing impact** | Card renders without crashing; no empty list markers |
| **Handling layer** | `ConfidenceSummaryCard.jsx` (conditional render of trust signals section) |

---

### EC-FE-06 — Page load fetch fails (product listing)

| Field | Detail |
|---|---|
| **Trigger** | `GET /api/products` fails with a network error or 500 on the listing page |
| **Expected behavior** | `ProductListingPage` renders an error state |
| **User-facing impact** | "Failed to load products" message; no crash |
| **Handling layer** | `ProductListingPage.jsx` (error state from Axios catch) |

---

### EC-FE-07 — Page load fetch fails (product detail)

| Field | Detail |
|---|---|
| **Trigger** | `GET /api/products/{id}` fails with a network error or 500 on the PDP |
| **Expected behavior** | `ProductDetailPage` renders an error state |
| **User-facing impact** | "Unable to load product" message; trust signals and confidence panel are not shown |
| **Handling layer** | `ProductDetailPage.jsx` (error state from Axios catch) |

---

### EC-FE-08 — User navigates away from PDP mid-fetch

| Field | Detail |
|---|---|
| **Trigger** | User clicks the browser back button or navigates to `/` while an Axios call is in-flight |
| **Expected behavior** | The in-flight request is cancelled or its response is ignored; no state update on an unmounted component |
| **User-facing impact** | No React "state update on unmounted component" warning; no UI side-effects |
| **Handling layer** | `ProductDetailPage.jsx` and `AIConfidenceCheck.jsx` (`useEffect` cleanup / `AbortController`) |

---

### EC-FE-09 — `ConcernSelector` renders with no concern selected (initial state)

| Field | Detail |
|---|---|
| **Trigger** | Page loads and the user has not yet selected any concern |
| **Expected behavior** | `ConcernSelector` renders all four concern buttons with none highlighted; `ConfidenceSummaryCard` is not visible |
| **User-facing impact** | The confidence panel shows a prompt inviting the user to select a concern |
| **Handling layer** | `AIConfidenceCheck.jsx` (initial `activeConcern: null` state) |

---

## 5. Routing Edge Cases

---

### EC-RT-01 — User navigates to an undefined route

| Field | Detail |
|---|---|
| **Trigger** | User visits a URL that does not match `/` or `/products/:id` (e.g., `/about`) |
| **Expected behavior** | React Router renders a catch-all 404 component |
| **User-facing impact** | "Page not found" message with a link back to the product listing |
| **Handling layer** | `App.jsx` (catch-all `<Route path="*">`) |

---

### EC-RT-02 — Direct navigation to `/` with no products in the data file

| Field | Detail |
|---|---|
| **Trigger** | `products.json` is empty; user lands on the listing page |
| **Expected behavior** | `ProductListingPage` renders an empty state message |
| **User-facing impact** | "No products available" message; no crash |
| **Handling layer** | `ProductListingPage.jsx` |

---

## 6. Scope Boundary Edge Cases

These cases guard against accidentally introducing out-of-scope features during implementation.

---

### EC-SCOPE-01 — AI response resembles a product recommendation

| Field | Detail |
|---|---|
| **Trigger** | The Groq completion text suggests an alternative product |
| **Expected behavior** | System prompt instruction prohibits this; response is used as-is for MVP |
| **User-facing impact** | Minor; product recommendation guardrail is a post-MVP concern |
| **Handling layer** | System prompt (soft guardrail) |

---

### EC-SCOPE-02 — `AddToCartCTA` is clicked

| Field | Detail |
|---|---|
| **Trigger** | User clicks the Add to Cart button |
| **Expected behavior** | No cart logic executes; the button is a UI element only (no `onClick` handler wired to a cart) |
| **User-facing impact** | Button renders correctly; no cart interaction occurs in MVP |
| **Handling layer** | `AddToCartCTA.jsx` (no cart handler in scope) |

---

### EC-SCOPE-03 — `AIConfidenceCheck` is used as a free-text chat

| Field | Detail |
|---|---|
| **Trigger** | A user or developer attempts to send arbitrary text to the Groq endpoint |
| **Expected behavior** | The `concern` field is validated to only accept the four defined values; arbitrary input is rejected with HTTP 422 |
| **User-facing impact** | Not possible via the `ConcernSelector` UI; the endpoint rejects invalid values |
| **Handling layer** | `backend/routers/confidence.py` (Pydantic enum validation) |

---

## 7. Edge Case Summary Index

| ID | Category | Severity | Handling Layer |
|---|---|---|---|
| EC-AI-01 | Groq timeout | High | `groq_service.py` |
| EC-AI-02 | Groq HTTP error | High | `groq_service.py` |
| EC-AI-03 | Missing/invalid API key | High | `groq_service.py`, `main.py` |
| EC-AI-04 | Empty Groq response | Medium | `groq_service.py` |
| EC-AI-05 | Overlong Groq response | Low | CSS + token cap |
| EC-AI-06 | Competitor mention in response | Low | System prompt (soft) |
| EC-BE-01 | Product ID not found (GET) | High | `products.py` |
| EC-BE-02 | Invalid concern value | High | `confidence.py` |
| EC-BE-03 | Product ID not found (POST) | High | `confidence.py` |
| EC-BE-04 | Missing request fields | Medium | `confidence.py` |
| EC-BE-05 | `products.json` missing at startup | High | `main.py` |
| EC-BE-06 | Malformed `products.json` | High | `products.py` |
| EC-BE-07 | Missing product field | Medium | `groq_service.py` |
| EC-BE-08 | CORS blocked request | Medium | `main.py` |
| EC-DATA-01 | Empty products array | Medium | `ProductListingPage.jsx` |
| EC-DATA-02 | Duplicate product IDs | Low | Data authoring |
| EC-DATA-03 | No product images | Low | `ProductImage` component |
| EC-DATA-04 | Broken image URL | Low | `ProductImage` component |
| EC-FE-01 | Invalid product ID in URL | High | `ProductDetailPage.jsx` |
| EC-FE-02 | Concern selected mid-fetch | Medium | `AIConfidenceCheck.jsx` |
| EC-FE-03 | Same concern re-selected | Low | `AIConfidenceCheck.jsx` |
| EC-FE-04 | Backend unreachable | High | `client.js` |
| EC-FE-05 | Empty `trust_signals` array | Low | `ConfidenceSummaryCard.jsx` |
| EC-FE-06 | Listing page fetch failure | High | `ProductListingPage.jsx` |
| EC-FE-07 | PDP fetch failure | High | `ProductDetailPage.jsx` |
| EC-FE-08 | Navigate away mid-fetch | Medium | `useEffect` cleanup |
| EC-FE-09 | No concern selected (initial) | Low | `AIConfidenceCheck.jsx` |
| EC-RT-01 | Undefined route | Medium | `App.jsx` catch-all |
| EC-RT-02 | Empty listing page | Low | `ProductListingPage.jsx` |
| EC-SCOPE-01 | AI recommends a product | Low | System prompt |
| EC-SCOPE-02 | Add to Cart clicked | Low | `AddToCartCTA.jsx` |
| EC-SCOPE-03 | Chat-style Groq input | High | `confidence.py` Pydantic |

---

*Edge Cases version: 1.0 — aligned to Architecture v2.0 and Problem Statement (Part 4, AI-Native MVP)*
