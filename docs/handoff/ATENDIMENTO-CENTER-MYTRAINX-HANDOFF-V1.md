# Atendimento.Center — MyTrainX Agent Platform Handoff V1

**Date:** 2026-09-25  
**Audience:** GPT/engineering instance responsible for Atendimento.Center  
**Status:** IMPLEMENTATION BRIEF

## Context

MyTrainX is an AI-first fitness ecosystem. It owns product/domain data, content access, programs, progress, commerce and the user-facing product.

Atendimento.Center must become the reusable **Agent & Conversation Platform** for MyTrainX and future products.

Do not rebuild MyTrainX inside Atendimento.Center.

## Ownership

### Atendimento.Center owns

- Agent Registry
- AgentVersion
- versioned system prompts
- Model Gateway / provider credentials
- Agent Runtime
- Conversation Store
- AgentRun / tool-call trace
- operational long-term memory
- tool permission registry
- SSE streaming
- channel identity links
- WhatsApp routing
- Chatwoot / human handoff
- usage/cost/latency observability

### MyTrainX owns

- Supabase user/profile
- products/orders/entitlements/subscriptions
- programs/workouts/progress
- content/library/recipes
- content access policy
- MyTrainX Internal API
- product UI
- Coach X product/persona definition

## Infrastructure direction

The existing Atendimento.Center VPS is the preferred home for:
- Agent Runtime;
- conversation/memory services;
- channel workers;
- optional asynchronous content-ingestion workers.

MyTrainX does **not** require a second generic VPS backend for MVP.

## First required API contract

Atendimento.Center should expose a product-agnostic Agent Gateway similar to:

```
POST /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations/{conversationId}
POST /api/v1/agents/{agent}/conversations/{conversationId}/messages
POST /api/v1/agents/{agent}/conversations/{conversationId}/cancel
```

Message endpoint must support SSE.

Initial event vocabulary:
- run.started
- message.started
- response.delta
- tool.started
- tool.completed
- response.completed
- handoff.required
- error

## Coach X runtime

Create initial agent:

`coach_x`

The agent runtime receives an authenticated MyTrainX integration context. It must **never trust a user_id supplied by model output**.

Initial allowed MyTrainX tools:

- get_user_profile
- get_entitlements
- get_current_program
- get_today_workout
- get_progress_summary

Later:
- search_library
- get_content_item
- get_owned_resources
- search_recipes
- get_program_materials
- get_upcoming_events

## Tool security

Required flow:

```
Coach X
 -> Atendimento.Center Tool Registry
 -> Tool Runner
 -> signed short-lived MyTrainX integration context
 -> MyTrainX Internal API
 -> authorization / entitlement check
 -> Supabase / Knowledge Layer
```

Never give the model direct Supabase credentials, unrestricted HTTP access or raw Drive credentials.

## Memory model

Keep four concepts distinct.

1. **Thread context** — current conversation.
2. **Operational durable memory** — useful conversational preferences/context.
3. **MyTrainX structured profile** — authoritative product/fitness facts; read/write only through MyTrainX tools.
4. **Knowledge retrieval** — entitled MyTrainX content.

Implement a memory-candidate policy rather than automatically promoting every user sentence into permanent memory.

## Prompt architecture

Avoid one giant prompt.

Compose at runtime:

1. platform/safety policy;
2. MyTrainX product identity;
3. Coach X persona;
4. locale;
5. authorized user context;
6. current program context;
7. retrieved knowledge;
8. channel policy;
9. current task.

Model/provider API keys belong here in Atendimento.Center. The MyTrainX Vercel app should not require `OPENAI_API_KEY` for Coach X.

## Specialist strategy

Axel, Luna, Pulse and Vita should begin as internal skills/modes invoked by Coach X, sharing the same user context and conversation.

Do not create separate long-term memory silos unless a later requirement justifies fully separate agents.

## Human team

### Sara

Sara is a real human MyTrainX **Concierge & Community** person.

Primary domains:
- reception;
- welcome/onboarding;
- community;
- relationship;
- human handoff.

