# Sociality Frontend

Sociality is a portfolio-focused social media frontend built with Next.js 16 and React 19. It translates the supplied Figma designs into a responsive, accessible application while keeping preview data, authentication boundaries, and future backend integration clearly separated.

[View the live portfolio demo](https://sociality-frontend-chi.vercel.app/)

> **Portfolio preview:** The deployed experience uses isolated sample content for the timeline, search, profiles, posts, and comments. Protected actions remain disabled and never pretend to persist data. Live authentication and protected API integration are pending verified backend success-response and session contracts.

## Project goals

- Deliver a polished black-and-purple social experience across desktop and mobile.
- Demonstrate maintainable App Router architecture, typed validation, accessible interaction, and automated testing.
- Prepare for a real backend without inventing response fields or weakening token handling.
- Keep illustrative portfolio content visibly distinct from authenticated account data.

## Features and routes

| Experience | Route | Current behavior |
| --- | --- | --- |
| Timeline | `/` | Responsive preview feed, relative timestamps, media cards, load-more behavior, and links to post details |
| Search | `/search` | Accessible controlled search, keyboard navigation, and local filtering of preview users |
| My Profile | `/profile` | Preview profile header, statistics, accessible tabs, and linked three-column gallery |
| Friend Profile | `/users/[username]` | Preview user profiles, graceful unknown-user handling, and login-gated follow actions |
| Post Detail | `/posts/[id]` | Preview post and comments, local comment pagination, validation states, and unknown-post recovery |
| Create Post | `/posts/new` | Image type/size validation, drag and drop, preview, replacement, removal, and disabled protected submission |
| Login | `/login` | Validated form using the documented request payload; no session is created from an undocumented success response |
| Register | `/register` | Validated name, username, email, phone, password, and frontend-only password confirmation |
| Not Found | Any unknown route | Branded recovery page with links to Timeline and Search |

The application also includes loading, empty, and retryable error treatments where they are relevant to the current preview experience.

Portfolio presentation includes professional route metadata, an Open Graph/Twitter card, a favicon, suitable robots and sitemap routes, and a branded global 404.

## Responsive experience

Sociality uses the supplied desktop and mobile designs as its visual reference. Layouts adapt across mobile, tablet, and desktop widths while preserving readable content measures, media aspect ratios, visible focus states, and clearance above the fixed floating navigation.

The mobile end-to-end project runs at **393 × 852**, matching the primary phone QA target. Desktop captures for portfolio review should use **1440 × 1024** so the feed, side spacing, and navigation can be compared consistently.

## Screenshots

Actual portfolio screenshots are not currently committed. The entries below are capture requirements—not substitute or generated screenshots—and avoid presenting unverified visuals as project output.

| View | Route | Desktop capture needed | Mobile capture needed |
| --- | --- | --- | --- |
| Timeline | `/` | `1440 × 1024` | `393 × 852` |
| Search | `/search` | `1440 × 1024` | `393 × 852` |
| Profile | `/profile` | `1440 × 1024` | `393 × 852` |
| Post Detail | `/posts/preview-kids` | `1440 × 1024` | `393 × 852` |
| Create Post | `/posts/new` | `1440 × 1024` | `393 × 852` |
| Login | `/login` | `1440 × 1024` | `393 × 852` |
| Register | `/register` | `1440 × 1024` | `393 × 852` |

When captured, export optimized WebP images to `docs/screenshots/` using descriptive names such as `timeline-desktop.webp` and `timeline-mobile.webp`. Capture the deployed build without browser chrome, preserve the exact dimensions above, and avoid including personal credentials or developer tooling.

## Technology

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui with Base UI primitives
- Redux Toolkit and React Redux
- TanStack Query
- React Hook Form and Zod
- Day.js
- Vitest, React Testing Library, and jsdom
- Playwright with local Chrome
- ESLint

## Architecture

```text
src/
├── api/          Schema-neutral HTTP client, verified request contracts, and query keys
├── app/          App Router routes, metadata, route states, and Server Component layouts
├── components/   Shared UI, navigation, branding, and form primitives
├── features/     Feature modules and their isolated preview fixtures
├── hooks/        Reusable application hooks
├── lib/          Shared utilities, query client, and site metadata
├── providers/    Client-side Redux and TanStack Query composition
├── store/        Deterministic Redux store, typed hooks, and minimal auth state
└── types/        Shared TypeScript models
```

Key boundaries:

- The root layout remains a Server Component; a dedicated client provider composes Redux and TanStack Query.
- TanStack Query is reserved for verified server state. Redux contains only minimal client auth state and does not persist credentials.
- The shared API client supports JSON, `FormData`, bearer headers, normalized errors, and a centralized unauthorized callback without assuming endpoint response bodies.
- Preview fixtures are isolated from live API modules, so they can be removed when verified contracts become available.
- Provisional response schemas stay disconnected from the UI until backend behavior is confirmed.

## Preview mode and backend status

Preview mode is intentionally constrained:

- Timeline, search, profiles, posts, and comments use typed local fixtures.
- Like, save, follow, create-post, and comment submission controls do not send authenticated mutations or display false success feedback.
- Login is always available as the path toward future authenticated functionality.
- No authentication token is stored in `localStorage`, `sessionStorage`, Redux persistence, logs, or URLs.
- The API base URL is public configuration, not a secret.

The OpenAPI reference documents login and registration request bodies, validation rules, bearer authentication requirements, and error payloads. It does **not** document a successful login response body, token property names, expiry, refresh behavior, logout behavior, or cookie semantics. A secure persistent session therefore cannot be implemented without guessing.

Integration readiness and documented uncertainties are tracked in:

- [Backend contract readiness](docs/backend-contract-readiness.md)
- [Provisional API response contracts](docs/provisional-api-response-contracts.md)

The provisional schemas are based only on supplementary examples and are not wired to live screens. The ignored local API reference material remains outside the public repository documentation.

## Getting started

### Prerequisites

- Node.js `24.x`
- npm `11.13.0` (the version declared by the project)

The repository includes `.nvmrc` with Node `24`, and `package.json` declares both the supported Node engine and npm package manager version.

### Install and run

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Use `npm ci` for reproducible installs from `package-lock.json`. Use `npm install` only when intentionally changing dependencies.

### Environment configuration

Copy `.env.example` to `.env.local` when exercising an API-backed form:

```bash
NEXT_PUBLIC_API_BASE_URL=https://be-social-media-api-production.up.railway.app
```

- No environment variable is required to browse preview routes, run unit tests, or create a production build.
- `NEXT_PUBLIC_API_BASE_URL` is optional for the preview and required only for API-backed authentication requests.
- Every `NEXT_PUBLIC_*` value is embedded in the browser bundle. Never place secrets, private keys, or authentication tokens in it.

## Development and testing commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Vitest unit/component suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run all Playwright projects |
| `npm run build` | Create the production build |
| `npm run start` | Serve an existing production build |

### Browser test setup

Playwright uses the locally installed Google Chrome channel. Install Chrome through Playwright when the machine does not already provide it:

```bash
npx playwright install chrome
```

The current Playwright suite contains **12 verified tests**:

| Project | Tests | Coverage focus |
| --- | ---: | --- |
| Desktop Chrome | 6 | Timeline, search-to-profile, auth navigation, post detail, and protected preview behavior |
| Mobile Chrome (`393 × 852`) | 6 | Core routes, overflow, floating-navigation clearance, recovery pages, create-post file flow, and mutation blocking |
| **Total** | **12** | **6 desktop + 6 mobile** |

The E2E environment blocks the configured production API origin, so browser tests cannot accidentally create accounts or mutate backend data. Unit/component tests cover validation schemas, API request shaping and error normalization, filtering, profile tabs, file validation, comments, navigation, metadata, and security-header configuration.

GitHub Actions runs `npm ci`, TypeScript, ESLint, unit tests, and one production build on pushes and pull requests. Playwright remains a separate local validation step because the workflow does not install a browser.

## Deployment

- Live demo: [https://sociality-frontend-chi.vercel.app/](https://sociality-frontend-chi.vercel.app/)
- The project is configured for Vercel's Next.js runtime and pins Node `24.x` for reproducible installs.
- The preview deployment does not require backend credentials or secret environment variables.
- If API-backed authentication forms are intentionally enabled, configure only the public `NEXT_PUBLIC_API_BASE_URL` value in Vercel.
- Vercel should use `npm ci` and the standard `npm run build` command; no deployment hook or custom output directory is required.

`next/font` uses Google-hosted font sources during compilation. A locked-down local or CI environment may need outbound access to the font host for `npm run build`; that build-time requirement does not create a runtime dependency on Google Fonts.

## Security posture

The application currently sends these global response headers:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()`

Next.js's `X-Powered-By` header is disabled. The headers apply to application routes, metadata routes, framework assets, and public files.

A `Content-Security-Policy` header is deliberately deferred. Next.js 16's strict CSP path requires a per-request nonce carried through rendering, which forces dynamic rendering and is incompatible with static optimization, Partial Prerendering, and CDN-cached pages. A hash-based experimental path exists for static pages, but this project has not validated it across development, production, and all client chunks. Shipping a broad policy with `unsafe-inline`, `unsafe-eval`, or wildcard origins would advertise protection without providing a meaningful boundary.

Before enabling CSP:

1. Choose and validate a nonce-based or supported hash-based rendering strategy.
2. Confirm all framework scripts, Tailwind styles, local fonts, optimized preview images, `data:` image fallbacks, `blob:` create-post previews, and the configured API origin.
3. Run a production build and route-level browser smoke tests under the policy.
4. Start with `Content-Security-Policy-Report-Only`, review violations, then enforce the tested policy.

The project also avoids browser token persistence, token logging, secrets in public configuration, and protected preview mutations.

## Known limitations

- Successful login and authenticated session behavior are blocked by missing backend response and lifecycle contracts.
- Live feed, profile, post, comment, like, save, and follow responses are not connected to the UI until their schemas are verified.
- Preview data does not persist and must not be interpreted as genuine user-generated content.
- E2E coverage currently targets Chrome-based desktop and mobile projects; cross-browser and assistive-technology testing remain manual.
- Portfolio screenshots still need to be captured from the deployed application.
- CSP remains deliberately deferred pending an end-to-end compatible Next.js strategy.
- Offline production builds can be blocked by Google font retrieval.

## Dependency security note

The full `npm audit` currently reports nine high-severity package entries, all propagated from the same `braces` stack-exhaustion advisory. The development-only paths include `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces` and shadcn CLI tooling. Production dependencies audit clean with `npm audit --omit=dev`.

There is no patched `braces` release or compatible stable Next.js dependency update at this time. The available automated fix would force an incompatible downgrade, so the project intentionally keeps the Next.js-aligned version and avoids a forced audit fix or unverified `braces` override.

## Recommended next steps

1. Obtain example success responses for login, feed, profile, post, and comment endpoints from the backend owner.
2. Confirm access-token format, expiry, refresh/logout behavior, and CORS or cookie requirements.
3. Implement a server-controlled HttpOnly session boundary before enabling protected actions.
4. Connect live queries only after their Zod schemas validate real backend responses.
5. Capture and optimize the seven portfolio screenshot sets listed above.
6. Evaluate CSP in report-only mode and add cross-browser E2E coverage.
