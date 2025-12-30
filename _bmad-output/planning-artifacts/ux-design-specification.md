---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - brief
  - product-brief-StandApp-2025-12-29.md
  - prd.md
date: 2025-12-30
author: Fakos
project_name: StandApp
status: complete
---

# UX Design Specification StandApp

**Author:** Fakos
**Date:** 2025-12-30

---

## Executive Summary

### Project Vision

StandApp transpose le stand-up journalier en rituel asynchrone ultra-simple. Chaque membre fait un check-in quotidien (hier/aujourd'hui/blocages), visible par l'équipe. Aucune discussion, aucun chat, aucune gestion de projet.

L'application sert de véhicule pédagogique pour enseigner le workflow GitHub professionnel (branches, PRs, code review) via la méthodologie BMAD. Le succès se mesure en PRs mergées.

### Target Users

**Alex - L'apprenant en vibe coding**
- A développé une première web app, connaît Git basique (clone, commit, push)
- Formation 100% à distance, travail asynchrone
- Veut contribuer à un vrai projet collaboratif et voir sa PR mergée
- Frustration : les concepts Git restent abstraits sans projet concret

**Fakos - Le formateur/mentor**
- Expert technique, supervise à distance
- Valide les PRs, surveille la progression
- Besoin : vue d'ensemble rapide des stand-ups, détection des blocages

### Key Design Challenges

1. **Friction minimale** : Le check-in quotidien doit prendre moins de 2 minutes, sinon l'habitude ne se créera pas
2. **Lisibilité immédiate** : Fakos doit scanner l'état de l'équipe en 3 secondes maximum
3. **Onboarding invisible** : Les apprenants doivent être opérationnels dès la première connexion
4. **Minimalisme intentionnel** : Résister à la tentation d'ajouter des features - la simplicité est le produit

### Design Opportunities

1. **Vue d'équipe "scannable"** : Design optimisé pour la lecture rapide avec indicateurs visuels forts (blocages en rouge)
2. **États vides engageants** : Transformer l'absence de stand-up en invitation claire à l'action
3. **Architecture extensible** : UI modulaire permettant aux apprenants d'ajouter leurs features via PR sans casser l'existant

---

## Core User Experience

### Defining Experience

L'expérience core de StandApp se résume à une action unique répétée quotidiennement : **le check-in**.

Chaque membre de l'équipe remplit un formulaire minimaliste en 3 champs :
- Ce que j'ai fait hier
- Ce que je fais aujourd'hui
- Suis-je bloqué ? (oui/non + description si oui)

Cette action doit être si simple qu'elle devient un réflexe quotidien, comme consulter ses emails le matin. Si le check-in prend plus de 2 minutes, l'habitude ne se créera jamais.

### Platform Strategy

| Aspect | Décision | Justification |
|--------|----------|---------------|
| Type | Web app SPA (React) | Stack accessible pour apprenants |
| Backend | Supabase (BaaS) | Auth + DB intégrés, pas de backend custom |
| Priorité | Desktop first | Usage principal en contexte formation |
| Mobile | Responsive fonctionnel | Check-ins rapides possibles |
| Offline | Non requis | Connexion stable attendue |
| Input | Clavier principal | Formulaires classiques desktop |

### Effortless Interactions

| Interaction | Objectif | Métrique |
|-------------|----------|----------|
| Premier check-in | Immédiat après inscription | < 30 secondes |
| Check-in quotidien | Aucune friction, zéro réflexion | < 2 minutes |
| Scan équipe | Voir qui est bloqué d'un coup d'œil | < 3 secondes |
| Détection inactivité | Absence visible immédiatement | Visuel instantané |

### Critical Success Moments

1. **"C'est simple!"** - Alex complète son premier check-in sans aide ni tutoriel
2. **"Je vois tout"** - Fakos scanne l'état de toute l'équipe en un regard
3. **"On m'a vu"** - Alex bloqué reçoit de l'aide car son blocage était visible
4. **"Ma feature est live"** - Alex contributeur voit sa PR mergée en production

### Experience Principles

1. **Moins c'est plus** : Chaque élément d'UI doit justifier sa présence. En cas de doute, on enlève.

2. **Visibilité > Interaction** : Voir l'état de l'équipe est plus important que modifier quoi que ce soit.

3. **Zéro apprentissage** : Un nouvel utilisateur doit être productif en moins d'une minute.

4. **Blocages en vedette** : Les problèmes doivent sauter aux yeux, pas être cachés dans un menu.

---

## Desired Emotional Response

### Primary Emotional Goals

| Persona | Émotion principale | Déclencheur |
|---------|-------------------|-------------|
| Alex (Apprenant) | **Légèreté** | Check-in fait en 30 secondes, passage à autre chose |
| Fakos (Formateur) | **Contrôle serein** | Vue claire de l'état de toute l'équipe |

**L'émotion qui fait recommander le produit :**
- Alex : "C'est tellement simple que j'ai presque l'impression de tricher"
- Fakos : "Enfin un outil qui ne me fait pas perdre de temps"

### Emotional Journey Mapping

| Étape | Alex | Fakos |
|-------|------|-------|
| Découverte | Curiosité sans anxiété | Soulagement (pas un outil complexe) |
| Premier usage | Confiance immédiate | Clarté instantanée |
| Action core | Rapidité satisfaisante | Vue d'ensemble rassurante |
| Après la tâche | Accomplissement léger | Situation sous contrôle |
| En cas d'erreur | Compréhension | Récupération rapide |
| Retour quotidien | Habitude confortable | Efficacité routinière |

### Micro-Emotions

**À cultiver :**
- **Confiance** : Je sais exactement quoi faire
- **Accomplissement** : C'est fait, je peux passer à autre chose
- **Appartenance** : Je fais partie de l'équipe, on me voit
- **Calme** : Tout est clair, pas de stress

**À éviter :**
- **Confusion** : Où dois-je cliquer ?
- **Frustration** : Encore une étape de plus ?
- **Isolement** : Personne ne sait ce que je fais
- **Anxiété** : J'ai raté quelque chose d'important ?

### Emotional Design Principles

1. **Pas de culpabilité** : Pas de rappels agressifs pour les stand-ups manqués
2. **Pas d'overwhelm** : Interface épurée, minimum d'éléments visuels
3. **Pas de performance anxiety** : Pas de comparaison publique des contributions
4. **Pas de FOMO** : Pas de gamification, pas de streaks, pas de badges

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Notion**
- Interface épurée avec whitespace généreux - l'œil respire
- Typographie sobre avec hiérarchie claire sans surcharge
- Icônes discrètes, fonctionnalité sans pollution visuelle
- Structure modulaire évidente sans éléments décoratifs

**ChatGPT**
- Un seul champ central dominant - zéro hésitation sur l'action à faire
- Fond neutre permettant le focus total sur le contenu
- Pas de sidebar envahissante - l'action principale domine l'écran
- Feedback immédiat - confirmation visuelle instantanée

### Transferable UX Patterns

| Pattern | Source | Application StandApp |
|---------|--------|---------------------|
| Champ central dominant | ChatGPT | Formulaire check-in = élément principal, rien autour |
| Whitespace généreux | Notion | Cartes de stand-up espacées, pas entassées |
| Typographie sobre | Les deux | Police système, hiérarchie par taille uniquement |
| Couleur par exception | Les deux | Interface gris/noir, seuls les blocages en rouge |
| Zéro décoration | Les deux | Pas d'illustrations, pas d'icônes superflues |

### Anti-Patterns to Avoid

| Anti-pattern | Raison |
|--------------|--------|
| Dashboards chargés | Contraire au scan en 3 secondes |
| Couleurs vives multiples | Distrait de l'essentiel (blocages) |
| Animations décoratives | Ralentit sans apporter de valeur |
| Menus hamburger | Cache l'info, ajoute des clics inutiles |
| Badges et notifications | Crée de l'anxiété (contraire aux principes émotionnels) |
| Gamification | Streaks, points, badges = pression inutile |

---

## Design System Foundation

### Design System Choice

**Tailwind CSS + shadcn/ui**

Une combinaison moderne et flexible parfaitement adaptée aux besoins de StandApp :
- Tailwind CSS pour le styling utility-first
- shadcn/ui pour les composants accessibles et personnalisables
- Radix UI sous le capot pour l'accessibilité native

### Rationale for Selection

| Critère | Justification |
|---------|---------------|
| Minimalisme | shadcn/ui est sobre par défaut, aligné avec l'inspiration Notion/ChatGPT |
| Apprentissage | Tailwind = compétence très demandée, valeur ajoutée pour les apprenants |
| Flexibilité | Composants copiés dans le projet, modifiables à 100% par les contributeurs |
| Accessibilité | Radix UI intégré = ARIA et keyboard navigation par défaut |
| Contributions | Code simple et lisible, idéal pour les PRs des apprenants |
| Modernité | Stack tendance 2024-2025, documentation abondante |

---

## Visual Foundation

### Color Palette

| Token | Valeur | Usage |
|-------|--------|-------|
| `--background` | #ffffff | Fond principal |
| `--background-subtle` | #fafafa | Fond cartes, sections |
| `--foreground` | #0a0a0a | Texte principal |
| `--muted` | #6b7280 | Texte secondaire, labels |
| `--border` | #e5e7eb | Bordures subtiles |
| `--destructive` | #ef4444 | **Indicateur blocage** |
| `--success` | #22c55e | Stand-up complété (optionnel) |

**Principe : Monochrome + Rouge blocage**

L'interface reste en niveaux de gris. Seul le rouge apparaît pour signaler un blocage, garantissant une détection instantanée.

### Typography

| Élément | Style |
|---------|-------|
| Font family | `Inter` ou `system-ui, sans-serif` |
| Heading 1 | 24px / 600 weight |
| Heading 2 | 18px / 600 weight |
| Body | 14px / 400 weight |
| Small | 12px / 400 weight |
| Line height | 1.5 (confortable) |

**Principe : Hiérarchie par taille uniquement**

Pas de variations de couleur pour la hiérarchie. Taille + weight suffisent.

### Spacing & Layout

| Token | Valeur | Usage |
|-------|--------|-------|
| `--space-xs` | 4px | Micro-espacements |
| `--space-sm` | 8px | Entre éléments proches |
| `--space-md` | 16px | Padding standard |
| `--space-lg` | 24px | Entre sections |
| `--space-xl` | 32px | Marges conteneur |
| `--space-2xl` | 48px | Séparations majeures |

**Principe : Généreux (inspiré Notion)**

Espacement confortable, jamais entassé. Les cartes respirent.

### Border & Effects

| Élément | Style |
|---------|-------|
| Border radius | 6px (léger) |
| Border width | 1px |
| Shadow | Aucune ou très subtile (`0 1px 2px rgba(0,0,0,0.05)`) |
| Transitions | 150ms ease (uniquement interactions) |

---

## Screen Structure & User Flows

### Application Screens

```
┌─────────────────────────────────────────────────┐
│                   StandApp                       │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. LOGIN / INSCRIPTION                          │
│     └─→ 2. VUE ÉQUIPE (page principale)         │
│              └─→ 3. MON STAND-UP (modal/inline) │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Screen 1: Login / Inscription

**Objectif :** Accéder à l'app en < 30 secondes

**Éléments :**
- Logo StandApp (texte simple, pas d'image)
- Tabs ou toggle : Connexion / Inscription
- Champs : Email + Mot de passe
- Bouton principal : "Se connecter" / "S'inscrire"
- Lien : "Mot de passe oublié ?"

**Layout :**
- Centré verticalement et horizontalement
- Largeur max : 400px
- Beaucoup de whitespace

### Screen 2: Vue Équipe (Dashboard)

**Objectif :** Scanner l'état de l'équipe en 3 secondes

**Éléments :**
- Header minimal : Logo + Nom utilisateur + Déconnexion
- Date du jour (bien visible)
- Grille de cartes membres (2-3 colonnes desktop)
- Chaque carte affiche :
  - Avatar/initiales + Nom
  - Indicateur : ✅ Stand-up fait | ⚪ Pas encore | 🔴 Bloqué
  - Aperçu du "Aujourd'hui" (tronqué)
- CTA flottant ou en header : "Faire mon stand-up"

**États visuels des cartes :**

| État | Style |
|------|-------|
| Stand-up fait, pas bloqué | Bordure normale, fond blanc |
| Stand-up fait, bloqué | Bordure rouge, badge rouge "Bloqué" |
| Pas de stand-up | Fond gris très léger, texte "Pas encore de stand-up" |

### Screen 3: Mon Stand-up (Formulaire)

**Objectif :** Compléter en < 2 minutes

**Implémentation :** Modal ou section inline sur la vue équipe

**Éléments :**
- Titre : "Mon stand-up - [Date]"
- Textarea : "Ce que j'ai fait hier" (placeholder : "Ex: Avancé sur la feature X...")
- Textarea : "Ce que je fais aujourd'hui" (placeholder : "Ex: Continuer la feature X...")
- Switch + Label : "Je suis bloqué"
- Si bloqué → Textarea : "Décris ton blocage"
- Bouton : "Enregistrer"

**Validation :**
- Champs "hier" et "aujourd'hui" : optionnels mais encouragés
- Blocage : si switch activé, description obligatoire

---

## Component Strategy

### shadcn/ui Components for MVP

| Composant | Usage | Customisation |
|-----------|-------|---------------|
| `Button` | Actions principales | Variantes : default, destructive |
| `Input` | Email, mot de passe | Style minimal |
| `Textarea` | Champs stand-up | Auto-resize, placeholder clair |
| `Card` | Carte membre | Bordure conditionnelle (blocage) |
| `Switch` | Toggle blocage | Label inline |
| `Badge` | Indicateur blocage | Rouge uniquement |
| `Avatar` | Photo/initiales membre | Fallback initiales |
| `Dialog` | Modal stand-up (si modal) | Simple, pas de X visible |
| `Tabs` | Login/Register toggle | Style discret |

### Custom Components

| Composant | Description |
|-----------|-------------|
| `MemberCard` | Carte membre avec état stand-up |
| `StandupForm` | Formulaire 3 champs + blocage |
| `TeamGrid` | Grille responsive des membres |
| `DateHeader` | Affichage date du jour |

---

## UX Patterns

### Navigation Pattern

**Minimal navigation :**
- Pas de sidebar
- Header simple : Logo | [Date] | Avatar + Menu dropdown (Profil, Déconnexion)
- Navigation principale = contenu lui-même (cartes cliquables)

### Form Patterns

**Formulaire stand-up :**
- Labels au-dessus des champs (pas flottants)
- Placeholders comme exemples, pas comme labels
- Validation inline discrète
- Bouton submit toujours visible (pas de scroll)
- Sauvegarde instantanée avec feedback ("Enregistré ✓")

### Feedback Patterns

| Action | Feedback |
|--------|----------|
| Stand-up enregistré | Toast discret "Stand-up enregistré" + disparition |
| Erreur | Message inline sous le champ, bordure rouge |
| Chargement | Bouton disabled + spinner subtil |
| Connexion réussie | Redirect immédiat vers dashboard |

### Empty States

| Contexte | Message | Action |
|----------|---------|--------|
| Aucun stand-up aujourd'hui (soi) | "Tu n'as pas encore fait ton stand-up" | Bouton "Faire mon stand-up" |
| Membre sans stand-up | "Pas encore de stand-up aujourd'hui" | Aucune (lecture seule) |
| Équipe vide | "Aucun membre dans l'équipe" | Instructions pour inviter |

---

## Responsive Design

### Breakpoints

| Breakpoint | Largeur | Comportement |
|------------|---------|--------------|
| Mobile | < 640px | 1 colonne, cards full width |
| Tablet | 640-1024px | 2 colonnes |
| Desktop | > 1024px | 3 colonnes, max-width container |

### Mobile Adaptations

- Header : Logo + hamburger menu (profil, déconnexion)
- Cards : Full width, empilées
- Formulaire : Full screen modal
- Touch targets : Minimum 44x44px

### Desktop Optimizations

- Container centré : max-width 1200px
- Grid : 3 colonnes avec gap généreux
- Formulaire : Modal 500px ou section inline

---

## Accessibility

### Minimum Requirements

| Aspect | Implementation |
|--------|----------------|
| Contraste | Ratio 4.5:1 minimum (texte/fond) |
| Focus visible | Outline visible sur tous les éléments interactifs |
| Labels | Tous les inputs ont des labels explicites |
| ARIA | Fourni par Radix UI (shadcn/ui) |
| Keyboard | Navigation complète au clavier |
| Screen readers | Structure sémantique (headings, landmarks) |

### Semantic Structure

```html
<header> Logo + Navigation </header>
<main>
  <h1>Stand-ups du [Date]</h1>
  <section aria-label="Liste des membres">
    <article> Carte membre 1 </article>
    <article> Carte membre 2 </article>
  </section>
</main>
```

---

## Implementation Priorities

### MVP (Phase 1)

1. Login / Inscription fonctionnels
2. Vue équipe avec grille de cartes
3. Formulaire stand-up (3 champs + blocage)
4. Indicateur visuel blocage (rouge)
5. Responsive basique (mobile fonctionnel)

### Post-MVP (Contributions apprenants)

Les apprenants peuvent ajouter via PR :
- Dark mode
- Historique des stand-ups
- Notifications email
- Stats / dashboard
- Export données
- Profil utilisateur enrichi
- Et tout ce qu'ils imaginent...

---

## Design Checklist

### Avant développement

- [ ] Palette couleurs définie dans Tailwind config
- [ ] Typographie configurée
- [ ] Composants shadcn/ui installés
- [ ] Structure de fichiers composants créée

### Pendant développement

- [ ] Chaque écran respecte les specs ci-dessus
- [ ] Contraste vérifié (outil : WebAIM)
- [ ] Navigation clavier testée
- [ ] Mobile testé (Chrome DevTools)
- [ ] États vides implémentés

### Avant livraison

- [ ] Scan équipe < 3 secondes (test utilisateur)
- [ ] Check-in < 2 minutes (test utilisateur)
- [ ] Blocages visibles instantanément
- [ ] Pas d'éléments superflus

---

## Summary

StandApp adopte une approche **radicalement minimaliste** inspirée de Notion et ChatGPT :

- **3 écrans** : Login → Dashboard → Formulaire
- **1 action core** : Le check-in quotidien
- **1 signal d'alerte** : Le rouge pour les blocages
- **0 distraction** : Pas de notifications, pas de gamification

Le design system **Tailwind + shadcn/ui** permet un développement rapide tout en restant accessible et extensible pour les contributions des apprenants.

**Métrique de succès UX :** Si un utilisateur peut faire son stand-up en moins de 2 minutes sans aide, le design a réussi.
