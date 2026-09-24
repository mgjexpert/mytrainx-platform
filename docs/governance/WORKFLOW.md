# Development & Communication Workflow

**Version:** 1.0  
**Reviewed:** 2026-09-24

## One repository, one current state

`mgjexpert/mytrainx-platform` is the source of truth for MyTrainX product implementation.

The Atendimento.Center repository/infrastructure remains independent. Integration contracts are documented here, while Agent Runtime implementation belongs to the Atendimento.Center workstream.

## Before starting work

Every agent must:

1. fetch current `main`;
2. read `AGENTS.md`;
3. read `docs/status/CURRENT.md`;
4. identify the active stage;
5. read relevant ADRs;
6. verify no concurrent branch is implementing the same scope.

## Branch naming

```
feat/<domain>-<feature>
fix/<domain>-<issue>
docs/<topic>-YYYY-MM-DD
chore/<topic>
```

Examples:

```
feat/supabase-core-schema
feat/domain-agent-api
feat/trainer-webchat
docs/project-operating-system-2026-09-24
```

## Pull request requirement

Substantial work uses PRs. PR description must state:

- Stage
- Scope
- Architecture decisions used
- Files/DB changed
- Environment changes
- Security impact
- Test/build evidence
- Screenshots for visible UI
- Remaining limitations
- Proposed status transition

## Cross-project communication

When MyTrainX needs Atendimento.Center work, create or update an integration contract document first.

When Atendimento.Center requires a MyTrainX capability, it must request an Internal API/tool contract, not direct DB access.

When creative work changes visual direction, update versioned references and the creative handoff before engineering changes.

## No silent architecture changes

Any change to:
- source of truth
- auth boundaries
- payment fulfillment
- agent boundary
- WhatsApp strategy
- video provider
- entitlement model
- public API contracts

requires an ADR.
