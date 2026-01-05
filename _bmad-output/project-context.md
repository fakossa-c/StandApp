---
project_name: 'StandApp'
user_name: 'Fakos'
date: '2026-01-05'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'anti_patterns']
rule_count: 135
optimized_for_llm: true
status: 'complete'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

**⚠️ CRITICAL: This is a pedagogical project prioritizing simplicity and transparency over "best practices". Read the entire architecture document before implementing.**

---

## Technology Stack & Versions

### Core Technologies
- **Vite** (latest) - Build tool et dev server
- **React** (latest) - UI library
- **TypeScript** (latest) - Strict mode enabled
- **npm** - Package manager (NOT yarn, NOT pnpm)

### Backend & Database
- **Supabase** (latest) - Backend-as-a-Service
  - PostgreSQL - Base de données relationnelle
  - Supabase Auth - Authentification native
  - PostgREST - API REST automatique
  - Row Level Security (RLS) - Politiques de sécurité obligatoires

### UI Framework
- **Tailwind CSS v4** - Utility-first CSS (**v4 required**, NOT v3)
- **shadcn/ui** (latest) - Component library
- **Radix UI** - Accessible UI primitives (dependency of shadcn/ui)

### Routing & State
- **React Router 7** - Client-side routing (**library mode ONLY**, NOT framework mode)
- **React Context** - State management (auth ONLY)
- **Local State** (useState + useEffect) - All data management

### Validation & Types
- **Zod** (latest) - Runtime validation et schemas

### Deployment
- **Vercel** (latest) - Hosting et CI/CD automatique

### Critical Version Constraints
- ⚠️ **Tailwind CSS v4 REQUIRED** - Use `@next` tag: `tailwindcss@next` and `@tailwindcss/vite@next`
- ⚠️ **React Router 7 in library mode** - NOT framework mode, no file-based routing
- 🚫 **NO React Query / TanStack Query** - Pedagogical constraint: use local state
- 🚫 **NO Redux / Zustand** - Local state only for simplicity
- 🚫 **NO state management libraries** - useState + useEffect in custom hooks

---

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

**TypeScript Configuration:**
- ✅ Strict mode ALWAYS enabled (`strict: true`)
- 🚫 NEVER use `any` type - use `unknown` or proper types
- ✅ Explicit return types on all functions
- ✅ Interface over type alias for object shapes (but NO "I" prefix)

**Naming Conventions:**
- **Database (PostgreSQL):** `snake_case` - `user_id`, `created_at`, `is_blocked`
- **TypeScript Variables:** `camelCase` - `userId`, `createdAt`, `isBlocked`
- **TypeScript Interfaces:** `PascalCase` WITHOUT "I" prefix - `User` NOT `IUser`
- **Components:** `PascalCase` - `LoginForm`, `StandupCard`
- **Files:** Match export - `LoginForm.tsx`, `useAuth.ts`, `standups.ts`

**Import/Export Patterns:**
- ✅ Named exports preferred over default exports (except for pages/routes)
- ✅ Absolute imports from `src/` using path aliases configured in vite.config.ts
- ✅ Group imports: React → External libs → Internal modules → Types → Styles

**Error Handling:**
- ✅ ALWAYS use centralized `handleSupabaseError()` from `lib/errorHandler.ts`
- ✅ Wrap Supabase calls in try-catch with proper error handling
- 🚫 NEVER expose raw Supabase error messages to users
- ✅ Return typed error objects: `{ success: false, error: string }`

### Framework-Specific Rules (React)

**Hooks Usage:**
- ✅ Custom hooks MUST start with `use` prefix - `useAuth`, `useStandups`, `useProfile`
- ✅ Custom hooks encapsulate data fetching: `useState` + `useEffect` pattern
- 🚫 NO React Query - use `useState` + `useEffect` in custom hooks
- ✅ Extract reusable logic into custom hooks, NOT utility functions for stateful logic

