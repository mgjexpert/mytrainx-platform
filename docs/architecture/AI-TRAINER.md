# MyTrainX AI Trainer Architecture

## Product identity

Product: **MyTrainX AI**

Assistant persona/name: **X**

The AI is the central MyTrainX experience, not a decorative chatbot.

## Context sources

X may access only authorized data for the signed-in member:

- profile/goals
- equipment/preferences
- entitlements
- active programs
- today's mission
- completed workouts
- progress summary
- owned library content
- upcoming eligible events

## Tool contract

Initial server-side tools:

- get_user_profile
- get_entitlements
- get_current_program
- get_today_mission
- get_workout_history
- get_progress_summary
- search_library
- get_upcoming_events

Every tool must derive user identity from the verified server session. Never accept arbitrary user_id from the model as authorization.

## Chat architecture

```
Browser/PWA
  -> /api/ai/chat
  -> verify Supabase user
  -> check AI entitlement/usage tier
  -> load minimal context
  -> model
  -> tool calls
  -> Supabase RLS/server query
  -> streamed answer
```

WhatsApp later:

```
WhatsApp Cloud API
  -> webhook
  -> map verified phone/account
  -> same AI service + same tool layer
```

Do not build a second AI brain for WhatsApp.

## Memory

Persist:

- non-sensitive training goals
- available equipment
- preferred days/times
- owned/active program state
- completed sessions
- user-selected preferences

Avoid storing by default:

- diagnoses
- detailed medical records
- medication history
- highly sensitive health data

## Safety

X is a fitness/training assistant.

Allowed:
- explain training content
- help with consistency
- general exercise information
- help organize schedule
- suggest owned workouts according to program logic
- general recovery/rest guidance

Escalate/limit:
- pain
- suspected injury
- medical symptoms
- eating disorder signals
- unsafe rapid weight-loss requests
- medication/supplement treatment questions requiring medical judgment

X must not present itself as a doctor or physiotherapist.

## Membership tiers

Basic:
- limited daily usage
- program navigation
- basic progress summaries

Master:
- expanded messages
- richer context/tools
- premium library search
- challenges/events integration
- future WhatsApp access
