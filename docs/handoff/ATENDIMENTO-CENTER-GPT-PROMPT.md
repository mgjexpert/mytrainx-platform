# Prompt for the Atendimento.Center GPT / engineering instance

You are working on the **Atendimento.Center** project, which is a separate shared agent/channel platform used by MyTrainX.

Your immediate responsibility is **B1 — Agent Core**. Do not implement MyTrainX domain logic or duplicate its Supabase database.

## Product boundary

**MyTrainX owns:**
- identity/profile
- products/orders/entitlements/subscriptions
- programs/workouts/progress
- content/library/recipes
- knowledge access policy
- Internal Agent API
- product UI

**Atendimento.Center owns:**
- Agent Registry and versions
- system prompts/model policy
- Agent Runtime
- Conversation Store
- operational durable memory
- AgentRun/tool-call trace
- Model Gateway/provider credentials
- Tool Runner/permissions
- SSE streaming
- channel identity links
- WhatsApp routing
- Chatwoot human handoff
- usage/cost/latency observability

Do not give LLMs direct MyTrainX Supabase or Google Drive credentials.

## First agent

Create runtime agent:

`coach_x`

Coach X is the single primary visible Personal AI Trainer. Axel/Luna/Pulse/Vita begin as specialist skills/modes inside X, not independent memory silos.

## First MyTrainX tool endpoints already implemented

MyTrainX exposes:

- `GET /api/internal/agent/profile` — scope `profile:read`
- `GET /api/internal/agent/entitlements` — scope `entitlements:read`
- `GET /api/internal/agent/current-program` — scope `program:read`
- `GET /api/internal/agent/today-workout` — scope `workout:read`
- `GET /api/internal/agent/progress-summary` — scope `progress:read`

Base production product URL: `https://mytrainx.fit`

## Service authentication

Use a server-only shared secret:

`MYTRAINX_AGENT_SHARED_SECRET`

Request headers:

```
x-mtx-service: atendimento-center
x-mtx-user-id: <Supabase auth UUID>
x-mtx-timestamp: <unix seconds>
x-mtx-scope: <space/comma separated scopes>
x-mtx-request-id: <unique request ID>
x-mtx-signature: <hex HMAC-SHA256>
```

Sort scopes lexically and join with one space.

Canonical string:

```
<METHOD>
<PATHNAME>
<SERVICE>
<USER_ID>
<TIMESTAMP>
<SORTED_SCOPES>
<REQUEST_ID>
```

Signature:

`hex(HMAC-SHA256(shared_secret, canonical_string))`

The MyTrainX side rejects timestamp drift >90 seconds, invalid service, missing scope and invalid signature.

The MyTrainX Vercel secret and Atendimento.Center VPS secret must be identical, but never expose the value to browser, model or repository.

## Minimum Agent Core API

Implement product-agnostic conversation endpoints comparable to:

```
POST /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations/{conversationId}
POST /api/v1/agents/{agent}/conversations/{conversationId}/messages
POST /api/v1/agents/{agent}/conversations/{conversationId}/cancel
```

The message endpoint must stream with SSE.

Initial events:

- run.started
- message.started
- response.delta
- tool.started
- tool.completed
- response.completed
- handoff.required
- error

## Memory architecture

Keep separate:

1. thread context — Atendimento.Center
2. durable operational memory — Atendimento.Center
3. authoritative MyTrainX profile/program/progress — MyTrainX tools only
4. entitled content/knowledge retrieval — MyTrainX tools only

Do not automatically promote every message into permanent memory.

## Existing stack

- Chatwoot = human inbox/handoff
- Evolution = WhatsApp pilot transport
- Typebot = deterministic forms/onboarding
- N8n = lifecycle/event automation

None of these replaces the Agent Runtime or Conversation Store.

## First acceptance test

A logged-in MyTrainX member asks in `/app/trainer`:

> Qual meu treino hoje?

Required flow:

```
MyTrainX
→ authenticated user UUID
→ Atendimento.Center Agent Gateway
→ coach_x
→ signed get_today_workout tool request
→ MyTrainX Internal API
→ Supabase
→ tool result
→ model
→ SSE
→ MyTrainX UI
```

Acceptance:
- answer comes from real authorized data;
- no hardcoded workout;
- conversation persists;
- AgentRun and tool call are traceable;
- cancellation works;
- cross-user substitution is impossible from the model;
- no direct database access.

## What you must return to the MyTrainX team

Before C1 integration, provide:
1. staging/base URL
2. auth configuration method
3. Agent Registry schema
4. conversation/message API schemas
5. SSE event contract
6. error contract
7. tool registration config
8. memory schema/write policy
9. AgentRun observability schema
10. deployment/test instructions

Read the canonical MyTrainX handoff:
`docs/handoff/ATENDIMENTO-CENTER-MYTRAINX-HANDOFF-V1.md`


## Human team update — Micaela

Micaela is a verified real human MyTrainX team member focused on Digital, Store, Communication & Support. Do not add a separate Micaela AI agent in B1/C1. Use human handoff/Chatwoot for her operational domain until an assisted runtime is explicitly approved.