**Component Structure:**
- ✅ Domain-based organization: `components/auth/`, `components/standup/`, `components/team/`
- ✅ UI primitives in `components/ui/` - shadcn/ui components ONLY
- 🚫 NO mixing domain components with UI primitives
- ✅ One component per file with same name as file

**State Management:**
- ✅ **React Context ONLY for auth state** - `AuthContext` provides user session
- ✅ **Local state for ALL data fetching** - NO global state for standups/profiles
- 🚫 NO Redux, Zustand, or other state libraries
- ✅ Lift state ONLY when necessary, prefer component-local state

**Data Flow (Unidirectional - CRITICAL):**
```
Components → Custom Hooks → API Helpers → Supabase Client
```
- 🚫 **NEVER call Supabase directly from components** - use API helpers
- 🚫 **NEVER bypass API layer** - always go through `lib/api/` helpers
- ✅ Components call custom hooks (e.g., `useStandups`)
- ✅ Custom hooks call API helpers (e.g., `lib/api/standups.ts`)
- ✅ API helpers call Supabase client (e.g., `lib/supabase.ts`)

**Performance Rules:**
- ✅ Use `React.memo()` sparingly - ONLY for expensive re-renders
- 🚫 NO premature optimization - simple useState is sufficient for this app
- ✅ Avoid inline function definitions in JSX when passed as props to memoized components

### Supabase Integration Rules

**Authentication:**
- ✅ Use Supabase Auth native methods: `signUp`, `signInWithPassword`, `signOut`
- ✅ Session stored in localStorage by Supabase automatically
- ✅ Session duration: 24h aligned with daily cycle (0h00 to 0h00)
- ✅ Password reset via Supabase native flow (email link)

**Database Access:**
- ✅ ALL queries MUST respect Row Level Security (RLS) policies
- 🚫 NEVER use service role key in frontend - anon key ONLY
- ✅ Use generated types from Supabase: `npx supabase gen types typescript`
- ✅ Store types in `src/types/database.types.ts`

**Data Fetching Pattern:**
```typescript
// CORRECT: In custom hook
const { data, error } = await supabase
  .from('standups')
  .select('*')
  .eq('user_id', userId)

if (error) return handleSupabaseError(error)
return data
```

**Migrations:**
- ✅ Use Supabase CLI for all schema changes: `supabase migration new migration_name`
- ✅ Include RLS policies in migrations
- ✅ Test migrations locally before pushing to production

### Validation Rules

**Client-Side Validation (Zod):**
- ✅ Define schemas in `src/types/schemas.ts`
- ✅ Validate form inputs BEFORE submission
- ✅ Use Zod with React Hook Form or manual validation
- ✅ Example: `standupSchema.parse(formData)`

**Server-Side Validation (PostgreSQL):**
- ✅ NOT NULL constraints on required fields
- ✅ CHECK constraints for business logic (e.g., text length)
- ✅ UNIQUE constraints (e.g., one standup per user per day)
- ✅ Foreign key constraints with ON DELETE CASCADE

**Dual Validation Strategy:**
- ✅ Client-side (Zod) for UX - immediate feedback
- ✅ Server-side (PostgreSQL) for security - data integrity
- 🚫 NEVER rely on client-side validation alone

### Code Quality & Style Rules

**File Organization:**
- ✅ Domain-based folders: `auth/`, `standup/`, `team/`
- ✅ Feature co-location: Keep related files together
- ✅ Shared utilities in `lib/` and `utils/`
- ✅ Types in `types/` directory

**Component Organization:**
```
src/
├── components/
│   ├── ui/           # shadcn/ui primitives (Button, Input, Dialog)
│   ├── auth/         # LoginForm, SignupForm
│   ├── standup/      # StandupForm, StandupCard, StandupFormModal
│   └── team/         # TeamGrid, MemberCard
├── hooks/            # useAuth, useStandups, useProfile
├── lib/
│   ├── api/          # standups.ts, profiles.ts
│   ├── supabase.ts
│   └── errorHandler.ts
├── types/            # database.types.ts, schemas.ts
├── pages/            # LoginPage, DashboardPage
├── contexts/         # AuthContext
└── utils/            # date.ts
```

