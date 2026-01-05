# Architecture Document - StandApp

**Author:** Winston (Architect) + Fakos
**Date:** 2025-01-05
**Updated:** 2025-01-05 (fix espacement formulaire)
**Status:** En cours - Post-implémentation landing page

---

## Executive Summary

### Vision technique

StandApp est une **Single Page Application (SPA)** React avec Supabase comme Backend-as-a-Service. L'architecture privilégie la simplicité et l'accessibilité pour les apprenants contributeurs, tout en offrant une expérience utilisateur immersive grâce à la landing page Stargate.

### Principes directeurs

| Principe | Application |
|----------|-------------|
| **Simplicité** | Stack minimale, pas de sur-ingénierie |
| **Boring technology** | React, Supabase - technologies éprouvées |
| **Contributeur-first** | Code lisible, structure claire pour les PRs |
| **Performance** | Landing page 60fps, app légère |

---

## Stack Technique

### Choix validés (implémentés)

| Catégorie | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Runtime** | React | 19.2.0 | Dernière version stable, concurrent features |
| **Bundler** | Vite | 7.2.4 | HMR ultra-rapide, DX excellent |
| **Styling** | Tailwind CSS | 4.1.18 | Utility-first, compétence demandée sur le marché |
| **3D** | Three.js | 0.182.0 | Standard industrie pour WebGL |
| **3D (React)** | @react-three/fiber | 9.5.0 | Intégration React native |
| **3D (Helpers)** | @react-three/drei | 10.7.7 | Composants prêts à l'emploi |
| **3D (Effects)** | @react-three/postprocessing | 3.0.4 | Bloom, effets visuels |
| **Animations** | GSAP | 3.14.2 | Timeline animations complexes |
| **Linting** | ESLint | 9.39.1 | Qualité code |

### À intégrer (MVP)

| Catégorie | Technologie | Usage |
|-----------|-------------|-------|
| **Backend** | Supabase | Auth + PostgreSQL + Realtime |
| **Routing** | React Router | Navigation SPA |
| **State** | React Context | État global simple (auth, user) |
| **UI Components** | shadcn/ui | Composants accessibles (optionnel) |

---

## Architecture Applicative

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React SPA)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐   ┌─────────────────┐   ┌───────────────┐ │
│  │  Landing Page   │   │   Dashboard     │   │   Stand-up    │ │
│  │   (Stargate)    │   │    Équipe       │   │   Formulaire  │ │
│  │   ✅ FAIT       │   │   ❌ À FAIRE    │   │   ❌ À FAIRE  │ │
│  └────────┬────────┘   └────────┬────────┘   └───────┬───────┘ │
│           │                     │                     │         │
│           └─────────────────────┴─────────────────────┘         │
│                                 │                               │
│                    ┌────────────┴────────────┐                  │
│                    │      React Router       │                  │
│                    │        (à venir)        │                  │
│                    └────────────┬────────────┘                  │
│                                 │                               │
│                    ┌────────────┴────────────┐                  │
│                    │    Auth Context         │                  │
│                    │   (à implémenter)       │                  │
│                    └────────────┬────────────┘                  │
│                                 │                               │
└─────────────────────────────────┼───────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │        SUPABASE           │
                    │    (Backend-as-a-Service) │
                    ├───────────────────────────┤
                    │  • Auth (email/password)  │
                    │  • PostgreSQL Database    │
                    │  • Row Level Security     │
                    │  • Realtime (optionnel)   │
                    └───────────────────────────┘
