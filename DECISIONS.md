# Decisions and assumptions

## Assumptions

- The five initial featured products are IDs 1–5 from Fake Store API. The API adapter marks them as featured; the client does not hard-code product IDs.
- “Top rated” within a category means the three highest `rating.rate` values currently returned by the source. Remaining products appear in a separate collection below.
- Search is case-insensitive substring matching over title, description and category, performed by the backend.
- Product details and categories come from the same source as the rest of the catalogue. The source is external and may be unavailable, so API errors are surfaced to the client.
- Contact name, valid email, and phone are required. The message is prefilled with the selected product, and may be edited. The challenge says contact details but does not define fields, so phone was included as a reasonable sales follow-up detail.
- No customer account or cart/checkout is implied; the bag icon is decorative and the saved-heart interaction is session-only.

## Requirements simplified or dropped

- Docker Compose routes SMTP to Mailpit, a local inbox that provides real end-to-end email delivery without a hosted account. Without Docker/SMTP, the local sink persists enquiries as JSONL; it is explicitly a development fallback and not inbox delivery. Production should use a configured provider and monitor delivery failures.
- Product source results are cached in process for 60 seconds to reduce repeated upstream requests. This is not shared across instances and has no stale-on-error fallback.
- Featured status is a small curated ID list for the proof of concept, not an admin/editorial tool.
- Product rating counts and text are those provided by the demo API. No product metadata editing or inventory guarantees are modeled.
- The bag is visual only, and saved items do not persist after refresh; neither behavior is part of the acceptance criteria.

## How it can grow

- `ProductSource` isolates upstream data access from the Express routes and React client. A database-backed or commerce-platform adapter can implement the same list contract.
- `ProductService` centralizes caching and lookup. It can later own pagination, richer queries, and an explicit catalog model.
- Enquiry delivery uses an `EnquiryDelivery` interface. SMTP configuration is kept in environment variables, and another provider or durable queue can replace the local delivery adapter without changing the route contract.
- The API is the only client data boundary, so client UI does not depend on Fake Store's response shape beyond the shared product view model.

## Next with another day

1. Add route-level tests for search/category/featured combinations, validation, not-found behavior, and enquiry delivery success/failure.
2. Add a local email catcher to the one-command Docker Compose setup and verify messages in its web inbox.
3. Add retries/observability and a durable queue for email delivery; avoid acknowledging messages before durable acceptance.
4. Add accessible keyboard/focus review, image fallbacks, and responsive browser checks.
5. Replace demo ratings/featured IDs with explicit editorial fields and add pagination and source timeouts.

## Time spent

Fill in actual elapsed time before submission, split roughly across planning, building, testing and review. Do not estimate this from commit timestamps.
