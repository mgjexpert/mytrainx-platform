# Current Project State

**Project version:** 0.3.0-orange-v1-kickoff  
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

### Track D — Creative / Product UI
**APPROVED DIRECTION / IMPLEMENTATION START**

Current primary visual direction:
- BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE
- previous neon-green system is structural reference only
- Coach X remains the central product
- Sara is the verified real human Concierge & Community layer
- specialist coaches remain AI personas

Implementation branch:
`feat/orange-visual-system-v1`

GPT Work must begin with the repository audit defined in:
`docs/handoff/MYTRAINX_GPT_WORK_VISUAL_DIRECTION_V1.md`

Reusable foundations and the public landing are now implemented on the orange branch. Command Center/shared public/member chrome has also been converted to the orange system. PR #10 remains Draft pending final preview review and connected-environment regression checks.

## Immediate visual milestone

On `feat/orange-visual-system-v1`, GPT Work must:

1. audit the current route/component tree;
2. document exact landing/app files and current constraints;
3. implement orange design tokens and reusable shared components;
4. evolve the real landing without breaking validated behavior;
5. validate desktop/mobile;
6. run typecheck/build and regression checks;
7. keep a dated implementation changelog.

## Immediate integration milestone

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
