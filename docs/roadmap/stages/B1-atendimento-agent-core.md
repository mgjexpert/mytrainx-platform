# Stage B1 — Atendimento.Center Agent Core

**Status:** PLANNED  
**Owner:** Atendimento.Center Agent Platform workstream  
**Reviewer:** Architecture & Integration  
**Last reviewed:** 2026-09-24

## Deliver minimum runtime

- Agent Registry
- AgentVersion
- AgentPrompt
- AgentModelPolicy
- AgentTool permissions
- Agent Runtime
- Model Gateway abstraction
- Conversation Store
- AgentRun
- SSE streaming
- cancellation
- minimal Usage Ledger

## Initial public contract

```
POST /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations
GET  /api/v1/agents/{agent}/conversations/{conversationId}
POST /api/v1/agents/{agent}/conversations/{conversationId}/messages
POST /api/v1/agents/{agent}/conversations/{conversationId}/cancel
```

## Not in this stage

- full RAG
- full cross-channel memory
- Community Agent
- voice
- complex proactive workflows

## Acceptance

A test agent can:
1. create conversation;
2. stream response;
3. invoke one authorized test tool;
4. persist messages/run;
5. report usage;
6. cancel an active run.