**Naming Patterns:**
- ✅ Components: `PascalCase` - `LoginForm.tsx`
- ✅ Hooks: `camelCase` with `use` prefix - `useAuth.ts`
- ✅ Utils: `camelCase` - `date.ts`, `errorHandler.ts`
- ✅ Types: `PascalCase` - `User`, `Standup`, not `IUser`

**Import Order:**
```typescript
// 1. React
import { useState, useEffect } from 'react'

// 2. External libraries
import { z } from 'zod'

// 3. Internal modules
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

// 4. Types
import type { User, Standup } from '@/types/database.types'

// 5. Styles (if any)
import './styles.css'
```

**Documentation:**
- ✅ JSDoc comments for all exported functions and complex logic
- ✅ Inline comments for non-obvious business logic
- 🚫 NO comments for self-evident code
- ✅ README updates when adding major features

### Testing Rules (Post-MVP)

**Note:** NO tests in MVP per project requirements. Post-MVP testing strategy:

- **Unit Tests:** Vitest + React Testing Library for components
- **E2E Tests:** Playwright for critical user flows
- **Test Organization:** Mirror src/ structure in tests/
- **Coverage Target:** 80%+ for business logic, 60%+ overall

### Development Workflow Rules

**Manual Setup (CRITICAL - Pedagogical Approach):**
- ✅ Initialize Vite MANUALLY: `npm create vite@latest standapp -- --template react-ts`
- 🚫 NO CLI scaffolding beyond Vite template - manual configuration for learning
- ✅ Install dependencies one by one with explanation
- ✅ Configure Tailwind CSS v4 manually
- ✅ Add shadcn/ui components individually with `npx shadcn@latest add`

**Git Workflow:**
- ✅ Branch from `master` (or `main`)
- ✅ Commit messages in French (project language)
- ✅ Commit after completing logical units of work
- ✅ Include Claude Code footer if using AI for commits

**Deployment:**
- ✅ Vercel auto-deploys on push to main branch
- ✅ Preview deployments for all branches
- 🚫 NO manual deployment steps needed
- ✅ Environment variables set in Vercel dashboard

---

## Critical Don't-Miss Rules

### Anti-Patterns to AVOID

**🚫 NEVER:**
- Use React Query / TanStack Query (pedagogical constraint - use local state)
- Use Redux / Zustand / other state libraries (local state only)
- Call Supabase directly from components (use API helpers)
- Bypass the API layer (Components → Hooks → API → Supabase)
- Use `any` type in TypeScript (use `unknown` or proper types)
- Use "I" prefix on interfaces (use `User` not `IUser`)
- Mix snake_case and camelCase within same layer (DB: snake_case, TS: camelCase)
- Expose raw Supabase errors to users (use handleSupabaseError)
- Create global state for data (Context for auth ONLY, local state for data)
- Skip server-side validation (always dual validate: Zod + PostgreSQL)
- Use service role key in frontend (anon key only)
- Use Tailwind CSS v3 syntax (v4 required)
- Use React Router in framework mode (library mode only)

**✅ ALWAYS:**
- Use centralized error handling: `handleSupabaseError()`
- Follow unidirectional data flow: Components → Hooks → API → Supabase
- Apply dual validation: Zod (client) + PostgreSQL constraints (server)
- Use domain-based folder organization (auth/, standup/, team/)
- Define RLS policies for all tables
- Use proper TypeScript types (no `any`)
- Keep it simple - pedagogical project, not production enterprise app

### Edge Cases & Gotchas

**Session Management:**
- Session expires at 0h00 (midnight) - aligned with daily standup cycle
- Users must re-login after midnight even if app is open
- Check session validity before all authenticated operations

