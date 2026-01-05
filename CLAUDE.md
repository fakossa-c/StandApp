# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**StandupOS** - Async standup web app for teams. Daily check-ins (today/blockers/notes), visible to team, resets daily. No chat, no project management.

**Current Status**: Planning/Solutioning phase. No application code yet - implementation follows architecture in `_bmad-output/planning-artifacts/`.

## Critical Rules - READ FIRST

⚠️ **PEDAGOGICAL PROJECT** - Simplicity over "best practices"

**YOU MUST:**
- Read `_bmad-output/project-context.md` (135+ critical rules) before implementing ANY code
- Read `_bmad-output/planning-artifacts/architecture.md` for architectural decisions
- Follow unidirectional data flow: Components → Hooks → API Helpers → Supabase
- Use snake_case (DB), camelCase (TS vars), PascalCase (components/interfaces)
- Apply dual validation: Zod (client) + PostgreSQL constraints (server)
- Define RLS policies for all Supabase tables

**YOU MUST NEVER:**
- Use React Query/TanStack Query (use useState + useEffect)
- Use Redux/Zustand (local state only, Context for auth ONLY)
- Call Supabase directly from components (use API helpers in lib/api/)
- Use "I" prefix on interfaces (User NOT IUser)
- Mix snake_case and camelCase in same layer

## Technology Stack

- Vite + React + TypeScript (strict mode)
- Supabase (Auth + PostgreSQL + RLS)
- Tailwind CSS v4 (NOT v3) + shadcn/ui
- React Router 7 (library mode, NOT framework)
- Zod validation
- npm (NOT yarn/pnpm)

## Project Structure

```
_bmad/                    # BMad Method framework (DO NOT MODIFY)
_bmad-output/            # Generated docs (PRD, architecture, stories)
├── planning-artifacts/  # Architecture, PRD, UX design
└── project-context.md   # 135+ implementation rules (READ FIRST)
brief                    # Project brief in French
```

**When implemented:**
```
src/
├── components/
│   ├── ui/              # shadcn/ui only
│   ├── auth/            # LoginForm, SignupForm, ProtectedRoute
│   ├── standup/         # StandupForm, StandupCard, StandupFormModal
│   └── team/            # TeamGrid, MemberCard
├── hooks/               # useAuth, useStandups, useProfile
├── lib/api/             # standups.ts, profiles.ts (API layer)
├── types/               # database.types.ts, schemas.ts
└── contexts/            # AuthContext (auth ONLY)
```

## Database Schema (2 tables)

```sql
-- profiles: User data
profiles (id, email, full_name, avatar_url, created_at, updated_at)

-- standups: Daily entries (one per user per day)
standups (id, user_id, date, yesterday, today, is_blocked, blocker_description, created_at, updated_at)
UNIQUE(user_id, date)
```

## Key Commands (When Implemented)

### Initial Setup
```bash
npm create vite@latest standapp -- --template react-ts
cd standapp && npm install
npm install @supabase/supabase-js react-router zod
npm install -D tailwindcss@next @tailwindcss/vite@next
npx tailwindcss init
npx shadcn@latest init
```

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Supabase
```bash
supabase migration new <name>  # Create migration
supabase db push               # Apply migrations
npx supabase gen types typescript --local > src/types/database.types.ts
```

## BMad Method Workflows

**Communication**: French (per config)
**Output**: `_bmad-output/`

### Activating Agents
`/bmad:bmm:agents:<agent>` or read from `_bmad/bmm/agents/<agent>.md`

Agents: Analyst (Mary), PM (John), Architect (Winston), UX (Sally), SM (Bob), DEV (Amelia), TEA (Murat)

### Common Workflows
```
*workflow-status          # Show current phase/progress
*prd                      # Create PRD
*create-architecture      # Create architecture doc
*create-story             # Create user story
*dev-story                # Implement story
*code-review              # Review implementation
```

### Development Phases
1. Analysis (optional): Product brief, research
2. Planning (required): PRD, UX design
3. Solutioning: Architecture, epics/stories
4. Implementation: Sprint planning → stories → code → review

## Code Style

- TypeScript strict mode, NO `any` types
- Named exports (except pages/routes)
- Domain-based folders: auth/, standup/, team/
- One component per file, file name matches export
- Centralized error handling: `handleSupabaseError()` from lib/errorHandler.ts
- Import order: React → External libs → Internal → Types → Styles

## Implementation Order

1. Auth (FR1-FR4): LoginForm → SignupForm → AuthContext → ProtectedRoute
2. Standup (FR5-FR11): StandupForm → StandupFormModal → API helpers → hooks
3. Team View (FR12-FR17): TeamGrid → MemberCard → Date filtering

## Important Quirks

- Session expires at midnight (0h00) - aligned with daily standup cycle
- One standup per user per day: UNIQUE constraint enforced
- Tailwind v4 syntax different from v3 - use `@next` tag
- React Router 7 library mode - NO file-based routing
- Manual setup preferred (pedagogical) - NO CLI scaffolding beyond Vite

## Key Files

- `_bmad-output/project-context.md` - **READ BEFORE IMPLEMENTING** (135+ rules)
- `_bmad-output/planning-artifacts/architecture.md` - Complete architecture
- `_bmad-output/planning-artifacts/prd.md` - Requirements (FR1-FR17, NFR1-NFR13)
- `_bmad/bmm/config.yaml` - User config (name: Fakos, lang: french)