```

### Structure des dossiers

```
app/
├── public/                     # Assets statiques
├── src/
│   ├── main.jsx               # Point d'entrée React
│   ├── App.jsx                # Composant racine + Router
│   ├── index.css              # Styles globaux Tailwind
│   │
│   ├── components/
│   │   ├── landing/           # ✅ IMPLÉMENTÉ
│   │   │   ├── StargateLanding.jsx   # Orchestrateur état
│   │   │   ├── VortexCanvas.jsx      # Canvas Three.js
│   │   │   └── LoginOverlay.jsx      # Formulaire auth
│   │   │
│   │   ├── dashboard/         # ❌ À FAIRE
│   │   │   ├── TeamGrid.jsx          # Grille membres
│   │   │   └── MemberCard.jsx        # Carte individuelle
│   │   │
│   │   ├── standup/           # ❌ À FAIRE
│   │   │   └── StandupForm.jsx       # Formulaire check-in
│   │   │
│   │   └── ui/                # ❌ À FAIRE (optionnel)
│   │       └── (shadcn components)
│   │
│   ├── contexts/              # ❌ À FAIRE
│   │   └── AuthContext.jsx           # État auth global
│   │
│   ├── hooks/                 # ❌ À FAIRE
│   │   ├── useAuth.js                # Hook auth
│   │   └── useSupabase.js            # Hook client Supabase
│   │
│   ├── lib/                   # ❌ À FAIRE
│   │   └── supabase.js               # Client Supabase
│   │
│   └── pages/                 # ❌ À FAIRE (avec React Router)
│       ├── LandingPage.jsx           # Route /
│       └── DashboardPage.jsx         # Route /app
│
├── package.json
├── vite.config.js
├── tailwind.config.js         # (implicite avec Tailwind v4)
└── eslint.config.js
```

---

## Décisions d'Architecture

### ADR-001: State Machine pour la Landing Page

**Contexte:** La landing page Stargate a 4 états distincts avec des transitions spécifiques.

**Décision:** Utiliser un pattern State Machine simple avec `useState` et des constantes d'état.

**Implémentation actuelle:**
```javascript
const STATES = {
  IDLE: 'idle',
  HOVER: 'hover',
  WARP: 'warp',
  LOGIN: 'login'
}
```

**Transitions:**
```
IDLE ←→ HOVER (onMouseEnter/Leave)
HOVER → WARP (onClick)
WARP → LOGIN (setTimeout 1.5s)
```

**Statut:** ✅ Implémenté dans `StargateLanding.jsx`

---

### ADR-002: Architecture 3D avec React Three Fiber

**Contexte:** La landing page nécessite un rendu 3D performant.

**Décision:** Utiliser @react-three/fiber plutôt que Three.js vanilla pour une intégration React native.

**Composants 3D:**
| Composant | Rôle |
|-----------|------|
| `VortexPortal` | Géométrie torus + shader gradient |
| `WarpFlash` | Effet flash blanc lors du warp |
| `Particles` | Système de particules spiralantes |

**Effets post-processing:**
- `Bloom` pour l'effet de luminosité

**Statut:** ✅ Implémenté dans `VortexCanvas.jsx`

---

### ADR-003: Authentification avec Supabase

**Contexte:** L'app nécessite une authentification email/password simple.

**Décision:** Utiliser Supabase Auth plutôt qu'une solution custom.

**Avantages:**
- Pas de backend à gérer
- JWT automatique
- Row Level Security intégrée
- SDK React prêt à l'emploi

**Intégration prévue:**
```javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

**Statut:** ❌ À implémenter (actuellement mockée)

---

### ADR-004: Styling avec Tailwind CSS v4

**Contexte:** Besoin d'un système de styling rapide et maintenable.

**Décision:** Tailwind CSS v4 avec le plugin Vite natif.

**Configuration:**
```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Patterns utilisés:**
- Utility classes directement dans JSX
- Styles inline pour les cas dynamiques (Three.js, animations)
- Variables CSS pour le thème

**Statut:** ✅ Implémenté

---

### ADR-005: Pas de State Management Global (pour l'instant)

**Contexte:** L'app est simple, le state management doit l'être aussi.

**Décision:** React Context + useState suffisent pour le MVP.

**Justification:**
- Pas de Redux, Zustand, Jotai
- Un seul contexte pour l'auth
- Props drilling accepté pour les petits arbres

**Structure prévue:**
```javascript
// contexts/AuthContext.jsx
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // ...
}
```

**Évolution possible:** Si la complexité augmente, migrer vers Zustand.

**Statut:** ❌ À implémenter

---

### ADR-006: Flexbox Gap vs Space-Y pour Tailwind v4

**Contexte:** L'espacement vertical dans le formulaire de login (`LoginOverlay.jsx`) ne fonctionnait pas avec `space-y-*` de Tailwind CSS v4.

**Problème:** La classe `space-y-10` n'appliquait pas d'espacement visible entre les éléments du formulaire.

**Décision:** Utiliser `flex flex-col gap-*` au lieu de `space-y-*` pour les layouts verticaux.

**Implémentation:**
```jsx
// ❌ Ne fonctionne pas correctement avec Tailwind v4
<form className="space-y-10">

// ✅ Solution qui fonctionne
<form className="flex flex-col gap-3">
```

**Valeurs finales LoginOverlay.jsx:**
- Conteneur: `max-w-[220px] p-4`
- Form: `flex flex-col gap-3`
- Inputs: `py-2 px-1`
- Bouton: `py-2`

**Statut:** ✅ Implémenté

---

## Modèle de Données

### Schéma Supabase (PostgreSQL)

```sql
-- Table des utilisateurs (gérée par Supabase Auth)
-- auth.users (automatique)

