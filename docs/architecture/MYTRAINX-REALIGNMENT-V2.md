# MyTrainX Architecture Realignment V2

**Date:** 2026-09-24  
**Status:** PROPOSED / IMPLEMENTATION ORDER APPROVED FOR REVIEW  
**Scope:** product, AI, memory, programs, knowledge/library, commerce, Atendimento.Center integration

## 1. North Star

MyTrainX is an **AI-first digital fitness ecosystem**.

The product is not:
- only WKT Militar;
- only a chatbot;
- only a media library;
- a local gym website.

The intended experience combines:

1. Coach X — persistent conversational training relationship;
2. structured programs — WKT Militar first;
3. Library & Knowledge — ebooks, recipes, manuals, videos, articles and program materials;
4. real profile/progress context;
5. Community;
6. MyTrainX Master;
7. Sara / human support and relationship layer.

## 2. Target architecture

```
User
  -> MyTrainX Web/PWA/WhatsApp entry
  -> MyTrainX session / identity
  -> Atendimento.Center Agent Gateway
  -> Agent Runtime / Coach X
  -> approved tools
  -> MyTrainX Internal API
  -> authorization / entitlements
  -> Supabase domain data
  -> Knowledge retrieval / media metadata
  -> Drive / PDFs / videos / recipes

Atendimento.Center
  -> Chatwoot / Sara / human handoff
  -> channel routing
  -> conversation store
  -> operational memory
```

## 3. Ownership boundary

### MyTrainX owns

- identity/profile;
- products;
- programs/workouts;
- progress;
- orders/entitlements/subscriptions;
- content/library metadata;
- recipes;
- knowledge access policy;
- Internal Agent API;
- product UI.

### Atendimento.Center owns

- Agent Registry;
- prompt/model versions;
- Agent Runtime;
- Conversation Store;
- operational long-term memory;
- tool runner;
- SSE;
- channel identity links;
- human handoff orchestration;
- usage/observability.

### Important

Agents never receive unrestricted direct Supabase or Drive access.

```
Agent -> approved tool -> MyTrainX API -> authorization -> domain/knowledge
```

## 4. Memory model

Memory is explicitly layered.

### Conversation memory
Thread context and summaries.

Owner: Atendimento.Center.

### Operational durable memory
Communication preferences, recurring constraints and user-stated context suitable for future conversations.

Owner: Atendimento.Center.

### Structured domain profile
Authoritative goals/preferences, owned products, program state, progress and workout history.

Owner: MyTrainX/Supabase.

### Knowledge retrieval
Entitlement-aware program/library knowledge.

Owner: MyTrainX Knowledge Layer.

The model must not promote arbitrary chat text directly into authoritative profile facts.

## 5. Content & Knowledge

Drive remains acceptable as an MVP media provider, but folder/file placement is not the domain model.

Introduce a canonical content registry supporting:

- workout video;
- educational video;
- ebook/PDF;
- manual;
- recipe;
- article;
- checklist;
- program material;
- event/live;
- audio/image.

Recommended content fields:

```
content_id
slug
title
content_type
language
summary
tags
source_provider
source_external_id
source_url
media_url
thumbnail
transcript_status
extraction_status
ai_index_policy
access_policy
product_ids
master_required
published_status
version
```

AI retrieval must enforce the same access rights as the product.

## 6. Ingestion pipeline

```
Drive / PDF / Video / Recipe
  -> Content Registry
  -> extraction/transcription
  -> normalization + metadata
  -> chunk/index
  -> entitlement-aware retrieval
  -> search_library / search_recipes / get_program_materials
  -> Coach X
```

## 7. Coach X prompt architecture

Do not maintain one giant static prompt.

Compose:

1. platform/safety policy;
2. MyTrainX product identity;
3. Coach X persona;
4. locale;
5. authorized structured user context;
6. current program context;
7. retrieved knowledge;
8. channel policy;
9. current task.

Coach X remains the primary visible training persona.

Axel, Luna, Pulse and Vita should initially be skills/modes under X rather than independent memory silos.

## 8. Atendimento.Center minimum requirements

### Agent Registry
- agent;
- version;
- system prompt;
- model policy;
- allowed tools;
- safety policy;
- memory policy;
- channel policy;
- status.

### Agent Runtime
- create conversation;
- send message;
- stream;
- tool calls;
- cancel;
- retry/error state;
- trace.

### Conversation Store
- threads/messages;
- summaries;
- run metadata;
- MyTrainX identity link;
- channel;
- handoff state.

