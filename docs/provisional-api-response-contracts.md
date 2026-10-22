# Provisional API response contracts

Reviewed sources:

- `docs/reference/swagger-ui-init.js` — authoritative OpenAPI 3.0.3 input and route reference.
- `docs/reference/api-response-examples.md` — supplementary illustrative response examples.

The supplementary document explicitly says its values must be aligned with the
actual implementation before publication. The schemas in
`src/api/provisional-response-contracts.ts` are therefore **provisional fixture
schemas**, not verified production contracts. They are exported for isolated
tests and contract review only. No live endpoint, authentication flow, query,
or preview UI parses against them yet.

## Documented discrepancies

| Area | Swagger | Supplementary examples | Integration decision |
| --- | --- | --- | --- |
| Base path | Production operations use `/api/...`. | Placeholder base URL ends in `/v1`; examples use paths without `/api`. | Keep existing `/api` request paths until the backend confirms otherwise. |
| Authentication | Defines Bearer JWT but no login success body, refresh operation, or logout operation. Several profile/post read endpoints are public. | Shows access and refresh tokens, 15-minute/7-day expiry, rotation, `/auth/refresh`, `/auth/logout`, and says every endpoint except login/register requires auth. | Do not implement token/session handling, refresh, or logout from examples alone. |
| Feed pagination | `GET /api/feed` uses `page` (default 1) and `limit` (default 20, max 50). | `GET /feed` uses `cursor` and `limit=10`, returning `next_cursor` and `has_more`. | Keep preview pagination isolated; do not connect either model to live queries yet. |
| Profile endpoints | Current user is `GET/PATCH /api/me`; public profile is `GET /api/users/{username}`. | Current user is `GET/PATCH /users/me`; public profile example adds `is_following`. | Preserve Swagger request paths; treat the example response fields as provisional. |
| Post creation | `POST /api/posts` is multipart only, with required binary `image` and optional `caption`. IDs are integer path parameters. | `POST /posts` may be multipart or JSON and shows `media_ids`; example IDs are strings such as `pst_002`. | Keep the existing multipart preparation and numeric live request contract. Do not send `media_ids` or string IDs without confirmation. |
| Post operations | Documents get, create, and delete; no update operation. | Adds `PATCH /posts/{id}`. | Do not prepare or expose post editing. |
| Comments | List uses `page` and `limit` (default 10); create request field is `text`. | List uses cursor pagination and `limit=20`; create request/response field is `content`; validation uses 422. | Keep the Swagger request contract; do not connect the provisional response schema until the backend resolves the field mismatch. |
| Response bodies | All Swagger responses omit `content`, schemas, and examples. | Supplies illustrative success/error envelopes and response objects. | Keep live endpoint return types as `unknown`; parse only after backend verification. |

## Required backend confirmation

Before integration, obtain a non-illustrative contract or captured
non-production fixtures confirming the deployed base path, login and refresh
responses, token transport and storage model, pagination style, ID types,
profile paths, post upload encoding, comment field names, error envelopes, and
CORS/cookie behavior. Then promote only the verified schemas and keep tokens
out of Redux, browser storage, logs, and URLs.