-- Profils utilisateurs
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stand-ups quotidiens
CREATE TABLE standups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  yesterday TEXT,
  today TEXT,
  is_blocked BOOLEAN DEFAULT FALSE,
  blocker_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Un seul standup par user par jour
  UNIQUE(user_id, date)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_standups_date ON standups(date);
CREATE INDEX idx_standups_user_date ON standups(user_id, date);
```

### Row Level Security (RLS)

```sql
-- Profiles : visible par tous les utilisateurs authentifiés
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles visible par tous"
ON profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Profile modifiable par son propriétaire"
ON profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Standups : visible par tous, modifiable par propriétaire
ALTER TABLE standups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Standups visibles par tous"
ON standups FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Standup créable par utilisateur"
ON standups FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Standup modifiable par propriétaire"
ON standups FOR UPDATE
TO authenticated
USING (user_id = auth.uid());
```

---

## Flux de Données

### Authentification

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  LoginOverlay   │────▶│  Supabase Auth  │────▶│  AuthContext    │
│  (formulaire)   │     │  (signup/signin)│     │  (user state)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Dashboard      │
                                               │  (route /app)   │
                                               └─────────────────┘
```

### Stand-up quotidien

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  StandupForm    │────▶│  Supabase DB    │────▶│  TeamGrid       │
│  (user input)   │     │  (upsert)       │     │  (affichage)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Sécurité

### Mesures implémentées

| Risque | Mitigation |
|--------|------------|
| XSS | React échappe automatiquement |
| CSRF | Tokens JWT Supabase |
| SQL Injection | Supabase SDK paramétré |
| Auth bypass | Row Level Security |

### Variables d'environnement

```bash
# .env.local (ne pas committer)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

---

## Performance

### Cibles

| Métrique | Cible | Actuel |
|----------|-------|--------|
| Landing FPS | 60 | ✅ 60 |
| First Contentful Paint | < 2s | À mesurer |
| Time to Interactive | < 3s | À mesurer |
| Bundle size | < 500KB gzipped | À mesurer |

### Optimisations prévues

1. **Code splitting** - React Router lazy loading
2. **Three.js tree-shaking** - Import sélectifs
3. **Image optimization** - Formats WebP si avatars

---

## Phases de développement

### Phase 1 - Landing Page ✅ COMPLÈTE

- [x] Setup projet Vite + React + Tailwind
- [x] Vortex 3D avec états (IDLE, HOVER, WARP, LOGIN)
- [x] Formulaire login/register (UI)
- [x] Responsive basique

### Phase 2 - Auth Supabase (en cours)

- [ ] Créer projet Supabase
- [ ] Configurer tables et RLS
- [ ] Intégrer Supabase Auth dans LoginOverlay
- [ ] Créer AuthContext
- [ ] Protéger routes

### Phase 3 - Dashboard Équipe

- [ ] Implémenter React Router
- [ ] Créer page Dashboard
- [ ] Composant TeamGrid
- [ ] Composant MemberCard
- [ ] Fetch des standups du jour

### Phase 4 - Formulaire Stand-up

- [ ] Composant StandupForm
- [ ] Upsert standup (insert ou update selon existence)
- [ ] Indicateur visuel blocage
- [ ] Toast confirmation

### Phase 5 - Polish & Deploy

- [ ] Tests utilisateurs
- [ ] Corrections UX
- [ ] Configuration production Supabase
- [ ] Déploiement (Vercel recommandé)

---

## Risques techniques

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Performance 3D sur mobile | Moyenne | Moyen | Fallback CSS ou réduction particules |
| Complexité Supabase RLS | Faible | Faible | Schéma simple, tests |
| Bundle size Three.js | Moyenne | Moyen | Tree-shaking, lazy loading |

---

## Glossaire

| Terme | Définition |
|-------|------------|
| **Standup** | Check-in quotidien d'un membre (hier/aujourd'hui/blocage) |
| **Warp** | Animation de transition "traversée de la porte" |
| **RLS** | Row Level Security - contrôle d'accès au niveau ligne dans PostgreSQL |
| **BaaS** | Backend-as-a-Service (Supabase) |

---

## Références

- [PRD StandApp](./prd.md)
- [UX Design Specification](./ux-design-specification.md)
- [Landing Page Stargate UX Spec](./landing-page-stargate-ux-spec.md)
- [Checkpoint Landing Page](../CHECKPOINT-LANDING-PAGE.md)
- [Supabase Documentation](https://supabase.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

*Document généré par Winston (Architect) - BMAD Method v6*
*Basé sur l'implémentation existante et les specs PRD/UX*