**Date Handling:**
- Store dates in UTC in database
- Convert to local timezone for display
- One standup per user per day: UNIQUE constraint on (user_id, date)
- Date comparison uses PostgreSQL DATE type, not TIMESTAMP

**Supabase Specifics:**
- RLS policies MUST be defined in migrations
- Policies affect SELECT, INSERT, UPDATE, DELETE independently
- Test RLS policies with different user contexts
- Generated types may need manual updates if schema changes outside migrations

**Tailwind CSS v4:**
- Import syntax changed: `@import "tailwindcss";` (not v3 syntax)
- Configuration is different from v3 - check official v4 docs
- Use `@tailwindcss/vite` plugin, not PostCSS

**React Router 7 Library Mode:**
- Define routes in code, NOT file-based routing
- Use `<Routes>` and `<Route>` components explicitly
- No automatic route generation from file structure

### Security Considerations

**Row Level Security (RLS):**
- ✅ ALL tables MUST have RLS policies enabled
- ✅ Test policies with different user contexts (owner, other user, anonymous)
- ✅ Restrict DELETE operations to owners only
- ✅ Profiles table: users can only UPDATE their own profile

**Authentication:**
- ✅ Use Supabase Auth built-in security (password hashing, session management)
- ✅ Store session tokens securely (Supabase handles this automatically)
- ✅ Validate user session on all authenticated routes with `<ProtectedRoute>`
- 🚫 NEVER store passwords or sensitive data in localStorage manually

**Input Validation:**
- ✅ Sanitize user inputs with Zod schemas
- ✅ PostgreSQL constraints as last line of defense
- ✅ Escape user-generated content when rendering (React does this by default)

### Performance Considerations

**Optimization Strategy:**
- ✅ Keep it simple for MVP - no premature optimization
- ✅ Supabase handles caching and connection pooling
- ✅ Vercel Edge Network handles static asset caching
- 🚫 NO need for complex caching strategies in MVP

**Lazy Loading:**
- ✅ Code split by route if needed (use React.lazy + Suspense)
- 🚫 NO need for component-level lazy loading in MVP (only ~35 files)

---

## Architecture Reference

**Full architecture document:** `_bmad-output/planning-artifacts/architecture.md`

**Key architectural decisions:**
1. **Pedagogical focus** - Simplicity over "best practices"
2. **Manual setup** - No CLI scaffolding for learning visibility
3. **Local state** - No Redux/Zustand/React Query
4. **Unidirectional data flow** - Components → Hooks → API → Supabase
5. **Dual validation** - Zod (client) + PostgreSQL (server)
6. **Domain organization** - Folder structure by feature (auth/, standup/, team/)

**Before implementing any feature, read the architecture document for context and rationale.**

---

## Usage Guidelines

**For AI Agents:**

- ✅ **Read this file BEFORE implementing any code** - This is mandatory for all agents
- ✅ **Follow ALL rules exactly as documented** - No exceptions or creative interpretations
- ✅ **When in doubt, prefer the more restrictive option** - Better to be cautious than break patterns
- ✅ **Refer back to this file during implementation** - Don't rely on memory alone
- ✅ **Update this file if new critical patterns emerge** - Keep it current with the project's evolution

**For Humans:**

- 📝 **Keep this file lean and focused** - Only include rules that AI agents actually need to be reminded of
- 🔄 **Update when technology stack changes** - Versions, frameworks, or tooling updates
- 📅 **Review quarterly for outdated rules** - Remove rules that are no longer relevant or have become obvious
- 🚫 **Don't add obvious rules** - Agents already know general programming principles, focus on project-specific requirements
- ✅ **Update when architectural decisions change** - Keep in sync with architecture.md

---

**Document Status:** COMPLETE ✅
**Last Updated:** 2026-01-05
**Next Review:** After implementing first epic or when major architectural decisions change
**Total Rules:** 135+ critical implementation rules
**Optimized For:** LLM context efficiency and agent consistency
