# Architecture Analysis — Atendimento.Center as MyTrainX Agent Hub

**Analysis date:** 2026-09-24  
**Document version:** 1.0  
**Status:** REVIEWED / ADOPTED AS DIRECTION  
**Source:** Atendimento.Center architecture audit supplied to the MyTrainX project.

## Executive outcome

Atendimento.Center is technically a strong base for the MyTrainX Agent Hub, but it does not yet have the production Agent Runtime needed by MyTrainX.

Existing useful infrastructure includes:
- multi-tenancy/auth
- NestJS API
- Next.js admin/frontend
- Chatwoot
- Evolution/Baileys
- Redis
- PostgreSQL
- Typebot/Flow Engine
- basic OpenRouter integration
- human conversation APIs

Missing central capabilities include:
- Agent Gateway
- Agent Runtime
- Agent Registry
- streaming
- tool calling
- cross-channel identity resolution
- long-term agent memory
- RAG
- event architecture
- queue/workers
- usage/observability
- full handoff manager

## Adopted architecture

```
MyTrainX
  owns product/domain/data
       |
       v
MyTrainX Internal API
       ^
       | approved tools
       |
Atendimento.Center
  owns agents/conversations/channels/runtime
```

Do not implement a second Agent Runtime inside MyTrainX.

## First vertical slice

```
MyTrainX /app/trainer
  -> MyTrainX authenticated backend
  -> short-lived service/agent token
  -> Atendimento.Center Agent Gateway
  -> Trainer X
  -> get_today_workout
  -> MyTrainX Internal API
  -> Supabase
  -> SSE response
```

## Multi-agent direction

Visible user persona:
- X / Trainer X

Internal skills:
- training
- recovery
- general nutrition information
- motivation
- programs/performance

Separate agents when permission/domain isolation is useful:
- Support Agent
- Community Agent

## Identity

Canonical user identity is the MyTrainX Supabase UUID.

Email, phone, WhatsApp JID, Chatwoot contact and browser IDs are external identities linked to that canonical user.

Unknown/unverified WhatsApp identities operate as prospect/anonymous mode and cannot access private fitness/account data.

## Memory

Three layers:

1. MyTrainX facts in Supabase
2. conversation/run state in Atendimento.Center
3. selective long-term operational memory in Atendimento.Center

Sensitive medical facts should not be indiscriminately persisted.

## Knowledge/RAG

MyTrainX owns the knowledge store. Entitlement authorization must occur before premium chunks are retrieved.

Agent:
`search_library -> MyTrainX Knowledge API -> entitlement filter -> vector retrieval`

## Channels

- MyTrainX WebChat: native MyTrainX UI, not Chatwoot widget
- initial streaming: SSE
- WhatsApp pilot: Evolution/Baileys possible
- commercial WhatsApp 1:1: official Meta path preferred
- large Communities must not be a critical platform dependency

## Queue/events

Redis already exists in Atendimento.Center. BullMQ/application workers are the proposed next layer.

n8n is suitable for operational/marketing workflows, not the core transactional event bus.

## Architecture implication

The hard product problems are not merely LLM calls. Priority engineering concerns are:
- identity
- authorization
- tool security
- memory
- event reliability
- entitlement-aware RAG
- channel synchronization
- observability
