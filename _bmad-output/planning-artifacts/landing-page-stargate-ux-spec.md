# UX Specification - Landing Page Stargate

**Author:** Sally (UX Designer) + Fakos
**Date:** 2025-01-03
**Status:** Draft - En attente validation

---

## 1. Executive Summary

### Concept

Une landing page **ultra-minimaliste** inspirée de la Porte des Étoiles (Stargate). L'utilisateur est accueilli par un vortex 3D hypnotique qui l'invite à "traverser" pour accéder à l'application.

### Principes directeurs

| Principe | Application |
|----------|-------------|
| **Zéro distraction** | Pas de header, pas de footer, pas de navigation |
| **Une seule action** | Cliquer pour entrer |
| **Effet "wow"** | Animation 3D immersive et mémorable |
| **Complicité** | Message décontracté entre collaborateurs |

### Contexte utilisateur

Les utilisateurs se connaissent déjà (collaborateurs du projet AIBricks). Ils n'ont pas besoin d'être convaincus — ils viennent pour accéder à StandApp.

---

## 2. Visual Design Foundation

### Palette couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-void` | `#000000` | Fond principal (noir absolu) |
| `--bg-deep` | `#0D0D0D` | Fond formulaire |
| `--vortex-orange` | `#f97316` | Gradient start |
| `--vortex-purple` | `#a855f7` | Gradient middle |
| `--vortex-blue` | `#3b82f6` | Gradient end |
| `--text-primary` | `#ffffff` | Texte principal |
| `--text-muted` | `#9ca3af` | Texte secondaire |
| `--glass-bg` | `rgba(13, 13, 13, 0.8)` | Fond glassmorphism |
| `--glass-border` | `rgba(255, 255, 255, 0.1)` | Bordure glass |

### Typographie

| Élément | Font | Size | Weight |
|---------|------|------|--------|
| CTA principal | Inter / Geist | 24px | 600 |
| Labels formulaire | Inter / Geist | 14px | 500 |
| Input text | Inter / Geist | 16px | 400 |
| Liens | Inter / Geist | 14px | 400 |

---

## 3. Animation States - Storyboard

### État 1: IDLE (Attraction)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        ░░░░░░░░░                            │
│                    ░░░░        ░░░░                         │
│                  ░░░    ✨✨✨    ░░░                        │
│                 ░░   ✨ VORTEX ✨   ░░                       │
│                 ░░   ✨  3D    ✨   ░░                       │
│                  ░░░    ✨✨✨    ░░░                        │
│                    ░░░░        ░░░░                         │
│                        ░░░░░░░░░                            │
│                                                             │
│                       "Ready ?"                             │
│                           ↓                                 │
│                        [ ● ]  <- zone cliquable             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comportement :**
- Vortex en rotation lente et continue (8-10 secondes par tour)
- Particules qui spiralent doucement vers le centre
- Gradient animé (orange → purple → blue) en rotation
- Légère pulsation lumineuse au centre (breathing effect)
- Texte CTA statique, légèrement lumineux

**Paramètres animation :**
| Property | Value |
|----------|-------|
| Rotation speed | 0.1 rad/s |
| Particle count | 200-300 |
| Particle spiral speed | 2s per cycle |
| Center glow pulse | 3s ease-in-out |
| Gradient rotation | sync with vortex |

---

### État 2: HOVER (Activation)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      ░░░░░░░░░░░░░                          │
│                  ░░░░            ░░░░                       │
│                ░░░  ⚡✨✨✨✨✨⚡  ░░░                      │
│               ░░  ⚡ VORTEX     ⚡  ░░                      │
│               ░░  ⚡  ACCÉLÉRÉ  ⚡  ░░                      │
│                ░░░  ⚡✨✨✨✨✨⚡  ░░░                      │
│                  ░░░░            ░░░░                       │
│                      ░░░░░░░░░░░░░                          │
│                                                             │
│                    "Let's go" ←─ texte change               │
│                           ↓                                 │
│                      [ ●●● ]  <- zone agrandie              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comportement :**
- Rotation accélère progressivement (×3)
- Particules accélèrent, effet d'aspiration vers le centre
- Intensité lumineuse augmente (+30%)
- Effet de "pull" magnétique vers le curseur
- Zone cliquable s'agrandit légèrement (scale 1.1)
- Texte CTA change : "Ready ?" → "Let's go"
- Son subtil optionnel (whoosh doux)

