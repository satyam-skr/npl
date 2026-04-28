# NPL Auction - Detailed Project File (f.md)

This file is a complete, practical reference for the NPL Auction project. It expands what is in README.md with deeper implementation details, architecture, API behavior, and operational notes.

## 1) Project Overview

NPL Auction is a real-time cricket auction platform for IIIT Nagpur Premier League.

Core capabilities:
- Authentication with role-aware access
- Player and team management
- Live auction room with continuous updates via SSE (Server-Sent Events)
- Bid placement and moderation workflows
- Media uploads for player photos, team logos, and avatars

Primary stack:
- Next.js 15 (App Router)
- React 19 + TypeScript 5
- Prisma 7 + PostgreSQL
- better-auth (email/password, magic link, OTP, admin plugin)
- UploadThing (media pipeline)
- Tailwind CSS 4 + Radix UI primitives
- Zustand for client-side auction state

## 2) Repository Layout

Top-level:
- prisma/: schema and seed script
- src/: full app source

Important app routes (App Router groups):
- src/app/(marketing): public marketing pages
- src/app/(auth): login/register/magic-link/verify flows
- src/app/(dashboard): protected application area
  - admin/: privileged controls
  - auction/: auction experience
  - players/, teams/, profile/, dashboard/

API routes:
- src/app/api/auth/[...all]/route.ts
- src/app/api/auction/route.ts
- src/app/api/auction/[id]/route.ts
- src/app/api/auction/events/route.ts
- src/app/api/bids/route.ts
- src/app/api/players/route.ts
- src/app/api/players/[id]/route.ts
- src/app/api/teams/route.ts
- src/app/api/uploadthing/route.ts

Domain/component layers:
- src/components/auction: auction UI blocks (room, ticker, bid controls, history, etc.)
- src/components/auth: auth forms
- src/components/dashboard: dashboard widgets
- src/components/players, src/components/teams
- src/components/layout: navbar/sidebar/mobile nav/footer
- src/components/ui: reusable UI primitives

System libraries:
- src/lib/auth.ts: better-auth server config
- src/lib/auth-client.ts: client auth base URL handling
- src/lib/prisma.ts: Prisma client setup
- src/lib/auction-store.ts: Zustand auction state
- src/lib/validations.ts: Zod schemas for API payloads
- src/lib/mock-data.ts: fallback data for development preview

## 3) Runtime and Architecture

### Frontend
- Next.js App Router powers route groups and layouts.
- Dashboard and admin access are guarded at layout level:
  - src/app/(dashboard)/layout.tsx
  - src/app/(dashboard)/admin/layout.tsx
- Tailwind CSS + component-driven UI architecture.

### Backend
- Route handlers under src/app/api provide server logic.
- Prisma handles all persistence (users, teams, players, auction sessions/items, bids, uploads).
- Auth/session resolution uses better-auth + Prisma adapter.
- Live updates are streamed from /api/auction/events using SSE with periodic state pushes.

### Real-time behavior
- SSE endpoint sends a state event every 3 seconds.
- If DB is not properly configured in development fallback conditions, mock auction state is served.
- Client state management is centralized in Zustand store for current item, bids, team budgets, and connection status.

## 4) Authentication and Authorization

Auth modes enabled:
- Email/password
- Magic link
- Email OTP
- Admin plugin + role field
- Username plugin

Roles in the schema:
- ADMIN
- AUCTIONEER
- MANAGER
- VIEWER

Guardrails implemented:
- Dashboard requires session (except development fallback behavior).
- Admin area allows ADMIN/AUCTIONEER (outside development fallback).
- Bid placement requires MANAGER with a managed team.
- UploadThing endpoints enforce role-based middleware checks.

Email behavior:
- Uses Resend when RESEND_API_KEY and EMAIL_FROM are configured.
- In local preview/missing email config, emails are skipped and logged.

## 5) Data Model (Prisma)

Main models:
- User, Session, Account, Verification (auth foundation)
- Team (budget, manager, roster)
- Player (skill type/levels, status, pricing)
- AuctionSession (overall auction lifecycle)
- AuctionItem (player in a session queue + current bid state)
- Bid (amount, status transitions)
- MediaUpload (uploaded asset tracking)

Important enums:
- UserRole: ADMIN, AUCTIONEER, MANAGER, VIEWER
- SkillType: BATTING, BOWLING, ALL_ROUNDER
- SkillLevel: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
- PlayerStatus: AVAILABLE, ON_AUCTION, SOLD, UNSOLD
- AuctionStatus: UPCOMING, ACTIVE, PAUSED, COMPLETED
- BidStatus: PENDING, ACCEPTED, REJECTED, OUTBID

Bid lifecycle summary:
- New bid created as PENDING
- Previous pending bids for same item become OUTBID
- Auctioneer/admin can ACCEPT_BID or REJECT_BID
- ACCEPT_BID finalizes player to team, updates budgetUsed, closes auction item