### Memory
- thread memory;
- durable operational memory;
- memory candidate/write policy;
- retrieval.

### Tool Runner
- explicit permissions per agent/version;
- signed MyTrainX integration context;
- schema validation;
- tracing;
- timeout/retry.

### SSE events
- run.started
- message.started
- response.delta
- tool.started
- tool.completed
- response.completed
- handoff.required
- error

## 9. MyTrainX agent tools

### Phase 1 — core context

- get_user_profile
- get_entitlements
- get_current_program
- get_today_workout
- get_progress_summary

### Phase 2 — knowledge

- search_library
- get_content_item
- get_owned_resources
- search_recipes
- get_program_materials
- get_upcoming_events

### Phase 3 — safe actions

- save_training_preference
- record_coach_note with strict schema
- request_human_handoff

## 10. Current implementation reality

### Present

- Next.js 16/App Router shell;
- Vercel deployment;
- Orange visual system;
- Supabase SSR/auth scaffolding;
- public/member routes;
- WKT 21-workout hardcoded catalogue;
- verified Drive playback;
- XPayments integration scaffolding;
- payment webhook entitlement concept;
- Coach X UI preview;
- placeholder Library, Community and Master;
- persona/brand documentation.

### Not yet validated end-to-end

- production Supabase domain schema/RLS;
- orders/entitlements against the real project;
- entitlement gating;
- WKT progress persistence;
- current-program schedule/state;
- real Agent Runtime;
- SSE WebChat;
- conversation persistence;
- durable memory;
- Internal Agent API;
- content ingestion/RAG;
- recipe catalogue;
- production library;
- Master product model.

## 11. Revised execution order

### Foundation A — Domain
Supabase schema/RLS + WKT/content seed.

### Foundation B — Internal API
Typed authorized domain tools.

### Foundation C — Atendimento.Center Agent Core
Runtime, conversations, memory, SSE and tool runner.

### Milestone 1 — Coach X vertical slice
Authenticated member asks “Qual meu treino hoje?” and receives streamed real authorized data.

### Milestone 2 — Knowledge
Content inventory + ingestion + entitlement-aware search_library.

### Milestone 3 — WKT commercial/product loop
Payment -> entitlement -> catalogue -> progress -> Coach X context.

### Milestone 4 — Recipes and educational library
Structured content + AI discovery.

### Milestone 5 — Durable personalization
Memory candidates + structured preferences + retrieval.

### Milestone 6 — Channels and human layer
Sara, Chatwoot, WhatsApp and lifecycle automation.

### Milestone 7 — Master
Recurring access using already-proven platform capabilities.

## 12. Immediate P0 work

1. validate dedicated MyTrainX Supabase project access;
2. implement/version A1 schema and RLS;
3. seed WKT program/workout data from verified IDs;
4. create content registry schema;
5. define Internal Agent API contracts;
6. prepare Atendimento.Center B1 implementation contract;
7. build first Coach X vertical slice;
8. inventory real Drive/library material without inventing catalogue entries.

## 13. Project operating system

GitHub remains the technical source of truth.

A Notion workspace has been created as the strategic/operational project OS, including:
- Genesis;
- architecture;
- AI/memory/prompts;
- content/knowledge;
- commerce;
- personas;
- brand/media;
- Atendimento.Center requirements;
- data/security;
- go-to-market;
- realignment roadmap;
- roadmap database;
- content registry;
- persona registry;
- architecture decision log;
- media asset registry.


## 14. Backend deployment decision

A separate general-purpose MyTrainX backend on the VPS is **not required for the MVP**.

Use:
- Vercel / Next.js Route Handlers for MyTrainX synchronous Internal API endpoints;
- Supabase for auth, relational domain state, RLS and entitlements;
- Atendimento.Center on VPS for long-running Agent Runtime, conversations, memory, channel connections and human handoff;
- an optional worker service on the Atendimento.Center VPS for asynchronous ingestion/transcription/indexing jobs when E2 starts.

Do not move MyTrainX domain authorization into the VPS. The VPS services call the MyTrainX Internal API through signed service context.

### mytrainx-data repository

`mgjexpert/mytrainx-data` is reserved for:
- content manifests and source inventories;
- structured recipe/content seed datasets;
- ingestion scripts and schemas;
- knowledge chunk/index configuration;
- import/export tooling;
- non-secret dataset documentation.

Canonical database DDL/migrations stay in `mytrainx-platform/supabase/migrations` so schema and application contracts cannot drift.
