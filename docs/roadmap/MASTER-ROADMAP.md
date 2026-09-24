# MyTrainX Master Development Roadmap

**Roadmap version:** 1.0  
**Reviewed:** 2026-09-24

## Track A — MyTrainX Product/Data

### A0 — Bootstrap
Status: VALIDATED

### A1 — Supabase Domain Foundation
Status: PLANNED
Deliver:
- schema
- RLS
- Auth
- products/orders/entitlements
- programs/workouts/progress
- WKT seed
- generated TS types

### A2 — Internal Agent API
Status: PLANNED
Deliver initial read tools:
- profile
- entitlements
- today workout
- progress

## Track B — Atendimento.Center Agent Platform

### B0 — Normalize architecture
Status: PLANNED

### B1 — Agent Core
Status: PLANNED
Deliver:
- Agent Registry
- Model Gateway
- Agent Runtime
- Conversation Store
- SSE
- tool execution contract
- minimal usage ledger

## Track C — Integration

### C1 — Trainer X Vertical Slice
Status: PLANNED

Acceptance:
Authenticated member asks “Qual meu treino hoje?” and receives a streamed response based on authorized real data.

### C2 — Identity + Memory
Status: PLANNED

### C3 — Knowledge/RAG
Status: PLANNED

### C4 — WhatsApp 1:1
Status: PLANNED

### C5 — Human Handoff
Status: PLANNED

### C6 — Events/Proactive
Status: PLANNED

### C7 — Community Agent
Status: FUTURE / HIGH EXTERNAL RISK

### C8 — Scale & Observability
Status: CONTINUOUS

## Track D — Creative / Go-to-market

Runs in parallel and does not block foundational backend work.

Deliverables:
- visual identity
- logo/favicon/app icon
- Command Center mockups
- Trainer chat mockups
- program visual system
- landing/sales creative
- social media identity
- launch content system

Engineering consumes only assets explicitly marked APPROVED in the asset register.
