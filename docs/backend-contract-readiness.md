# Sociality backend contract readiness

Source of truth reviewed: `docs/reference/swagger-ui-init.js` (OpenAPI 3.0.3,
Sociality API 1.0.0). The document contains 30 operations and 57 response
status entries. None of those responses defines `content`, a response schema,
or an example body.

## Contract boundary

- `bearerAuth` is declared as HTTP Bearer with `bearerFormat: JWT`.
- Authentication requirements below reflect operation-level `security` exactly.
- Examples are not treated as validation rules.
- Request and parameter schemas in `src/api/contracts.ts` model only explicit
  OpenAPI constraints. They are not response schemas.
- Every live endpoint function must continue returning `unknown` until a
  response schema is supplied and parsed at the feature boundary.
- Preview routes do not import or execute the prepared live API functions.

## Endpoint inventory

`Auth` means the operation explicitly declares `bearerAuth`. An omitted `401`
below means OpenAPI does not document it even if the operation requires auth.

| Area | Operation | Auth | Confirmed input | Documented responses |
| --- | --- | --- | --- | --- |
| Login | `POST /api/auth/login` | Public | JSON: required `email:string`, `password:string` (min 6) | `200` success, `401` invalid credentials |
| Register | `POST /api/auth/register` | Public | JSON: required `name`, `username`, `email`, `password` (min 6); optional `phone`; all strings | `201` registered, `400` validation/duplicate |
| Timeline | `GET /api/feed` | Auth | Query: `page:int=1`, `limit:int=20` (max 50) | `200` OK |
| Search | `GET /api/users/search` | Public | Required `q:string` (min 1); `page:int=1` (min 1), `limit:int=20` (max 50) | `200` list users |
| Public profile | `GET /api/users/{username}` | Public | Path `username:string` | `200` OK, `404` not found |
| Public posts | `GET /api/users/{username}/posts` | Public | Path username; `page:int=1`, `limit:int=20` (max 50) | `200` OK, `404` user not found |
| Public liked posts | `GET /api/users/{username}/likes` | Public | Path username; `page:int=1`, `limit:int=20` (max 50) | `200` OK, `404` user not found |
| My profile | `GET /api/me` | Auth | None | `200` OK |
| Update profile | `PATCH /api/me` | Auth | JSON optional `name`, `username`, `phone`, `bio`, `avatarUrl`; or multipart with the same fields plus `avatar` PNG/JPG/WEBP max 5 MB | `200` updated, `400` validation/duplicate username |
| My posts | `GET /api/me/posts` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK, `401` unauthorized |
| Explore posts | `GET /api/posts` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK |
| Create post | `POST /api/posts` | Auth | Multipart: required `image` JPG/PNG/WEBP max 5 MB; optional `caption:string` | `201` created, `400` bad request, `401` unauthorized |
| Post detail | `GET /api/posts/{id}` | Public | Path `id:integer` | `200` OK, `404` not found |
| Delete post | `DELETE /api/posts/{id}` | Auth | Path `id:integer` | `200` deleted, `401`, `403`, `404` |
| List comments | `GET /api/posts/{id}/comments` | Public | Path ID; `page:int=1`, `limit:int=10` (max 50) | `200` OK |
| Create comment | `POST /api/posts/{id}/comments` | Auth | Path ID; JSON: required `text:string` | `201` created, `401`, `404` post not found |
| Delete comment | `DELETE /api/comments/{id}` | Auth | Path `id:integer` | `200` deleted, `403`, `404` |
| Like | `POST /api/posts/{id}/like` | Auth | Path `id:integer`; idempotent | `200` liked, `404` post not found |
| Unlike | `DELETE /api/posts/{id}/like` | Auth | Path `id:integer`; idempotent | `200` unliked, `404` post not found |
| Post likes | `GET /api/posts/{id}/likes` | Ambiguous | Path ID; `page:int=1`, `limit:int=20` (max 50) | `200` OK, `404` post not found |
| My likes | `GET /api/me/likes` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK |
| Save | `POST /api/posts/{id}/save` | Auth | Path `id:integer` | `200` saved, `404` post not found |
| Unsave | `DELETE /api/posts/{id}/save` | Auth | Path `id:integer` | `200` unsaved, `404` post not found |
| My saved posts | `GET /api/me/saved` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK |
| Follow | `POST /api/follow/{username}` | Auth | Path `username:string`; idempotent | `200` following, `400` self/invalid, `404` user not found |
| Unfollow | `DELETE /api/follow/{username}` | Auth | Path username; idempotent | `200` unfollowed, `404` user not found |
| Public followers | `GET /api/users/{username}/followers` | Public | Path username; `page:int=1`, `limit:int=20` (max 50) | `200` OK, `404` user not found |
| Public following | `GET /api/users/{username}/following` | Public | Path username; `page:int=1`, `limit:int=20` (max 50) | `200` OK, `404` user not found |
| My followers | `GET /api/me/followers` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK |
| My following | `GET /api/me/following` | Auth | `page:int=1`, `limit:int=20` (max 50) | `200` OK |