**Paramètres animation :**
| Property | Value |
|----------|-------|
| Rotation speed | 0.3 rad/s |
| Transition duration | 0.5s ease-out |
| Particle speed | ×2 |
| Glow intensity | +30% |
| CTA scale | 1.1 |
| Magnetic pull strength | 20px radius |

---

### État 3: WARP (Traversée)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░   ███████████████████████   ░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░   ██  FLASH BLANC  ████   ░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░   ███████████████████████   ░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│                                                             │
│                      EFFET TUNNEL                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comportement :**
- Clic déclenche la séquence warp
- Rotation devient très rapide (effet tunnel)
- Particules fusent vers l'avant (effet vitesse lumière)
- Flash blanc au centre qui s'étend
- Écran "aspiré" vers le centre
- Durée courte mais impactante

**Timeline animation (1.5s total) :**
| Time | Event |
|------|-------|
| 0.0s | Clic détecté, rotation ×10 |
| 0.2s | Particules accélèrent vers avant |
| 0.5s | Flash blanc commence au centre |
| 0.8s | Flash s'étend sur 50% écran |
| 1.0s | Flash couvre 100% écran |
| 1.2s | Flash fade out progressif |
| 1.5s | Révèle formulaire login |

---

### État 4: LOGIN (Authentification)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      ░░░░░░░░░░░░░                          │
│                  ░░░░            ░░░░   <- vortex ralenti   │
│                ░░░                  ░░░     en arrière-plan │
│               ░░  ┌──────────────┐  ░░                      │
│               ░░  │              │  ░░                      │
│               ░░  │    EMAIL     │  ░░                      │
│               ░░  │  ┌────────┐  │  ░░                      │
│               ░░  │  └────────┘  │  ░░                      │
│               ░░  │              │  ░░                      │
│               ░░  │  MOT DE PASSE│  ░░                      │
│                ░░░│  ┌────────┐  │░░░                       │
│                  ░│  └────────┘  │░                         │
│                   │              │                          │
│                   │  [ ENTRER ]  │ <- gradient button       │
│                   │              │                          │
│                   │ Créer compte │                          │
│                   └──────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comportement :**
- Vortex continue en arrière-plan (rotation très lente, opacité réduite 30%)
- Formulaire apparaît au centre avec fade-in (0.5s)
- Style glassmorphism : fond semi-transparent + backdrop-blur
- Focus automatique sur le champ email
- Bouton submit avec gradient animé (même couleurs que vortex)

**Specs formulaire :**

| Élément | Style |
|---------|-------|
| Container | `max-width: 400px`, `padding: 32px` |
| Background | `rgba(13, 13, 13, 0.85)` |
| Backdrop | `blur(20px)` |
| Border | `1px solid rgba(255,255,255,0.1)` |
| Border-radius | `16px` |
| Inputs | Fond transparent, bordure bottom only |
| Button | Gradient animé, `padding: 16px 32px` |

---

## 4. Responsive Behavior

### Desktop (> 1024px)

- Vortex occupe ~60% de la hauteur viewport
- Formulaire max-width 400px
- Expérience complète avec tous les effets

### Tablet (768px - 1024px)

- Vortex occupe ~50% de la hauteur
- Formulaire max-width 360px
- Effets maintenus

### Mobile (< 768px)

- Vortex occupe ~40% de la hauteur (au-dessus)
- Formulaire en dessous, full-width avec padding
- Particules réduites (100-150) pour performance
- Effets simplifiés si nécessaire

```
Mobile Layout:
┌─────────────────┐
│                 │
│    VORTEX 3D    │
│    (compact)    │
│                 │
├─────────────────┤
│                 │
│   FORMULAIRE    │
│   (full width)  │
│                 │
└─────────────────┘
```

---

## 5. Formulaire Login - Détails

### Champs

| Champ | Type | Placeholder | Validation |
|-------|------|-------------|------------|
| Email | email | "ton@email.com" | Format email valide |
| Mot de passe | password | "••••••••" | Min 6 caractères |

