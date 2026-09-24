# Stage C1 — Trainer X First Vertical Slice

**Status:** PLANNED  
**Owners:** MyTrainX Implementation + Atendimento.Center Agent Platform  
**Reviewer:** Architecture & Integration / Product Owner  
**Last reviewed:** 2026-09-24

## User story

As an authenticated MyTrainX member, I open `/app/trainer`, ask:

> Qual meu treino hoje?

and X answers using my real authorized program context.

## End-to-end flow

```
MyTrainX WebChat
 -> MyTrainX backend validates session
 -> integration token/context
 -> Atendimento.Center Agent Gateway
 -> Trainer X
 -> get_today_workout
 -> MyTrainX Internal API
 -> Supabase
 -> tool result
 -> model
 -> SSE
 -> MyTrainX UI
```

## Required UI

- conversation list
- new conversation
- streaming response
- tool activity state
- cancel
- retry/error state
- responsive mobile view

## Acceptance criteria

- no hardcoded workout answer
- no direct agent DB access
- cross-user access test fails safely
- streaming visible
- conversation persisted
- tool/run trace available
- mobile + desktop verified
