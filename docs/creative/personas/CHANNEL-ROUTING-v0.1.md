# MyTrainX Persona Routing & Handoff Matrix

**Version:** 0.1.0  
**Status:** IN REVIEW  
**Created:** 2026-09-24  
**Owner:** Architecture & Integration + Creative / Brand  
**Runtime owner:** Atendimento.Center  
**Related docs:** `PERSONA-BLUEPRINT-v0.1.md`

---

## 1. Objective

Define which visible persona owns each user intent, how handoffs occur and where human escalation is mandatory.

Routing should preserve conversation continuity and avoid exposing internal agent mechanics.

---

## 2. Primary ownership

| Intent | Primary persona | Secondary / handoff |
|---|---|---|
| New visitor / “what is MyTrainX?” | Sara | X if training-specific |
| Plans / subscription options | Sara | human support for exceptions |
| Checkout / payment status | Sara | authoritative payment tool / human |
| Refund / disputed payment | Sara | human support |
| Account access / platform help | Sara | human support if unresolved |
| Onboarding | Sara | X after goals/context captured |
| “What is my workout today?” | X | specialist when appropriate |
| General training plan explanation | X | specialist |
| Strength / hypertrophy | Axel | X |
| Weight-management support / adherence | Luna | X |
| Cardio / running / conditioning | Pulse | X |
| Mobility / recovery / readiness | Vita | X |
| Community announcement | Sara | coaches for technical content |
| Social media general reply | Sara | relevant coach |
| Medical diagnosis / acute symptoms | none | safe boundary + appropriate health professional |
| Legal / privacy request | Sara | human support / product owner as required |

---

## 3. Channel ownership

### Website public chat

Default entry: **Sara / Sara-assisted reception**

Sara determines whether the conversation is:

- commercial;
- support;
- account/platform;
- community;
- training.

Training intent moves to X.

### Logged-in app / `/app/trainer`

Default entry: **X**

The member entered a training-specific surface, so do not force an Sara greeting first.

Sara remains available through support/help.

### WhatsApp 1:1

Default entry: **Sara**

Reasons:

- WhatsApp commonly mixes support, commercial and product questions;
- identity and entitlement may need resolution;
- Sara is the relationship layer.

When training intent is clear and identity/context is resolved, Sara introduces X.

### Facebook / Instagram DMs

Default entry: **Sara**

Coaches can enter when the user asks a domain-specific fitness question.

### Public comments

Default author: **Sara · MyTrainX Team**

If the post is explicitly hosted by a coach, that coach may reply in-character.

### Community

- moderation/welcome/announcements → Sara;
- general fitness thread → X;
- specialty thread → specialist;
- unresolved conflict/account issue → Sara/human.

---

## 4. Handoff protocol

A handoff must include:

1. reason;
2. target persona;
3. minimum useful context;
4. authorization context if tools are required;
5. return path.

Example:

> Sara: “Essa parte já é de treino. Vou chamar o X e passar-lhe o contexto do teu objetivo para não teres de repetir tudo.”

Internal payload concept:

```json
{
  "from": "sara_concierge",
  "to": "coach_x",
  "reason": "training_intent",
  "conversation_context_ref": "...",
  "user_context_ref": "...",
  "locale": "pt-BR"
}
```

Do not copy sensitive data into free-form prompts when an authoritative context/tool reference exists.

---

## 5. Specialist invocation model

Preferred product behavior:

```
User <-> X
          |
          +--> Axel
          +--> Luna
          +--> Pulse
          +--> Vita
```

X remains responsible for the global training experience.

A specialist can:

- answer directly;
- recommend an adjustment;
- produce structured advice for X;
- host a dedicated specialty conversation.

The specialist should not silently replace the member’s main coach.

---

## 6. Sara routing logic

Route to X when intent includes:

- today’s workout;
- exercise choice;
- training plan;
- set/rep questions;
- progression;
- performance;
- training schedule.