### États des inputs

| État | Style |
|------|-------|
| Default | Bordure `rgba(255,255,255,0.2)` |
| Focus | Bordure gradient, glow subtil |
| Error | Bordure `#ef4444`, message en dessous |
| Filled | Bordure `rgba(255,255,255,0.3)` |

### Bouton Submit

- Texte : "Entrer" ou "C'est parti"
- Background : gradient animé (orange → purple → blue)
- Hover : intensité +20%, léger scale (1.02)
- Loading : spinner + "Connexion..."
- Disabled : opacity 0.5

### Actions secondaires

- "Pas encore de compte ? **Créer un compte**" → toggle vers formulaire inscription
- "Mot de passe oublié ?" → lien discret

### Formulaire Inscription (toggle)

| Champ | Type | Placeholder |
|-------|------|-------------|
| Nom | text | "Ton prénom" |
| Email | email | "ton@email.com" |
| Mot de passe | password | "••••••••" |
| Confirmer | password | "••••••••" |

---

## 6. Messages & Microcopy

### CTA Principal

| État | Message |
|------|---------|
| Idle | "Ready ?" |
| Hover | "Let's go" |
| Alt options | "Enter", "Go", "→" |

### Formulaire

| Contexte | Message |
|----------|---------|
| Titre login | (aucun - minimaliste) |
| Bouton login | "Entrer" |
| Bouton register | "Rejoindre l'équipe" |
| Toggle vers register | "Première fois ? Créer un compte" |
| Toggle vers login | "Déjà membre ? Se connecter" |
| Erreur login | "Email ou mot de passe incorrect" |
| Erreur réseau | "Connexion impossible, réessaie" |
| Succès register | Redirect direct (pas de message) |

---

## 7. Technical Specs for Dev

### Stack recommandée

```
React 18+
├── @react-three/fiber (Three.js React renderer)
├── @react-three/drei (helpers, effects)
├── @react-three/postprocessing (bloom, etc.)
├── GSAP (timeline animations)
├── Tailwind CSS (styling)
└── Supabase Auth (authentication)
```

### Structure composants

```
src/components/landing/
├── StargateLanding.tsx      # Container principal
├── VortexScene.tsx          # Canvas Three.js
├── VortexPortal.tsx         # Géométrie du vortex
├── Particles.tsx            # Système de particules
├── LoginOverlay.tsx         # Formulaire glassmorphism
├── AuthForm.tsx             # Logic login/register
└── shaders/
    ├── vortexVertex.glsl
    └── vortexFragment.glsl
```

### Performance targets

| Metric | Target |
|--------|--------|
| FPS | 60fps stable |
| First paint | < 1.5s |
| Time to interactive | < 2.5s |
| Bundle size (landing) | < 300KB gzipped |

### Accessibilité

- Formulaire entièrement navigable au clavier
- Labels ARIA sur les inputs
- `prefers-reduced-motion` : désactiver animations complexes
- Contraste texte/fond > 4.5:1

---

## 8. Checklist Validation

### Avant développement

- [ ] Palette couleurs validée
- [ ] Messages CTA validés
- [ ] Flow 4 états validé
- [ ] Specs formulaire validées

### Pendant développement

- [ ] État 1 (Idle) implémenté
- [ ] État 2 (Hover) implémenté
- [ ] État 3 (Warp) implémenté
- [ ] État 4 (Login) implémenté
- [ ] Formulaire fonctionnel
- [ ] Responsive testé
- [ ] Performance validée (60fps)

### Avant livraison

- [ ] Test sur Chrome, Firefox, Safari
- [ ] Test mobile réel
- [ ] Accessibilité clavier vérifiée
- [ ] Intégration Supabase Auth

---

## 9. Références visuelles

### Inspirations Stargate

- Effet event horizon du film Stargate (1994)
- Vortex bleu/blanc caractéristique
- Sensation d'aspiration vers l'infini

### Inspirations web modernes

- Stripe.com (gradients fluides)
- Linear.app (animations soignées)
- Vercel.com (minimalisme efficace)

---

*Document généré par Sally (UX Designer) - BMAD Party Mode*
*Prêt pour validation avant passage à Amelia (Dev)*
