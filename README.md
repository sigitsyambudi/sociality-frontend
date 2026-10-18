# Sociality Frontend

Sociality is a responsive social-media frontend built as a bootcamp capstone and
portfolio project. It pairs production-oriented application architecture with an
isolated preview experience, so reviewers can explore the interface while the
backend team completes the undocumented authentication and response contracts.

## Portfolio preview

The current UI includes:

- a responsive Timeline with local pagination, post actions, and detail links;
- accessible Login and Register forms wired to the documented request contracts;
- keyboard-navigable profile Search with local preview filtering;
- My Profile and Friends Profile views with galleries and protected-action guidance;
- an Add Post composer with client-side image validation and safe object-URL cleanup;
- Post Detail, preview comments, local comment pagination, and not-found states; and
- shared desktop/mobile navigation, loading, empty, error, and image-fallback states.

Routes worth reviewing are `/`, `/search`, `/profile`, `/users/johndoe`,
`/posts/new`, `/posts/preview-kids`, `/login`, and `/register`.

## Technology

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- shadcn/ui with Base UI
- Redux Toolkit and React Redux for deliberate client state
- TanStack Query for future validated server state
- React Hook Form and Zod for forms and runtime validation
- Day.js for relative preview timestamps

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_API_BASE_URL` to the public API origin.
4. Start the app with `npm run dev`.

Quality checks:

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

## Automated testing

- `npm test` runs the Vitest unit/component suite once in jsdom.
- `npm run test:watch` runs Vitest interactively while developing.
- `npm run test:e2e` reuses or starts the local Next.js development server on
  port 3000 and runs the Playwright smoke suite in installed Google Chrome
  (Chromium-based).

The unit suite covers authentication validation, documented request contracts,
API error normalization, preview search, profile tab keyboard behavior, post
image validation, and required comment text. The E2E suite covers the primary
preview and navigation journeys. All Playwright tests intercept `/api/`
requests; they never create accounts, submit credentials, or mutate production
data.

Current coverage is intentionally risk-based rather than percentage-driven.
Async Server Components, visual regression, assistive-technology output, every
responsive breakpoint, and live backend integration are not unit-tested. Add
those only when their contracts and CI environments are stable.

The production build should be run deliberately rather than in a watch loop. On
some Windows machines, Turbopack can panic while starting a child process; this
is an environment limitation rather than an application type or lint failure.

`NEXT_PUBLIC_` values are included in the browser bundle. Never put access
tokens, private API keys, or other secrets in these variables.

## Architecture

- `src/app`: App Router layouts, routes, and global styles. The root layout
  remains a Server Component and delegates client context to `AppProviders`.
- `src/components`: shared UI; generated shadcn components live in `ui`.
- `src/providers`: application-level client providers.
- `src/store`: Redux store creation and exported store types.
- `src/hooks`: typed shared React hooks.
- `src/api`: schema-neutral HTTP transport and API-module entry point.
- `src/types`: cross-feature transport and domain types.
- `src/features`: feature-owned state, components, API functions, and schemas.

The Redux auth slice tracks only session status. Access tokens are deliberately
not stored or persisted in Redux. Once the authentication contract is known,
create an authenticated API client with an injected `getAccessToken` callback
and an `onUnauthorized` callback that clears the application session.

TanStack Query owns server state. Redux is reserved for client state that must
be shared outside the query cache. Default queries remain fresh for one minute,
do not refetch on window focus, and retry transient failures once. Mutations and
common client/authentication errors are not retried automatically.

Preview fixtures are feature-owned under `src/features/*/preview-data.ts`. They
are never treated as authenticated account data and do not call production
mutation endpoints. Live responses must remain behind endpoint-specific Zod
parsing before they can enter UI state.

## Preview limitations

- Login success has no documented response body, token field, expiry, refresh,
  logout, or cookie contract, so successful credentials do not create a session.
- Timeline, profile, post, and comment success response schemas are undocumented;
  those screens therefore render isolated sample data.
- Like, save, follow, edit-profile, create-post, share, and comment controls never
  pretend to succeed. They explain the login or contract requirement instead.
- Tokens are not stored in `localStorage`, `sessionStorage`, Redux, URLs, or logs.

## Screenshots for portfolio reviewers

Capture the Timeline, Search, Profile, Add Post, and Post Detail routes at both
1440 px desktop and 393 px mobile after a production build. Store optimized WebP
files in `docs/screenshots/`, use descriptive names such as
`timeline-desktop.webp`, and add meaningful Markdown alt text when embedding
them here. Keep authentication fields empty, avoid personal data, and target
roughly 300 KB or less per screenshot so the repository remains quick to clone.

Screenshots are intentionally not checked in until the final visual review, to
avoid documenting intermediate UI states.

## API schema status

The API transport supports JSON, `FormData`, Bearer authentication, normalized
`ApiError` failures, and a 401 callback. It returns `unknown` by default because
the backend response schemas have not been verified. Feature modules must add
Zod schemas and parse responses at their boundaries before relying on response
fields. No endpoint-specific assumptions belong in the shared client.

The complete evidence-only endpoint inventory, connectivity result, unresolved
contract questions, and integration gate are maintained in
[`docs/backend-contract-readiness.md`](docs/backend-contract-readiness.md).
Shared request/parameter schemas mirror documented OpenAPI constraints only;
query-key factories cover all read endpoints, and response parsing utilities
are ready for future verified schemas without connecting live data to preview UI.

### Authentication contract

The authentication forms use the documented `POST /api/auth/register` and
`POST /api/auth/login` endpoints. Registration sends `name`, `username`,
`email`, optional `phone`, and `password`; the frontend-only confirmation value
is never sent. Login sends only `email` and `password`.

The supplied OpenAPI document defines status codes for successful login but no
success response schema or token property. The UI therefore verifies
credentials but deliberately does not extract, persist, or place an
undocumented token in Redux. A secure session and authenticated redirect remain
blocked until the backend publishes the login response contract. Once verified,
prefer a same-origin server exchange that stores the token in an `HttpOnly`,
`Secure`, `SameSite` cookie and clears it after an unauthorized response. Do not
use `localStorage` for authentication tokens.

## Timeline preview

The root route renders the Sociality timeline shell in portfolio preview mode.
Its posts and Figma-provided media live only in `src/features/timeline` and
`public/images/timeline`; preview pagination is local and never calls the
production API. Like, share, and save controls do not mutate sample state.
Comment controls open local post detail, while create-post opens a local
composer that clearly gates submission behind Login.

The verified `GET /api/feed` request supports `page` (default `1`) and `limit`
(default `20`, maximum `50`) and requires Bearer authentication. The OpenAPI
document provides no feed or post response schemas, so live timeline fetching,
response Zod validation, and API pagination are intentionally not connected.
The feature API module returns `unknown` until the backend publishes that
contract.

## Search and profile preview

`/search`, `/profile`, and `/users/[username]` reproduce the supplied desktop
and mobile Search, My Profile, and Friends Profile references with isolated,
typed sample data. Search filtering and profile routing are entirely local and
never query the production API. Preview users are the only generated dynamic
profile routes; unknown usernames render a dedicated not-found state.

The OpenAPI document verifies public `GET /api/users/search`,
`GET /api/users/{username}`, and `GET /api/users/{username}/posts` endpoints,
plus authenticated `/api/me`, `/api/me/posts`, and
`POST`/`DELETE /api/follow/{username}` endpoints. None defines a successful
response body schema. Live profile parsing, authenticated account data, edit,
follow/unfollow, saved, and liked behavior therefore remain disconnected.
Protected preview controls explain the limitation and link to Login; they never
send a mutation or change sample state.

## Post and comment preview

`/posts/new` provides local image selection, preview, removal, drag-and-drop,
and caption entry. The selected file is never uploaded in preview mode, and its
temporary object URL is revoked when replaced, removed, or unmounted.
`/posts/[id]` displays typed preview post and comment data with local load-more
pagination. Unknown IDs render a dedicated not-found state. Protected like,
share, save, post, and comment mutations remain unavailable and point to Login.

The OpenAPI document verifies these contracts:

- `POST /api/posts` requires Bearer authentication and multipart `image`;
  `caption` is optional. Images may be JPG, PNG, or WEBP up to 5 MB.
- `GET /api/posts/{id}` is public and accepts an integer post ID.
- `GET /api/posts/{id}/comments` is public, with `page` defaulting to `1` and
  `limit` defaulting to `10` with a maximum of `50`.
- `POST /api/posts/{id}/comments` requires Bearer authentication and JSON
  `{ "text": string }`. No text length constraint is documented.

All four successful response bodies remain undocumented. The prepared feature
API functions therefore return `unknown`; they are not called by preview mode,
and response validation cannot be added safely until schemas are published.

## Known security advisory

The full `npm audit` currently reports nine high-severity package entries, all
propagated from the same `braces` stack-exhaustion advisory. The development-only
paths include `eslint-config-next -> @next/eslint-plugin-next -> fast-glob ->
micromatch -> braces` and shadcn CLI tooling. There is no patched `braces`
release or compatible stable Next.js dependency update at this time. Production
dependencies audit clean with `npm audit --omit=dev`. Do not downgrade Next.js
or `eslint-config-next`, add a `braces` override, or run a forced audit fix;
monitor upstream stable releases.
