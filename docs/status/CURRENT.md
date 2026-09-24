# Current Project State

**Project version:** 0.2.0-docs  
**State date:** 2026-09-24  
**Overall status:** IN PROGRESS

## Product

MyTrainX is the parent fitness platform. The visible primary AI persona is **X — Your Personal AI Trainer**. WKT Militar is the first commercial training program.

## Repository

Primary:
`mgjexpert/mytrainx-platform`

Reference/legacy:
`mgjexpert/wkt-militar`

Current validated bootstrap commit before this documentation branch:
`be723ee3ddf9376b2cf08e5e686181d73621ded0`

CI on that main commit: successful.

## Current architecture decisions

- Next.js/PWA remains the MyTrainX product frontend.
- Supabase is the current selected MyTrainX database/auth/RLS platform.
- Vercel remains selected for the current Next.js deployment path.
- XPayments remains the PIX provider.
- Full WKT videos remain on Google Drive during MVP; dedicated video streaming remains a future migration.
- Atendimento.Center will evolve into the central Agent & Conversation platform.
- MyTrainX will NOT create a duplicate Agent Runtime.
- MyTrainX will expose an authenticated Internal Domain API to agent tools.
- WebChat UI belongs to MyTrainX; Chatwoot is not the Trainer X frontend.
- SSE is the initial streaming protocol for Trainer X WebChat.
- X is one main visible persona with skills; Support and Community can become separate agents.
- WhatsApp Evolution/Baileys can be used for pilots; commercial 1:1 should migrate toward official Meta infrastructure.
- WhatsApp Communities are not a critical product dependency.

## Active parallel tracks

### Track A — Product & Data
Next objective:
Supabase production foundation + domain schema/RLS.

### Track B — Agent Platform
Next objective:
Atendimento.Center Agent Core contract and runtime foundation.

### Track C — Integration
Next objective:
MyTrainX Internal API contract + first Trainer X vertical slice.

### Track D — Creative
Active in parallel:
brand identity, mockups, visual hierarchy, social media system and creative asset production.

## Immediate milestone

A logged-in user opens:

`/app/trainer`

and asks:

> Qual meu treino hoje?

X must:
1. receive the authenticated user context;
2. stream via Atendimento.Center;
3. invoke `get_today_workout`;
4. call MyTrainX Internal API;
5. receive real authorized MyTrainX data;
6. answer in streaming UI;
7. persist the agent conversation.

This is the first full-system integration milestone.
