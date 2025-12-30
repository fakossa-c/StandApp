---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - product-brief-StandApp-2025-12-29.md
workflowType: 'prd'
lastStep: 11
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
---

# Product Requirements Document - StandApp

**Author:** Fakos
**Date:** 2025-12-29

## Executive Summary

**StandApp** est une application web de stand-up asynchrone conçue comme véhicule pédagogique pour les apprenants en vibe coding.

### Vision

Transposer le stand-up journalier en rituel asynchrone ultra-simple : chaque membre fait un check-in quotidien (hier/aujourd'hui/blocages), visible par l'équipe, remise à zéro le lendemain. Aucune discussion, aucun chat, aucune gestion de projet.

L'objectif principal n'est pas l'application elle-même, mais l'apprentissage d'un workflow GitHub professionnel (branches, PRs, code review) via la méthodologie BMAD.

### Problème résolu

1. Les stand-up meetings synchrones sont lourds, chronophages et dérivent facilement
2. Les apprenants manquent d'un projet concret et partagé pour pratiquer les workflows GitHub professionnels

### Ce qui rend StandApp spécial

1. **Double valeur** : Application utile + véhicule pédagogique
2. **Liberté totale** : Chaque apprenant choisit et implémente sa propre feature
3. **Stack accessible** : React + Supabase, idéal pour débutants/intermédiaires
4. **Méthodologie intégrée** : Tous les participants utilisent BMAD
5. **Succès mesurable** : 1 PR mergée par apprenant = objectif atteint

## Project Classification

**Type technique :** web_app
**Domaine :** edtech
**Complexité :** medium
**Contexte projet :** Greenfield - nouveau projet

L'application cible les équipes d'apprenants en formation développement, avec un focus sur l'apprentissage collaboratif via GitHub plutôt que sur des fonctionnalités avancées de stand-up.

## Success Criteria

### User Success

**Pour l'apprenant (Alex) :**
- **Moment de succès :** Voir sa PR mergée et sa feature intégrée à l'application
- **Validation :** L'apprenant a compris et appliqué le workflow GitHub + BMAD

**Pour le formateur (Fakos) :**
- **Indicateur unique :** Nombre de PRs mergées
- **Succès :** Chaque apprenant a contribué au moins une feature

### Business Success

| Métrique | Cible | Mesure |
|----------|-------|--------|
| PRs mergées | 1 par apprenant | Comptage GitHub |
| Taux de complétion | 100% | % apprenants avec 1+ PR mergée |

### Technical Success

- Application fonctionnelle (auth + stand-ups opérationnels)
- Codebase prête pour contributions (clone, branche, PR sans friction)
- Documentation suffisante pour l'onboarding des apprenants

### Measurable Outcomes

**Métrique unique et binaire :** 1 PR mergée par apprenant = succès

**Ce qu'on ne mesure PAS (volontairement) :**
- Qualité du code
- Nombre de stand-ups remplis
- Temps de cycle
- Complexité des features ajoutées

La simplicité est une feature, pas un compromis.

## Product Scope

### MVP - Minimum Viable Product

- **Authentification :** Inscription/connexion par email
- **Gestion des membres :** Liste des utilisateurs inscrits
- **Stand-up quotidien :** Formulaire (hier/aujourd'hui/blocage)
- **Visualisation :** Vue d'ensemble des stand-ups de l'équipe

### Growth Features (Post-MVP)

Entièrement entre les mains des apprenants. Exemples possibles :
- Notifications (email, push, Slack)
- Statistiques / dashboard
- Mode sombre / thèmes
- Historique visuel (timeline, graphes)
- Gamification (streaks, badges)
- Chat / commentaires
- Export de données

### Vision (Future)

L'évolution de StandApp est **pilotée par les apprenants**. Chaque contribution enrichit l'application tout en validant l'apprentissage du contributeur.

## User Journeys

### Journey 1 : Alex - De spectateur à contributeur

Alex vient de terminer sa première web app solo. Il maîtrise les bases de Git (clone, commit, push) mais n'a jamais travaillé sur un projet partagé avec d'autres développeurs. Quand Fakos lui présente StandApp, Alex est à la fois excité et nerveux - c'est sa première vraie collaboration.

**Jour 1 - Découverte**
Alex clone le repo, lance l'app en local, et s'inscrit. L'interface est simple : un formulaire de stand-up avec trois champs. Il remplit son premier check-in : "Aujourd'hui : Explorer le code de StandApp. Blocage : Non." En quelques secondes, il voit son stand-up apparaître dans la vue d'équipe aux côtés des autres apprenants.

**Semaine 1 - Routine**
Chaque matin, Alex prend 2 minutes pour mettre à jour son stand-up. Il commence à repérer les patterns dans le code React, note les features qui manquent. Un jour, il coche "Blocage : Oui" et décrit son problème. Le lendemain, un autre apprenant lui envoie un message avec la solution - ils avaient eu le même souci.

**Semaine 2 - Contribution**
Alex décide d'ajouter un mode sombre. Il crée sa branche, suit le workflow BMAD, code sa feature, et soumet sa première PR. Fakos review le code, suggère quelques améliorations. Après deux itérations, la PR est mergée.

**Le moment de succès**
Alex rafraîchit l'app en production. Son toggle de mode sombre est là, fonctionnel, utilisé par toute l'équipe. Il a contribué à un vrai projet. Le workflow GitHub n'est plus abstrait - c'est devenu naturel.

---

### Journey 2 : Alex - Parcours avec blocage

Même Alex, mais cette fois les choses ne se passent pas aussi bien.

**Le blocage**
Alex travaille sur une feature de notifications. Après 3 jours, il est bloqué sur l'intégration Supabase. Son stand-up affiche "Blocage : Oui - Impossible de configurer les webhooks Supabase, la doc n'est pas claire."

**La visibilité**
Fakos voit le blocage dans la vue d'équipe. Il contacte Alex, organise un call rapide, et débloque la situation en 15 minutes. Sans le stand-up visible, Alex aurait peut-être abandonné ou perdu plusieurs jours.

**La leçon**
Alex comprend la valeur du stand-up asynchrone : rendre les blocages visibles avant qu'ils ne deviennent des problèmes majeurs.

---

### Journey 3 : Fakos - Le formateur qui supervise

Fakos gère une cohorte de 8 apprenants répartis sur différents fuseaux horaires. Impossible de faire des stand-ups synchrones quotidiens.

**Le rituel matinal**
Chaque matin, Fakos ouvre StandApp avec son café. En 3 minutes, il scanne les stand-ups de la veille. Il repère immédiatement :
- Qui avance bien (stand-ups réguliers, pas de blocage)
- Qui est bloqué (indicateur rouge visible)
- Qui décroche (pas de stand-up depuis 2 jours)

**L'intervention ciblée**
Au lieu d'envoyer des messages génériques à tout le monde, Fakos contacte uniquement les apprenants qui ont besoin d'aide. Aujourd'hui, c'est Alex (blocage technique) et Marie (pas de stand-up depuis 3 jours - il envoie un message pour prendre des nouvelles).

**Le suivi des PRs**
En parallèle, Fakos review les PRs sur GitHub. Quand il merge une PR, il sait que l'apprenant a validé l'exercice. Le compteur de PRs mergées est sa métrique principale.

**Le succès**
En fin de formation, 8 apprenants sur 8 ont au moins une PR mergée. Mission accomplie.

---

### Journey Requirements Summary

Ces parcours révèlent les capacités nécessaires :

| Capability | Journey Source |
|------------|----------------|
| Inscription/Connexion | Alex J1 |
| Formulaire stand-up (hier/aujourd'hui/blocage) | Alex J1, tous |
| Vue d'équipe des stand-ups | Alex J1, Fakos J3 |
| Indicateur visuel de blocage | Alex J2, Fakos J3 |
| Identification des utilisateurs inactifs | Fakos J3 |
| Reset quotidien des stand-ups | Implicite dans tous |

## Web App Specific Requirements

### Project-Type Overview

StandApp est une **Single Page Application (SPA)** React avec Supabase comme backend. L'architecture est volontairement simple pour servir de terrain d'apprentissage aux apprenants.

### Technical Architecture Considerations

| Aspect | Décision | Justification |
|--------|----------|---------------|
| Architecture | SPA (React) | Stack accessible pour débutants |
| Backend | Supabase (BaaS) | Auth + DB + API intégrés, pas de backend custom |
| État | Local + Supabase realtime (optionnel) | Simplicité maximale |
| Routing | React Router | Navigation standard SPA |

### Browser Support

**Navigateurs supportés :**
- Chrome (2 dernières versions)
- Firefox (2 dernières versions)
- Safari (2 dernières versions)
- Edge (2 dernières versions)
- Mobile : Chrome iOS/Android, Safari iOS

**Non supporté :**
- Internet Explorer (obsolète)
- Navigateurs anciens

### Responsive Design

| Breakpoint | Cible | Priorité |
|------------|-------|----------|
| Mobile | 320px - 768px | Secondaire |
| Tablet | 768px - 1024px | Secondaire |
| Desktop | 1024px+ | Primaire |

L'usage principal sera desktop (apprenants en formation), mais l'interface doit rester utilisable sur mobile pour les check-ins rapides.

### Performance Targets

| Métrique | Cible | Mesure |
|----------|-------|--------|
| First Contentful Paint | < 2s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Bundle size | < 500KB gzipped | Build analysis |

Objectif : app légère et rapide, pas de fonctionnalités lourdes.

### SEO Strategy

**Aucune stratégie SEO requise.**

L'application est privée (accès par inscription uniquement). Pas besoin d'indexation par les moteurs de recherche.

### Accessibility Level

**Niveau : Bonnes pratiques de base**

- Labels sur tous les champs de formulaire
- Contraste suffisant pour la lisibilité
- Navigation au clavier fonctionnelle
- Pas de conformité WCAG stricte requise

### Implementation Considerations

**Simplicité comme principe directeur :**
- Pas de state management complexe (Redux, Zustand) - React state + Supabase suffisent
- Pas de SSR/SSG (pas de SEO nécessaire)
- Pas de temps réel obligatoire (refresh manuel acceptable)
- Code lisible et bien structuré pour faciliter les contributions des apprenants

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP :** Problem-Solving MVP
- Résoudre le problème core avec un minimum de features
- Simplicité intentionnelle comme principe directeur
- MVP = plateforme fonctionnelle pour contributions des apprenants

**Ressources requises :**
- 1 développeur (Fakos) pour le MVP initial
- Stack : React + Supabase (pas de backend custom)
- Estimation : MVP réalisable rapidement grâce à la simplicité voulue

### MVP Feature Set (Phase 1)

**Parcours utilisateurs supportés :**
- Alex J1 : Découverte et premiers stand-ups
- Alex J2 : Signalement de blocages
- Fakos J3 : Supervision de l'équipe

**Fonctionnalités essentielles :**

| Feature | Priorité | Justification |
|---------|----------|---------------|
| Inscription/Connexion email | Must-have | Accès à l'app |
| Liste des membres | Must-have | Visibilité équipe |
| Formulaire stand-up | Must-have | Fonctionnalité core |
| Vue d'équipe | Must-have | Supervision |
| Indicateur de blocage | Must-have | Détection problèmes |

### Post-MVP Features

**Phase 2+ (Contributions apprenants) :**

Entièrement pilotée par les apprenants via le workflow BMAD. Exemples :
- Notifications (email, push, Slack)
- Mode sombre / thèmes
- Statistiques / dashboard
- Historique visuel
- Gamification (streaks, badges)
- Export de données

**Aucune roadmap imposée** - chaque apprenant choisit sa feature.

### Risk Mitigation Strategy

**Risques techniques :**
- Stack simple (React + Supabase) = risque minimal
- Pas de fonctionnalités complexes dans le MVP
- Mitigation : Documentation claire pour les contributeurs

**Risques pédagogiques :**
- Risque : Apprenants bloqués sur le workflow GitHub
- Mitigation : Documentation BMAD + support Fakos

**Risques de scope creep :**
- Risque : Tentation d'ajouter des features au MVP
- Mitigation : Discipline stricte - toute feature supplémentaire = PR d'un apprenant

## Functional Requirements

### Authentification & Gestion de compte

- FR1: Un visiteur peut créer un compte avec email et mot de passe
- FR2: Un utilisateur peut se connecter avec ses identifiants
- FR3: Un utilisateur peut se déconnecter de l'application
- FR4: Un utilisateur peut réinitialiser son mot de passe

### Gestion des membres

- FR5: Un utilisateur connecté peut voir la liste de tous les membres inscrits
- FR6: Un utilisateur peut voir le profil basique d'un autre membre (nom, email)

### Stand-up quotidien

- FR7: Un utilisateur peut créer ou modifier son stand-up du jour
- FR8: Un utilisateur peut renseigner ce qu'il a fait hier (texte libre)
- FR9: Un utilisateur peut renseigner ce qu'il fait aujourd'hui (texte libre)
- FR10: Un utilisateur peut indiquer s'il est bloqué (oui/non)
- FR11: Un utilisateur peut décrire son blocage si applicable (texte libre)
- FR12: Le système limite à un seul stand-up par utilisateur par jour

### Vue d'équipe

- FR13: Un utilisateur peut voir les stand-ups de tous les membres pour le jour courant
- FR14: Un utilisateur peut identifier visuellement les membres ayant un blocage
- FR15: Un utilisateur peut identifier les membres n'ayant pas encore fait leur stand-up du jour

### Cycle quotidien

- FR16: Le système considère chaque jour comme une nouvelle période de stand-up
- FR17: Les stand-ups des jours précédents restent consultables (historique)

## Non-Functional Requirements

### Performance

- NFR1: Les pages se chargent en moins de 2 secondes sur une connexion standard
- NFR2: Les actions utilisateur (soumettre stand-up, navigation) répondent en moins de 1 seconde
- NFR3: L'application reste fonctionnelle sur des connexions lentes (3G)

### Sécurité

- NFR4: Les mots de passe sont hashés et jamais stockés en clair
- NFR5: Les sessions utilisateur expirent après inactivité prolongée
- NFR6: Seuls les utilisateurs authentifiés accèdent aux données de l'équipe
- NFR7: Les communications client-serveur sont chiffrées (HTTPS)

### Accessibilité

- NFR8: Tous les champs de formulaire ont des labels explicites
- NFR9: Le contraste texte/fond respecte un ratio minimum de 4.5:1
- NFR10: La navigation au clavier est fonctionnelle sur toutes les pages

### Maintenabilité

- NFR11: Le code suit des conventions claires documentées (pour faciliter les contributions)
- NFR12: La structure du projet est simple et compréhensible pour des débutants
- NFR13: Un README explique comment installer et lancer le projet localement

