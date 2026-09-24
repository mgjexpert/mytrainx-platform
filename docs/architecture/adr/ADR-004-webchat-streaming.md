# ADR-004 — Native MyTrainX WebChat with SSE

**Status:** ACCEPTED  
**Decision date:** 2026-09-24

## Decision

`/app/trainer` is a native MyTrainX interface, visually integrated with the Command Center.

Do not use the Chatwoot widget as the Trainer X UI.

Initial server streaming uses SSE.

Expected event vocabulary:

- run.started
- message.started
- response.delta
- tool.started
- tool.completed
- response.completed
- handoff.required
- error

WebSocket/WebRTC can be introduced later for realtime voice/presence without changing the core textual agent contract.