## 6) API Surface Summary

### Auction APIs
- GET /api/auction
  - List auction sessions with items
- POST /api/auction
  - Create auction session
- GET /api/auction/[id]
  - Get auction item with player + bids
- PATCH /api/auction/[id]
  - Actions: REJECT_BID, PASS_PLAYER, ACCEPT_BID
- DELETE /api/auction/[id]
  - Delete auction item
- GET /api/auction/events
  - SSE stream for live state updates

### Bids API
- POST /api/bids
  - Validates payload via bidSchema
  - Enforces session, role/team, amount > current, and budget constraints
  - Writes bid + updates auction item current bid/team in transaction

### Players API
- GET /api/players
- POST /api/players
- GET /api/players/[id]
- PATCH /api/players/[id]
- DELETE /api/players/[id]

### Teams API
- GET /api/teams

### Upload API
- /api/uploadthing via createRouteHandler
- File routes in src/app/api/uploadthing/core.ts:
  - playerPhoto (ADMIN/AUCTIONEER)
  - teamLogo (ADMIN)
  - profileAvatar (authenticated user)
  - playerImportCSV (ADMIN)

## 7) Validation Rules

Defined in src/lib/validations.ts:
- playerSchema
  - name min length 2
  - skillType in {BATTING, BOWLING, ALL_ROUNDER}
  - basePrice positive integer
  - optional batting/bowling levels in defined enums
  - optional year from 1 to 5
- bidSchema
  - auctionItemId required string
  - amount positive integer

## 8) Environment Variables

Required for full production behavior:
- DATABASE_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_APP_NAME
- UPLOADTHING_TOKEN
- RESEND_API_KEY
- EMAIL_FROM

Reference files:
- .env.example
- DEPLOYMENT.md

Notes:
- Local preview behavior may allow development fallbacks for auth-guarded surfaces and mock state.
- Ensure BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL match deployment URL in production.

## 9) Local Development Setup

1. Install dependencies
```bash
npm install
```

2. Configure environment
- Copy .env.example to .env
- Fill required values (at least DATABASE_URL and auth values)

3. Generate Prisma client
```bash
npx prisma generate
```

4. Push schema and seed database
```bash
npx prisma db push
npx prisma db seed
```

5. Run development server
```bash
npm run dev
```

Open http://localhost:3000

## 10) Scripts

From package.json:
- npm run dev: start Next.js dev server
- npm run build: production build
- npm run start: run production server
- npm run lint: run ESLint
- npm run typecheck: TypeScript check (no emit)
- npm run db:generate: Prisma generate
- npm run db:push: Prisma schema push
- npm run db:seed: seed database

## 11) Seed Data Behavior

prisma/seed.ts initializes:
- Teams (4 teams with colors and budgets)
- Players (mixed batting/bowling/all-rounder profiles)
- One auction session (NPL Auction 2025)
- Auction items created in descending base-price order

Reset behavior in seed:
- Deletes bid, auctionItem, auctionSession, player, team data before reseeding.

## 12) Deployment Notes

Pre-deployment checks:
```bash
npm run lint
npx tsc --noEmit
npm run build
```

Production migration flow (recommended):
```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

Seed only when intended:
```bash
npx prisma db seed
```

Vercel-specific notes:
- Keep URL env vars aligned to deployed domain.
- UploadThing and email services require valid production tokens/keys.
- next.config.ts already permits remote image hosts used by UploadThing.

## 13) Development Fallbacks and Known Behaviors

- Some routes/components allow development fallback behavior when NODE_ENV is development.
- Auction SSE endpoint may serve mock data when DB points to default/local placeholder connection patterns.
- Email sending is skipped if Resend is not configured.

These fallbacks are useful for UI preview and local iteration, but should not be relied on for production behavior.

## 14) Troubleshooting

Common issues:
- Prisma client errors
  - Run npx prisma generate
  - Verify DATABASE_URL
- Empty/incorrect auction state
  - Confirm seeded auction session/items
  - Check SSE endpoint response from /api/auction/events
- Upload failures
  - Verify UPLOADTHING_TOKEN
  - Check role permissions for file route used
- Auth/email failures
  - Verify BETTER_AUTH_SECRET, BETTER_AUTH_URL, NEXT_PUBLIC_APP_URL
  - Ensure RESEND_API_KEY + EMAIL_FROM are valid

## 15) Suggested Engineering Conventions

- Keep route-handler authorization checks explicit and role-based.
- Validate all write payloads with Zod (follow existing pattern in src/lib/validations.ts).
- Use Prisma transactions for multi-entity auction mutations.
- Keep development fallback branches isolated and clearly identifiable.
- Keep generated Prisma client artifacts under src/generated/prisma (do not hand-edit generated files).

## 16) Quick Start Cheat Sheet

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```
