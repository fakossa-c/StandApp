# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**StandupOS** - A simple async standup web application for product/tech teams. Each team member does a daily check-in (today/blockers/notes), visible to the team, resetting daily. No chat, no project management features.

This repository uses **BMad Method v6** - an AI-driven agile development framework with specialized agents and workflows. The `_bmad/` folder contains the framework infrastructure, not application code.

## BMad Method Architecture

### Modules
- **BMM** (BMad Method Module): Core development lifecycle - Analysis → Planning → Solutioning → Implementation
- **BMB** (BMad Builder Module): Tools for creating custom agents, workflows, modules
- **CIS** (Creative Intelligence Suite): Creative problem-solving agents (brainstorming, design thinking, storytelling)
- **Core**: Platform infrastructure (bmad-master orchestrator, workflow engine, shared tasks)

### Key Agents
| Agent | Role | Primary Workflows |
|-------|------|-------------------|
| Analyst (Mary) | Requirements elicitation, workflow init | workflow-init, brainstorm, product-brief, research |
| PM (John) | Product requirements | create-prd, create-epics-and-stories, tech-spec |
| Architect (Winston) | Technical design | create-architecture, implementation-readiness |
| UX Designer (Sally) | User experience | create-ux-design |
| SM (Bob) | Sprint management | sprint-planning, create-story, retrospective |
| DEV (Amelia) | Implementation | dev-story, code-review, quick-dev |
| TEA (Murat) | Testing architecture | testarch workflows |

### Development Phases
1. **Analysis** (optional): Product brief, research, brainstorming
2. **Planning** (required): PRD or tech-spec, UX design
3. **Solutioning** (track-dependent): Architecture, epics & stories
4. **Implementation**: Sprint planning → create-story → dev-story → code-review cycles

## Working with BMad Workflows

### Activating Agents
Agents are activated via slash commands (e.g., `/bmad:bmm:agents:analyst`) or by reading their markdown file from `_bmad/bmm/agents/`.

### Running Workflows
From an agent's menu:
- Type workflow shorthand: `*workflow-init`, `*prd`, `*create-story`
- Use menu number or natural language
- Fuzzy matching is supported

### Configuration
`_bmad/bmm/config.yaml` contains:
- `user_name`: Fakos
- `communication_language`: french
- `output_folder`: `_bmad-output/`
- `planning_artifacts`: `_bmad-output/planning-artifacts/`
- `implementation_artifacts`: `_bmad-output/implementation-artifacts/`

### Status Tracking Files
- `bmm-workflow-status.yaml`: Tracks current phase and workflow progress
- `sprint-status.yaml`: Tracks epics/stories during implementation (Phase 4)

## Project Structure

```
StandApp/
├── brief                    # Project brief (French) - read this first
├── _bmad/                   # BMad framework (do not modify)
│   ├── core/               # Platform infrastructure
│   ├── bmm/                # Development lifecycle module
│   ├── bmb/                # Builder tools module
│   ├── cis/                # Creative intelligence module
│   └── _config/            # Manifests and registry
├── _bmad-output/           # Generated artifacts (PRD, architecture, stories)
└── docs/                   # Project knowledge base
```

## Key Commands

### Workflow Status
Any agent can show current status:
```
*workflow-status
```

### Quick Flow (small features)
```
PM agent → *tech-spec → DEV agent → *quick-dev
```

### Full Method (new products)
```
Analyst → *workflow-init
PM → *prd
UX → *create-ux-design (if UI)
Architect → *create-architecture
PM → *create-epics-and-stories
SM → *sprint-planning → *create-story
DEV → *dev-story → *code-review
```

## Important Notes

- **Fresh chats**: Start a new conversation for each workflow to avoid context issues
- **Language**: Documents and communication are in French per config
- **Output location**: All generated documents go to `_bmad-output/`
- **Workflow engine**: Complex workflows use step-file architecture with JIT loading - follow the workflow.xml or workflow.md instructions exactly
