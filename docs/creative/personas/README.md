# MyTrainX Personas

**Version:** 0.1.0  
**Status:** IN REVIEW  
**Created:** 2026-09-24  
**Last reviewed:** 2026-09-24  
**Owner:** Creative / Brand + Architecture & Integration  
**Related tracks:** Track D — Creative / Go-to-market; Track B — Agent Platform; Track C — Integration

This folder is the source of truth for the visible MyTrainX personas and their operational boundaries.

## Canonical team

| Persona | Public role | Internal role | Primary surfaces |
|---|---|---|---|
| **Sara** | Concierge & Community | Real human reception, onboarding, community and relationship layer, with an optional AI-assisted instance in Atendimento.Center | WhatsApp, Web, App, Facebook, Instagram, communities |
| **Micaela** | Digital, Store, Communication & Support | Real human digital/commerce communication layer for store, campaigns, product access and digital support | Web, Store, support, social, campaigns, App |
| **X / Coach X** | Your Personal AI Trainer | Main fitness orchestration persona | App, WebChat, member area |
| **Axel** | Strength Coach | Strength, hypertrophy, gym progression | App, community, social content |
| **Luna** | Transformation Coach | Consistency, lifestyle, general weight-management support | App, community, social content |
| **Pulse** | Endurance Coach | Running, cardio, conditioning, endurance | App, community, social content |
| **Vita** | Recovery Coach | Mobility, recovery, general wellness | App, community, social content |

## Required documents

- [PERSONA-BLUEPRINT-v0.1.md](./PERSONA-BLUEPRINT-v0.1.md) — narrative, visual, behavioral and product blueprint.
- [CHANNEL-ROUTING-v0.1.md](./CHANNEL-ROUTING-v0.1.md) — ownership, handoffs and routing by intent/channel.
- [personas.v0.1.json](./personas.v0.1.json) — machine-readable seed for Agent Registry / CMS / design tooling.

## Fundamental rule

**Sara and Micaela are real people and verified human team members.** X, Axel, Luna, Pulse and Vita are AI personas. The Atendimento.Center may also run an AI-assisted Sara instance for reception continuity, but the system must distinguish automated Sara responses from direct human attendance in logs and operational state.

AI persona biographies, ages, cities and curiosities are narrative design devices used for consistency. Sara's and Micaela's real biographies must never be invented: only verified information supplied by the Product Owner may be published. AI personas must not fabricate real-world actions, credentials or physical presence.

## Product hierarchy

```
MyTrainX
├── Human layer
│   ├── Sara — reception / concierge / onboarding / community
│   └── Micaela — digital / store / communication / support
└── X — personal fitness intelligence
    ├── Axel — strength
    ├── Luna — transformation & consistency
    ├── Pulse — endurance
    └── Vita — recovery
```

**Simple operating principle:**

> Sara acolhe. Micaela liga o digital, a loja e a comunicação. X cuida do treino. Os especialistas aprofundam cada disciplina.

## Implementation boundary

The persona definition belongs to MyTrainX product/creative documentation. Agent prompt versions, runtime, tool orchestration, channel routing and operational memory remain owned by Atendimento.Center according to repository governance.

No persona receives direct unrestricted database access. MyTrainX data is accessed only through approved tools and the authenticated MyTrainX Internal API.
