# MyTrainX Documentation Operating System

**Documentation version:** 0.2.0  
**Last architecture review:** 2026-09-24  
**Status:** ACTIVE

This folder is the single source of truth for product, architecture, implementation, validation and creative handoff.

## Read order for every contributor or AI agent

1. `AGENTS.md`
2. `docs/status/CURRENT.md`
3. `docs/governance/OWNERSHIP.md`
4. `docs/roadmap/MASTER-ROADMAP.md`
5. The stage file currently marked IN PROGRESS
6. Relevant ADRs under `docs/architecture/adr/`
7. Relevant domain/creative documentation

## Documentation map

```
docs/
├── analysis/       dated audits and technical analyses
├── architecture/   system architecture + ADR decisions
├── creative/       brand/design/social parallel workstream
├── governance/     ownership, workflow, versions, validation
├── handoff/        instructions for coding agents / other workspaces
├── product/        product specifications
├── roadmap/        master roadmap and stage-by-stage development
└── status/         current state + dated change log
```

## Status vocabulary

- **PLANNED** — accepted, not started
- **IN PROGRESS** — active implementation
- **BLOCKED** — cannot proceed without dependency
- **IN REVIEW** — implementation complete, validation pending
- **VALIDATED** — acceptance criteria passed
- **SUPERSEDED** — replaced by a newer decision/version

Never describe a feature as complete unless it is marked VALIDATED with evidence.
