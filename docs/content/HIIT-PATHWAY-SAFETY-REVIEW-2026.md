# HIIT Pathway — Safety Review Pack 2026

**Date:** 2026-09-26  
**Program slug:** `hiit-pathway`  
**Status:** AMBER / INACTIVE  
**Publication blocker:** specialist safety review  
**Clinical scope:** no  
**Target audience:** generally healthy adults  
**Sessions:** 12 / 4 weeks  
**Frequency:** 3 sessions per week  
**Maximum programmed effort:** RPE 7/10

## Why this is not active yet

The technical program structure is complete, but MyTrainX does not claim specialist sign-off that has not happened.

Activation requires an appropriately qualified reviewer to confirm that the general-adult safety framing, intensity progression, exercise selection and stop rules are acceptable for publication.

## Program model

The program intentionally avoids maximal-effort HIIT.

Progression is driven primarily by interval density:

| Week | Phase | Target effort | Work / recovery | Sessions |
| --- | --- | --- | --- | ---: |
| 1 | Foundation | 5–6/10 | 20s / 60s | 3 |
| 2 | Build | 6/10 | 25s / 50s | 3 |
| 3 | Vigorous intro | 6–7/10 | 30s / 45s | 3 |
| 4 | Controlled peak | cap 7/10 | 30s / 40s | 3 |

Every session includes:

- 5–8 minute warm-up;
- relative effort instead of speed/load targets;
- talk-test cue;
- technique-based regression rule;
- 3–5 minute cooldown;
- explicit stop rules;
- no maximal-effort target.

## Exercise families

The 12 sessions rotate three low-complexity combinations:

### Pattern A

- agachamento ao banco
- flexão inclinada
- caminhada do fazendeiro

### Pattern B

- afundo estático
- mountain climber
- dead bug

### Pattern C

- goblet squat
- remada invertida
- prancha frontal

All referenced movements are part of the approved general-education Exercise Encyclopedia.

## Existing stop rules

Every session currently instructs the user to:

- stop for acute pain;
- stop for dizziness or fainting;
- stop for chest pain/pressure;
- stop for disproportionate shortness of breath;
- reduce intensity when technique deteriorates;
- avoid using maximal effort as the objective.

## Existing talk-test progression

### Foundation
Full sentences should remain possible for most of the work block.

### Build
Conversation becomes shorter, without seeking exhaustion.

### Vigorous intro
Short speech during work; breathing should recover before the next round.

### Controlled peak
Only a few words may be comfortable during work, but recovery during the rest interval remains mandatory.

## Questions for the specialist reviewer

Please explicitly answer each item:

1. Is the 5–7/10 RPE progression appropriate for generally healthy adults?
2. Are the work:rest changes conservative enough across four weeks?
3. Are three sessions per week appropriate with the stated intensity cap?
4. Is the talk-test language sufficiently conservative?
5. Are the stop rules adequate for a non-clinical fitness product?
6. Should any additional pre-exercise screening language be added?
7. Should any movement be replaced for a lower-complexity option?
8. Is the warm-up/cooldown framing sufficient?
9. Are there populations that should be explicitly excluded or redirected to professional guidance?
10. Can the program be published for general healthy-adult fitness without implying medical supervision?

## Activation gate

Only after documented specialist approval:

- set program metadata `review_status=safety_approved`;
- set `specialist_signoff=true`;
- record reviewer role/date/version;
- activate all 12 workouts;
- activate program;
- create/update `content_reviews(review_type='safety', status='approved')`;
- expose in public/member Program catalog;
- allow Coach X to reference the program.

## What must NOT happen

- no automatic activation because the technical structure is complete;
- no claim that the program is clinically validated;
- no maximal-effort language;
- no disease-specific HIIT prescription;
- no diagnostic use of symptoms;
- no silent removal of the existing safety gate.
