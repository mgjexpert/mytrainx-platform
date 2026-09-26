# MyTrainX Progress System V1

**Date:** 2026-09-26  
**Status:** IN PROGRESS  
**Track:** Product/Data + Coach X  
**Branch:** `feat/progress-system-v1`

## Product principle

MyTrainX Progress must answer one question:

> "Estou evoluindo de uma forma que consigo entender e sustentar?"

It must not become a daily-scale obsession, a pseudo-clinical diagnostic dashboard, or a collection of disconnected vanity metrics.

The product combines:

- training consistency;
- workout completion;
- weight trends;
- body measurements;
- body-composition estimates with method/source;
- weekly check-ins;
- progress photos;
- strength/performance markers;
- Coach X summaries;
- user goals.

## Main surfaces

### /app/performance
The main progress command center.

Recommended sections:

1. **This week**
   - completed workouts;
   - planned vs completed;
   - current streak;
   - weekly check-in status.

2. **Body trend**
   - latest weight;
   - 7-day trend when enough readings exist;
   - change vs previous comparable window;
   - waist trend;
   - optional composition estimates.

3. **Performance**
   - recent workouts;
   - exercise PRs later;
   - volume/load trends later;
   - program progress.

4. **Progress photos**
   - weekly/monthly timeline;
   - front / side / back;
   - private by default;
   - compare two dates.

5. **Coach X insight**
   - concise summary of changes;
   - identifies consistency/trend signals;
   - asks before making a recommendation;
   - never diagnoses from photos.

### /app/progress/check-in
A fast weekly flow.

Suggested questions:
- energy: 1–5;
- sleep quality: 1–5;
- soreness: 1–5;
- stress: 1–5;
- motivation: 1–5;
- training sessions planned/completed;
- optional notes.

The check-in should take under one minute.

### /app/progress/body
Entry/history for:
- weight;
- waist;
- hip;
- chest;
- arms;
- thighs;
- calves;
- body-fat estimate;
- lean-mass estimate;
- muscle-mass estimate;
- measurement method/device.

### /app/progress/photos
Private photo timeline.

## Body composition rule

Body-composition values are estimates unless measured by a validated reference method.

Every composition record must preserve:
- measurement method;
- device/source;
- date/time;
- optional conditions/notes.

MyTrainX must emphasize longitudinal comparison using the same method/device under comparable conditions.

Do not claim that MyTrainX can accurately infer muscle mass or body-fat percentage from a normal progress photo.

Photo analysis, if introduced, is limited to non-diagnostic visual change observations and requires explicit user opt-in.

## Weight UX

Do not overreact to one measurement.

Recommended dashboard logic:
- show latest;
- show rolling trend when sufficient points exist;
- compare equivalent time windows;
- make daily variation visually secondary;
- avoid red/green moral signaling for weight up/down;
- relate trends to the user's stated goal rather than assuming weight loss is always desirable.

## Data model

### progress_preferences
Per-user display and check-in preferences.

### body_metric_entries
Time-series:
- weight;
- body fat estimate;
- lean mass;
- muscle mass estimate;
- fat mass;
- hydration estimate;
- method/device/source.

### body_circumference_entries
Time-series tape/body measurements.

### weekly_checkins
Subjective weekly state + adherence.

### progress_goals
Goal definitions without forcing a weight-centric experience.

### progress_photo_sets
A dated set of private progress photos.

### progress_photos
Individual private photo objects and angle metadata.

## Progress photo security

Progress photos are sensitive user media.

Rules:
- private Supabase Storage bucket;
- no public URLs;
- RLS scoped to authenticated owner;
- time-limited signed URLs for display;
- object path begins with authenticated user ID;
- image analysis off by default;
- no use for model training;
- no sharing/social surface by default;
- deletion must remove Storage object and metadata.

Suggested object path:

`<user_id>/<photo_set_id>/<angle>-<uuid>.webp`

## Coach X contract

Initial read tools:

- `get_progress_summary`
- `get_body_trends`
- `get_weekly_checkin_summary`
- `get_progress_goal_status`

Future write tools, only with explicit user action:
- `log_weight`
- `log_body_measurements`
- `create_weekly_checkin`

Photo bytes are not sent to the agent by default.

## Coach X interpretation

Coach X should:
- discuss trends, not single noisy readings;
- surface measurement-method limitations;
- combine body metrics with training consistency and performance;
- celebrate process outcomes, not only weight outcomes;
- distinguish user-entered data from device estimates;
- ask the user before changing training based on uncertain data.

Coach X should not:
- diagnose medical conditions;
- infer disease from body shape;
- claim precise body-fat or muscle-mass values from photos;
- make extreme weight-loss recommendations;
- penalize normal short-term scale changes.

## Future integrations

Prepared for:
- Apple Health;
- Google Health Connect;
- Garmin;
- Fitbit;
- Withings;
- smart-scale imports;
- manual CSV import.

Imported readings must store provider and original source metadata.

## Knowledge integration

The Library should include supporting education linked directly from Progress:
- Why body weight changes day to day
- How to weigh yourself consistently
- What BIA can and cannot tell you
- How to measure waist correctly
- Progress photos: how to standardize them
- Strength progress vs visual progress
- Sleep, recovery and performance
- How to interpret a plateau
- When not to chase a lower scale number

These articles become Coach X retrievable knowledge after editorial/review approval.

## V1 acceptance

1. authenticated user can store/retrieve own body metrics;
2. authenticated user can store/retrieve own circumferences;
3. authenticated user can complete weekly check-ins;
4. authenticated user can define progress goals;
5. progress photos are private and owner-only;
6. AI photo analysis defaults off;
7. performance dashboard can summarize real user data;
8. no public access to personal progress records;
9. schema is ready for future wearable imports;
10. no medical interpretation is presented as fact.
