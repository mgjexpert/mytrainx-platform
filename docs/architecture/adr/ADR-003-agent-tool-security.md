# ADR-003 — Agents Access MyTrainX Only Through Authorized Tools

**Status:** ACCEPTED  
**Decision date:** 2026-09-24

## Decision

No LLM/agent receives direct unrestricted database access.

```
Agent
 -> Tool Registry
 -> Tool Runner
 -> MyTrainX Internal API
 -> authenticated principal + authorization
 -> Supabase
```

## Mandatory rules

- model cannot choose arbitrary user_id
- current user/tenant comes from authenticated server context
- tool availability is server-configured per agent/version
- entitlement checks happen in MyTrainX
- premium knowledge authorization happens before retrieval
- mutating tools require explicit operation-level authorization
