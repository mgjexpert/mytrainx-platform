# Atendimento.Center — Coach X Go-Live Checklist

**Date:** 2026-10-18  
**MyTrainX status:** READY ON MAIN / EXTERNAL TOKEN PENDING

## Already implemented on MyTrainX

- authenticated member Coach X surface;
- authenticated `/api/coach-x`;
- configurable Atendimento.Center base URL;
- current + legacy ENV aliases;
- conversation creation;
- message forwarding;
- SSE pass-through;
- MyTrainX domain tools:
  - profile;
  - entitlements;
  - current program;
  - today workout;
  - Progress summary;
  - Library knowledge;
  - exercise;
  - recipe;
- knowledge rights/review/retrieval gates;
- user identity comes from authenticated MyTrainX context.

## Current production ENV state

Present:
- `ATENDIMENTO_AGENT_BASE_URL`

Missing:
- `ATENDIMENTO_AGENT_TOKEN`
- `ATENDIMENTO_CENTER_AGENT_TOKEN`

One real token is sufficient using the supported alias chosen by the Atendimento.Center deployment.

## Do not do

- do not invent a token;
- do not store a plaintext token in Git;
- do not create a second MyTrainX agent runtime to bypass Atendimento.Center;
- do not expose Supabase service credentials to the agent runtime;
- do not allow user-supplied user IDs to select another member's context.

## Go-live sequence

1. Obtain the real production agent token from Atendimento.Center.
2. Store it in Vercel as a **sensitive** variable:
   - preferred: `ATENDIMENTO_CENTER_AGENT_TOKEN`
   - legacy-compatible: `ATENDIMENTO_AGENT_TOKEN`
3. Confirm the configured base URL is the intended production runtime.
4. Deploy `main`.
5. Use a logged-in test member with:
   - an active program;
   - at least one incomplete workout;
   - Progress data where possible.
6. Ask:
   > Qual meu treino hoje?
7. Verify:
   - request reaches Atendimento.Center;
   - MyTrainX identity is server-derived;
   - `today-workout` tool uses the correct user;
   - answer streams back via SSE;
   - no cross-user data appears.
8. Ask a Library question and verify only review-cleared knowledge is retrieved.
9. Ask about a pending scientific item and verify blocked knowledge is not silently retrieved.
10. Confirm conversation/run persistence in Atendimento.Center.
11. Repeat with a second account for cross-user isolation.
12. Verify mobile and desktop.

## Acceptance criteria

C1 can be closed only when:

- [ ] token is configured as sensitive;
- [ ] production runtime responds;
- [ ] real domain tool call succeeds;
- [ ] SSE stream completes;
- [ ] conversation persists;
- [ ] cross-user test passes;
- [ ] review-gated knowledge remains blocked;
- [ ] runtime error logs are clean.

## Rollback

If the external runtime fails, MyTrainX should retain:
- member application access;
- Library;
- Programs;
- Progress.

Coach X may show a runtime-unavailable state; it must not fabricate live context.
