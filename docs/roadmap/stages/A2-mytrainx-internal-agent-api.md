# Stage A2 — MyTrainX Internal Agent API

**Status:** IN PROGRESS  
**Owner:** MyTrainX Implementation  
**Reviewer:** Architecture & Integration  
**Last reviewed:** 2026-09-24

## Initial endpoints / tool contracts

The final route naming may evolve, but capabilities are fixed:

- get_user_profile
- get_entitlements
- get_today_workout
- get_progress_summary

## Security model

The agent/model never supplies the authoritative user ID.

The MyTrainX backend derives the principal from its signed integration context.

Requests must contain:
- authenticated service identity
- short expiry
- user principal
- tenant/product audience
- allowed scope

## Acceptance

Each tool:
- works for an authorized current user;
- rejects cross-user substitution;
- has typed response schema;
- has predictable error model;
- is testable independently from any LLM.


## Implementation update — 2026-09-25

Initial read-only endpoints implemented:

- `GET /api/internal/agent/profile`
- `GET /api/internal/agent/entitlements`
- `GET /api/internal/agent/current-program`
- `GET /api/internal/agent/today-workout`
- `GET /api/internal/agent/progress-summary`

Authentication:
- HMAC-SHA256 signed service context
- user UUID comes from signed server context
- 90-second timestamp window
- per-tool scopes
- request ID included in signature

Required server secret:
`MYTRAINX_AGENT_SHARED_SECRET`

The full Atendimento.Center client/runtime integration remains B1/C1 work.
