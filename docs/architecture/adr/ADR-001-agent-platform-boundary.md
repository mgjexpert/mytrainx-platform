# ADR-001 — Atendimento.Center is the Agent Platform

**Status:** ACCEPTED  
**Decision date:** 2026-09-24  
**Last reviewed:** 2026-09-24

## Context

MyTrainX requires WebChat, agent tools, persistent conversations, future WhatsApp, human handoff, memory, multi-agent support and observability.

Atendimento.Center already has the surrounding omnichannel infrastructure but lacks the central Agent Runtime.

## Decision

Build the reusable Agent Runtime in Atendimento.Center.

MyTrainX must not build a second independent Agent Runtime.

MyTrainX owns domain data and exposes authorized internal APIs/tools.

## Consequences

Positive:
- one reusable agent platform
- shared channels and human handoff
- less duplicate memory/routing infrastructure
- reusable across future products

Constraints:
- requires explicit service contracts
- Atendimento.Center must remain product-domain agnostic
- MyTrainX availability cannot depend on undocumented direct DB access