The post-likes description says the endpoint is public and optionally enriches
results when a token is supplied, while its `security` array currently makes
Bearer authentication mandatory. This must be corrected or clarified before
integration.

## Safe connectivity result

A single unauthenticated, read-only request was sent on 2026-10-18:

`GET /api/users/search?q=__sociality_contract_probe__&page=1&limit=1`

The production origin returned `200 OK`, JSON content type, and
`Access-Control-Allow-Origin: *`. The response body was deliberately discarded
and no inferred fields were recorded. This proves public reachability only. It
does not prove any response contract, authenticated CORS behavior, or cookie
support. A wildcard allow-origin cannot be used with browser credentialed
cookies, and the response did not advertise `Access-Control-Allow-Credentials`.

## Missing contracts and coach questions

### Authentication and session

1. What is the exact `200` login JSON schema, including the access-token field
   name, nesting, user/session object, nullability, and an example?
2. Is the token an access JWT only, or are access and refresh tokens returned?
   Is the `Bearer` prefix included in the value or added by the client?
3. What are the JWT issuer, audience, signing algorithm, claims, expiry, and
   accepted clock skew? Which claim is the stable user identifier?
4. Is a refresh endpoint available? Provide its method, path, request/response
   schemas, rotation policy, reuse detection, and failure statuses.
5. Is there a logout/revocation endpoint? Does logout invalidate access tokens,
   refresh tokens, or both?
6. Does registration return a session/token or only the created user? Should a
   successful registration require a separate login?
7. Is the intended browser model direct Bearer requests or a same-origin Next.js
   session proxy with an HttpOnly cookie? If cookies are supported, provide the
   required `Domain`, `Path`, `Secure`, `HttpOnly`, `SameSite`, lifetime, CSRF
   protection, and credentialed-CORS configuration.
8. Which endpoint is authoritative for session validation on reload: `/api/me`,
   token verification, or another session endpoint?

### Responses, errors, and pagination

9. Provide response schemas and examples for every success status, especially
   login, feed, search, profile, post detail, comments, and all paginated lists.
10. What is the standard error envelope? Specify message, code, field-level
    validation errors, correlation ID, and whether non-JSON errors can occur.
11. Do paginated responses use `data`, `items`, or another collection field?
    Provide total count, total pages, current page, next-page, and empty-page
    behavior. Are negative or zero page/limit values rejected or normalized?
12. Specify canonical ID types, timestamp formats/timezones, optional/null
    fields, media URL guarantees, author nesting, counts, and viewer flags.
13. Which operations return bodies after mutations and deletes? Are idempotent
    repeated operations distinguishable in the response?
14. Document `401` for every protected operation and distinguish expired,
    malformed, revoked, and missing credentials. Confirm when `403` is used.

### Endpoint ambiguities and browser constraints

15. Is `GET /api/posts/{id}/likes` public with optional auth as its description
    states, or auth-required as its OpenAPI `security` states?
16. Is authenticated `GET /api/posts` intentional for Explore, or should it be
    publicly readable?
17. Which fields appear only with optional authentication
    (`isFollowedByMe`, `isMe`, `followsMe`, liked/saved flags), and where?
18. Provide the production and local-development CORS allowlists, allowed
    methods/headers, preflight behavior, and whether credentials are supported.
19. What rate limits and upload validation rules apply, and how are violations
    represented? Are image dimensions or server-side content checks enforced?
20. Confirm username case sensitivity, URL encoding expectations, search
    normalization, and whether deleted/private users or posts are represented.

## Safe next milestone

After the login/session and primary response schemas are supplied, add Zod
response schemas from those exact examples, validate captured non-production
fixtures, and implement a same-origin session boundary. Only then should live
TanStack Query hooks replace isolated preview data. Tokens must remain out of
Redux, browser storage, logs, URLs, and client-readable cookies.