Atendimento.Center may later expose an AI-assisted `sara_concierge` runtime for continuity, but logs and user-facing truthfulness must distinguish:
- direct human Sara;
- AI-assisted Sara;
- deterministic automation.

### Micaela

Micaela is a second real human MyTrainX team member focused on **Digital, Store, Communication & Support**.

Primary domains:
- digital operations;
- store/product discovery;
- campaign communication;
- product/access support;
- social/digital communication.

Micaela does not require a standalone AI agent for B1/C1. A future assisted runtime such as `micaela_digital` should only be introduced if operational volume justifies it and must preserve the same human-vs-automation truthfulness rule.

Chatwoot remains the human inbox/handoff surface for both Sara and Micaela.

## Existing stack

- Chatwoot: human support/handoff
- Evolution: WhatsApp pilot transport
- Typebot: deterministic forms/onboarding/qualification
- N8n: lifecycle/event automation

None of these replaces Agent Runtime or Conversation Store.

## First acceptance test

A logged-in MyTrainX member opens `/app/trainer` and asks:

> Qual meu treino hoje?

Expected flow:

```
MyTrainX WebChat
 -> MyTrainX validates session
 -> signed integration context
 -> Atendimento.Center Agent Gateway
 -> coach_x
 -> get_today_workout
 -> MyTrainX Internal API
 -> Supabase
 -> tool result
 -> model response
 -> SSE
 -> MyTrainX WebChat
```

Acceptance:
- real authorized workout context;
- no hardcoded answer;
- cross-user substitution fails;
- streaming visible;
- conversation persisted;
- AgentRun/tool trace available;
- cancellation works;
- no direct DB access from model/runtime.

## What to return to the MyTrainX team

Before integration, publish:
1. base URL / service discovery method;
2. auth/signing contract;
3. conversation/message API schemas;
4. SSE event schema;
5. error model;
6. agent registry schema;
7. tool registration schema;
8. memory storage/write policy;
9. observability/run trace structure;
10. local/staging test instructions.


## Implemented MyTrainX Internal API contract — V1

The MyTrainX side now implements read-only internal endpoints:

```
GET /api/internal/agent/profile
GET /api/internal/agent/entitlements
GET /api/internal/agent/current-program
GET /api/internal/agent/today-workout
GET /api/internal/agent/progress-summary
```

Required scopes respectively:

```
profile:read
entitlements:read
program:read
workout:read
progress:read
```

### Signed request headers

Atendimento.Center must send:

```
x-mtx-service: atendimento-center
x-mtx-user-id: <Supabase auth user UUID>
x-mtx-timestamp: <unix seconds>
x-mtx-scope: <space/comma separated scopes>
x-mtx-request-id: <unique request id>
x-mtx-signature: <hex HMAC-SHA256>
```

Both systems share a server-only secret:

```
MYTRAINX_AGENT_SHARED_SECRET
```

The secret must exist in Vercel/MyTrainX server environment and in the Atendimento.Center server environment. Never expose it to the browser or model.

### Canonical signature string

Sort scopes lexically and join them with a single space, then sign:

```
<METHOD>
<PATHNAME>
<SERVICE>
<USER_ID>
<TIMESTAMP>
<SORTED_SCOPES>
<REQUEST_ID>
```

Example conceptual canonical value:

```
GET
/api/internal/agent/today-workout
atendimento-center
550e8400-e29b-41d4-a716-446655440000
178...
entitlements:read workout:read
req_...
```

Signature:

```
hex(HMAC-SHA256(MYTRAINX_AGENT_SHARED_SECRET, canonical_string))
```

MyTrainX rejects:
- malformed headers;
- services other than the configured service;
- timestamp drift greater than 90 seconds;
- missing required scope;
- invalid signatures.

V1 endpoints are read-only. Before adding mutation tools, introduce stronger replay/idempotency handling for request IDs.

### today-workout behavior

The WKT schedule is not yet persisted in `program_days`, so `today-workout` currently returns an explicit mode:

- `no_active_program`
- `next_available`
- `program_complete`

It must not pretend there is a calendar-derived “today” workout until the schedule model is populated.
