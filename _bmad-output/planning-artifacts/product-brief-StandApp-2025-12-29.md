---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - brief
date: 2025-12-29
author: Fakos
project_name: StandApp
---

# Product Brief: StandApp

## Executive Summary

**StandApp** est une application web de stand-up asynchrone conçue comme véhicule pédagogique pour les apprenants en vibe coding. L'objectif principal n'est pas l'application elle-même, mais l'apprentissage d'un workflow GitHub professionnel utilisant la méthodologie BMAD.

Le MVP fournit une base fonctionnelle minimaliste (inscription, visualisation des membres, fiches de stand-up) que chaque apprenant enrichira d'une fonctionnalité de son choix via un processus de pull request structuré.

**Métrique de succès** : Nombre de PRs mergées.

---

## Core Vision

### Problem Statement

Dans un contexte d'apprentissage du développement collaboratif, les apprenants manquent d'un projet concret et simple pour pratiquer les workflows GitHub professionnels (branches, pull requests, code review) dans un environnement réaliste mais accessible.

### Problem Impact

Sans pratique concrète sur un vrai projet partagé :
- Les concepts Git/GitHub restent théoriques
- La collaboration à distance n'est pas expérimentée
- Les bonnes pratiques (BMAD, clean code) ne sont pas ancrées

### Why Existing Solutions Fall Short

Les outils de communication existants (Discord, Slack) génèrent trop de bruit et de discussions inutiles. Les projets pédagogiques classiques sont souvent trop complexes ou trop encadrés pour permettre une vraie appropriation.

### Proposed Solution

Une application web ultra-simple en React :
- **MVP** : Inscription, liste des membres, fiche de stand-up modifiable (travail d'hier, travail d'aujourd'hui, blocage oui/non et description)
- **Évolution** : Chaque apprenant contribue une fonctionnalité de son choix
- **Aucune contrainte** : Liberté totale sur les ajouts (chat, stats, notifications, thèmes...)
- **Process** : Workflow GitHub + BMAD obligatoire pour tous

### Key Differentiators

1. **Double valeur** : App utile + véhicule pédagogique
2. **Liberté totale** : Pas de roadmap imposée, chaque étudiant est autonome
3. **Stack accessible** : React simple, idéal pour débutants/intermédiaires
4. **Méthodologie intégrée** : Tous les participants utilisent BMAD
5. **Succès mesurable** : PRs mergées = apprentissage validé

---

## Target Users

### Primary Users

**Persona : Alex, apprenant en vibe coding**

- **Profil** : A déjà développé une petite web app, connaissances Git basiques (clone, commit, push)
- **Contexte** : Formation 100% à distance, travaille de manière asynchrone
- **Motivation** : Apprendre un workflow GitHub professionnel et contribuer à un vrai projet collaboratif
- **Frustration actuelle** : Les concepts Git/GitHub restent abstraits sans projet concret partagé
- **Succès** : Voir sa PR mergée et sa fonctionnalité intégrée à l'app

**Besoins clés :**
- Interface simple pour les stand-ups quotidiens
- Documentation claire du process de contribution
- Feedback rapide sur ses PRs

### Secondary Users

**Persona : Fakos, formateur/mentor**

- **Profil** : Expert technique, supervise la formation à distance
- **Contexte** : Valide les PRs, surveille la progression des apprenants
- **Motivation** : Enseigner les bonnes pratiques (GitHub, BMAD) via un projet concret
- **Succès** : Nombre élevé de PRs mergées, apprenants autonomes sur le workflow

**Besoins clés :**
- Vue d'ensemble des stand-ups (qui avance, qui est bloqué)
- Interface de review des PRs (GitHub)
- Métrique simple : PRs mergées

### User Journey

**Parcours apprenant :**
1. **Découverte** → Présentation par le formateur
2. **Onboarding** → Inscription, premier stand-up
3. **Usage quotidien** → Mise à jour fiche (hier/aujourd'hui/blocage)
4. **Contribution** → Choix feature → Branche → Code → PR via BMAD
5. **Validation** → PR reviewée et mergée

**Parcours formateur :**
1. **Setup** → Présentation app + process BMAD
2. **Monitoring** → Lecture des stand-ups, détection blocages
3. **Validation** → Code review + merge PRs

---

## Success Metrics

### Métrique principale

**1 PR mergée par apprenant**

C'est le seul indicateur de succès. Simple, mesurable, binaire.

| Métrique | Cible | Mesure |
|----------|-------|--------|
| PRs mergées | 1 par apprenant | Comptage GitHub |

### Business Objectives

- **Objectif pédagogique** : Chaque apprenant valide sa compréhension du workflow GitHub + BMAD en contribuant une fonctionnalité
- **Validation** : La PR est mergée = l'apprenant a réussi l'exercice

### Key Performance Indicators

| KPI | Définition | Succès |
|-----|------------|--------|
| Taux de complétion | % d'apprenants avec 1+ PR mergée | 100% |

**Ce qu'on ne mesure pas (volontairement) :**
- Qualité du code (pas de score)
- Nombre de stand-ups remplis
- Temps de cycle
- Complexité des features

La simplicité est une feature, pas un compromis.

---

## MVP Scope

### Core Features

**Authentification**
- Inscription par email/mot de passe
- Connexion/déconnexion

**Gestion des membres**
- Liste de tous les utilisateurs inscrits
- Profil utilisateur basique

**Stand-up quotidien**
- Formulaire de fiche stand-up :
  - Ce que j'ai fait hier (texte)
  - Ce que je fais aujourd'hui (texte)
  - Blocage : oui/non
  - Description du blocage (si oui)
- Historique des stand-ups conservé

**Visualisation**
- Vue d'ensemble des stand-ups de l'équipe
- Identification rapide des blocages

### Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React |
| Backend/BDD | Supabase |
| Auth | Supabase Auth |

### Out of Scope for MVP

Tout le reste est hors scope MVP mais **ouvert aux contributions des apprenants** :
- Notifications
- Statistiques / analytics
- Thèmes / personnalisation UI
- Chat / commentaires
- Intégrations externes
- Export de données
- Rôles / permissions avancées

### MVP Success Criteria

| Critère | Validation |
|---------|------------|
| MVP fonctionnel | L'app tourne, auth + stand-ups marchent |
| Prêt pour contributions | Les apprenants peuvent cloner, brancher, PR |
| 1 PR mergée par apprenant | Métrique principale |

### Future Vision

L'évolution de StandApp est **entièrement entre les mains des apprenants**. Chaque étudiant choisit librement une fonctionnalité à implémenter via le workflow GitHub + BMAD.

Exemples de directions possibles :
- Dashboard avec statistiques d'équipe
- Notifications (email, push, Slack)
- Mode sombre / thèmes
- Historique visuel (timeline, graphes)
- Gamification (streaks, badges)
- Et tout ce qu'ils imagineront...
