# MyTrainX Creative Workstream

**Status:** ACTIVE IN PARALLEL  
**Started:** 2026-09-24

This workstream can run independently from product/backend engineering.

## Scope

- brand identity
- logo system
- favicon/app icon
- typography
- colors
- image direction
- Command Center
- Trainer X WebChat
- program cards
- WKT visual identity inside MyTrainX
- landing pages
- paid traffic creatives
- social media identity
- profile/banner assets
- launch visual calendar
- persona identity system
- AI character profiles
- community/social persona behavior

## Persona system

Canonical persona documentation lives in:

`docs/creative/personas/`

Current v0.1 team:

- **Sara** — real human Concierge & Community; reception, subscriptions, onboarding, support, communication and community; may also have an AI-assisted Atendimento.Center instance
- **X / Coach X** — central Personal Trainer AI
- **Axel** — Strength Coach
- **Luna** — Transformation Coach
- **Pulse** — Endurance Coach
- **Vita** — Recovery Coach

Read:

- `personas/README.md`
- `personas/PERSONA-BLUEPRINT-v0.1.md`
- `personas/CHANNEL-ROUTING-v0.1.md`
- `personas/personas.v0.1.json`

Sara is a real human team member and must use only verified biography/identity information. X and the specialist coaches are AI personas. Atendimento.Center may run a Sara-assisted instance, but automation and direct human attendance must remain operationally distinguishable.

## Handoff rule

Creative exploration does not silently become engineering specification.

When a visual is approved:
1. export it;
2. name it using the asset convention;
3. record it in `ASSET-REGISTER.md`;
4. mark status APPROVED;
5. state which UI surface it governs.

Persona behavior follows the same principle: a creative profile does not silently become a production prompt. Atendimento.Center owns operational agent prompt/version/runtime implementation.

## Design separation

Global MyTrainX:
- premium
- technological
- performance
- AI-centric

WKT:
- may retain military/mission language

Do not spread military terminology across unrelated MyTrainX modules.

## Approved brand-color direction

The primary visual direction is now:

> **BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE**

The previous neon-green system is **SUPERSEDED — STRUCTURE REFERENCE**. Preserve its strong Command Center hierarchy, but do not retain green as the primary brand identity. Semantic success green remains allowed.

The full implementation source of truth is the versioned visual system and GPT Work handoff under `docs/design/` and `docs/handoff/`.