Keep with Sara when intent includes:

- product;
- plan;
- subscription;
- payment;
- login;
- app navigation;
- membership/community;
- social/communications;
- general company information.

Route to human support for:

- disputed financial transaction;
- exceptional refund;
- account security issue;
- legal/privacy request;
- repeated tool/system failure;
- complaint requiring discretionary resolution.

---

## 7. X specialist logic

### Axel

Trigger themes:

- strength;
- gym;
- hypertrophy;
- progressive overload;
- sets/reps;
- exercise technique;
- resistance training.

### Luna

Trigger themes:

- adherence;
- getting back on track;
- sustainable transformation;
- busy routine;
- general weight-management support;
- motivation/consistency around training.

### Pulse

Trigger themes:

- running;
- cardio;
- pacing;
- conditioning;
- intervals;
- endurance.

### Vita

Trigger themes:

- mobility;
- general recovery;
- rest-day planning;
- training fatigue;
- readiness;
- sleep/recovery education.

---

## 8. Safety routing

The system must not route a medical concern to a persona as though it were ordinary coaching.

Examples requiring scope boundary:

- chest pain;
- fainting;
- severe shortness of breath;
- acute injury;
- sudden neurological symptoms;
- request for diagnosis;
- medication management.

The persona may provide high-level safety guidance and recommend appropriate professional help, but must not diagnose.

---

## 9. Locale routing

Persona ID remains unchanged.

Use one locale field:

- `pt-PT`
- `pt-BR`
- future: `en`, `es`

Do not create separate duplicate agents purely for language.

Example:

```
sara_concierge + locale=pt-PT
sara_concierge + locale=pt-BR
```

---

## 10. Social workflow

Recommended automation pipeline:

```
content idea
  -> Sara editorial orchestration
  -> relevant coach contribution
  -> brand/safety rules
  -> approval policy
  -> publish
  -> Sara monitors comments/DM
  -> coach routed when technical
  -> human escalated when required
```

At launch, autonomous publication should be governed by an explicit approval policy. Drafting, scheduling and low-risk FAQ/community responses can be progressively automated after validation.

---

## 11. Data boundary

Persona routing does not override repository ownership.

```
Persona / Agent
  -> approved Atendimento.Center tool
  -> MyTrainX Internal API
  -> authorization
  -> Supabase
```

No visible persona receives direct database credentials.

---

## 12. Logging

Every routed agent run should be traceable with:

- persona ID;
- persona version;
- locale;
- conversation/run ID;
- channel;
- authenticated identity reference where applicable;
- tool calls;
- handoff source/target;
- escalation outcome;
- model/provider version where runtime supports it.

---

## 13. Example journeys

### A. Instagram lead

1. User replies to a Reel: “Quanto custa?”
2. Sara answers from current plan data.
3. User asks whether program works for home training.
4. Sara introduces X.
5. X checks product/training context and answers.
6. Sara can return for checkout/subscription help.

### B. Member in App

1. Member opens `/app/trainer`.
2. X greets based on authenticated context.
3. Member asks how to gain strength.
4. X invokes Axel where useful.
5. Axel gives specialized guidance.
6. X retains overall plan ownership.

### C. Payment complaint

1. User contacts WhatsApp.
2. Sara checks authoritative transaction/subscription state.
3. If standard resolution exists, Sara explains/executes approved action.
4. If dispute/exception, Sara escalates to human support with context.

---

## 14. Acceptance tests

Before production routing:

- [ ] Sara correctly distinguishes support vs fitness intent.
- [ ] X handles the first C1 vertical slice.
- [ ] Handoffs preserve context.
- [ ] Locale changes do not alter persona identity.
- [ ] Payment status is never invented.
- [ ] Medical issues do not receive diagnosis.
- [ ] Social replies respect persona ownership.
- [ ] Human escalation path is visible and tested.
- [ ] Logs identify persona/version/channel.
