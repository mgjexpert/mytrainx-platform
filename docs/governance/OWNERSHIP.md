# Ownership & Responsibility

**Version:** 1.0  
**Reviewed:** 2026-09-24

The goal is to allow several ChatGPT tabs, coding agents and product workstreams to work in parallel without ownership ambiguity.

## Roles

| Role | Owner | Responsible for | Must not own |
|---|---|---|---|
| Product Owner | MGJ Expert | Business direction, priorities, approvals, brand/business decisions | Low-level implementation |
| Architecture & Integration | Main MyTrainX architecture thread | Cross-system architecture, contracts, repo organization, technical review, integration sequence | Long-running isolated coding without repo state review |
| MyTrainX Implementation | ChatGPT Work / coding agent working on `mytrainx-platform` | Next.js/PWA, Supabase integration, domain API, UI, WKT migration | Atendimento.Center Agent Runtime |
| Agent Platform | Atendimento.Center engineering/AI workstream | Agent Gateway, Agent Runtime, Model Gateway, tools runtime, memory, channel routing, workers | Fitness business rules / MyTrainX source-of-truth data |
| Creative / Brand | Parallel MyTrainX creative/design thread | Logo, visual system, mockups, image direction, social identity, creative assets | Backend architecture and auth/payment behavior |
| Human Support Layer | Chatwoot / operations | Human inbox, escalation, manual resolution | AI long-term memory source of truth |
| Data / Auth Source | MyTrainX Supabase | Users, profiles, programs, workouts, progress, purchases, entitlements, subscriptions, knowledge | Agent orchestration |

## Core domain boundary

### MyTrainX owns

- authenticated user identity
- profile
- programs
- workouts
- progress
- products
- orders
- entitlements
- subscriptions
- events
- library
- fitness knowledge/RAG
- MyTrainX Internal API
- product UI

### Atendimento.Center owns

- agent registry
- agent versions/prompts
- agent runtime
- model gateway
- tool orchestration
- AI conversation store
- operational memory
- identity links needed for channels
- channel routing
- human handoff orchestration
- queue/workers
- usage ledger
- agent observability

## Integration rule

Agents do not query MyTrainX tables directly.

```
Agent
  -> approved tool
  -> MyTrainX Internal API
  -> authorization
  -> Supabase
```

User IDs and entitlements are derived from authenticated server context, never accepted from free-form model output.

## Review ownership

A stage can be marked VALIDATED only when:
1. implementation owner provides evidence;
2. architecture/integration review confirms contract compatibility;
3. Product Owner approves visible product behavior when relevant.
