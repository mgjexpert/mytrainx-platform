# MyTrainX Content Library V1

**Date:** 2026-09-25  
**Track:** E — Content & Knowledge  
**Status:** IN PROGRESS  
**Owner:** MyTrainX Product/Data  
**Implementation branch:** `feat/content-knowledge-foundation-v1`

## Product definition

The MyTrainX Library is not a file browser or a download folder.

It is the product-facing surface of a canonical Content & Knowledge domain that serves five purposes at the same time:

1. free educational content;
2. MyTrainX Master / premium content;
3. individually purchasable digital products;
4. materials attached to programs such as WKT;
5. entitlement-aware knowledge for Coach X and specialist skills.

A content asset is registered once and can then be reused as a web lesson, ebook chapter, program material, recipe, AI knowledge source, recommendation target or downloadable resource according to rights and access rules.

## Core library verticals

- Training
  - strength / hypertrophy
  - conditioning
  - HIIT
  - functional
  - home training
  - core
  - mobility
  - recovery
- Calisthenics & Skills
  - foundations
  - handstand
  - front lever
  - back lever
  - planche
- Nutrition
  - fundamentals
  - macronutrients
  - meal planning
  - hydration
  - weight-management education
- Recipes
  - breakfast
  - lunch
  - dinner
  - snacks
  - soups
  - salads
  - desserts
  - drinks
  - meal prep
- Wellness
  - habits
  - sleep/recovery education
  - consistency
  - mindfulness
  - yoga/mobility
- Programs & Challenges
  - WKT
  - future MyTrainX Start
  - future Core 21
  - future Home 30
  - future HIIT pathways
- Guides & Resources
  - ebooks
  - manuals
  - checklists
  - worksheets
  - shopping lists
  - program support material

## Access layers

Every item has an explicit access policy:

- `public` — no account required;
- `registered` — signed-in member;
- `owned_product` — active entitlement for an attached product;
- `master` — active MyTrainX Master subscription;
- `staff_only` — internal/reference/review use only.

AI retrieval must never bypass this same access model.

## Content lifecycle

A source entering MyTrainX moves through explicit states.

```
SOURCE
  -> INVENTORY
  -> RIGHTS CHECK
  -> EDITORIAL / SCIENTIFIC / SAFETY REVIEW
  -> NORMALIZATION
  -> CONTENT ITEM
  -> EXTRACTION / TRANSCRIPTION
  -> KNOWLEDGE DOCUMENT / CHUNKS
  -> ACCESS + AI POLICY
  -> PUBLISHED / INDEXED
```

Source availability does not imply publication rights.

## Rights model

Each publishable item must have a rights record or an inherited source decision that is resolved before publication.

Supported bases include:

- MyTrainX-owned;
- commissioned;
- verified PLR;
- public domain / CC0;
- Creative Commons variants;
- ODbL / OGL;
- other explicit license;
- reference-only;
- unknown.

Third-party courses discovered in the initial Drive are inventory/reference material by default. They are not automatically sold, redistributed or exposed to Coach X.

PLR packages are candidates for transformation only after the license is verified at package level.

## Review model

Content can require one or more reviews:

- editorial;
- scientific;
- legal/rights;
- safety;
- nutrition;
- exercise.

Medical/clinical claims, hormones, medications, disease treatment, detox claims and similar subjects remain quarantined until an appropriate review is approved.

## Collections

The user experience is organized as curated collections rather than raw folders.

Examples:

- Start Here
- Training Fundamentals
- Build Strength
- HIIT
- Train at Home
- Calisthenics Skills
- Nutrition Fundamentals
- MyTrainX Kitchen
- Recovery & Mobility
- Habits 360
- WKT Resources

Collections may themselves be public, registered, product-owned, Master or staff-only.

## Content types

Canonical types:

- workout video;
- educational video;
- ebook/PDF;
- manual;
- recipe;
- article;
- checklist;
- program material;
- event/live;
- audio;
- image.

The source file format is not the product type. A PDF recipe book may be transformed into structured recipe records while retaining the original PDF as a source or downloadable companion when rights allow.

## Exercise knowledge

Exercises are first-class domain entities, separate from media.

Each exercise can carry:

- canonical name + aliases;
- locale;
- type and difficulty;
- equipment;
- primary/secondary muscles;
- movement patterns;
- instructions;
- coaching cues;
- common mistakes;
- safety notes;
- regressions/progressions/alternatives;
- linked demonstration/tutorial content;
- review status.

This lets programs, the exercise encyclopedia and Coach X reference the same canonical exercise object.

## Food & recipe knowledge

Foods are also canonical entities.

The target model supports:

- food source ID;
- food group;
- default serving;
- nutrients per 100g;
- allergens;
- normalized recipe ingredients;
- structured recipe steps;
- calculated nutrition metadata.

USDA FoodData Central is the preferred open canonical nutrition seed. Other datasets remain isolated unless their database license is compatible with the MyTrainX data model.

## AI knowledge policy

The knowledge layer is deliberately separated from raw content.

`content_items.ai_index_policy` defines whether an item is:

- `none`;
- `metadata_only`;
- `retrievable`.

Retrievable sources become versioned knowledge documents and chunks. Retrieval through Coach X must apply product/member authorization before results are returned.

The V1 schema provides full-text chunk search. Vector embeddings are deferred until the embedding provider/model contract is fixed with Atendimento.Center; the canonical text remains model-independent.

## Initial source strategy

### Initial Drive — courses/programs

High-value reference groups include WKT, TOTAL HIIT, SUMMER ABS, Xtreme, calisthenics, GRAVIDADE_ZERO, training technique, nutrition/recipes and wellness.

Named third-party programs are treated as `reference_only` unless rights are separately demonstrated.

### Initial Drive — PLR library

Priority archives:

- Saúde e Bem Estar;
- Musculação;
- Alimentação e Dieta;
- Culinária;
- Mindset.

These are candidate source collections, not automatically licensed products. Every nested PLR package must retain its own license evidence.

### Open sources

- USDA FoodData Central — canonical nutrition candidate;
- open/public exercise datasets — candidate exercise seeds after license verification;
- official evidence sources — reference/evidence layer according to their license;
- Open Food Facts — isolated/paused for canonical merging until ODbL implications are handled explicitly.

## Product principle

One normalized content object should be reusable across multiple experiences.

Example:

```
Recipe
  -> Library page
  -> Meal-plan suggestion
  -> Shopping-list ingredient set
  -> Ebook collection
  -> Master content
  -> Coach X retrieval
```

and:

```
Exercise
  -> Exercise encyclopedia
  -> Workout
  -> Program
  -> Progression pathway
  -> Tutorial video
  -> Coach X explanation
```

## Non-negotiables

- Never expose raw Drive structure as information architecture.
- Never publish third-party material merely because MyTrainX can access the file.
- Never let AI retrieval bypass rights or entitlements.
- Never mix clinical/unsafe material into general fitness answers without the required review.
- Never make embeddings the only canonical copy of knowledge.
- Preserve source provenance and version history.
- Do not commit secrets, customer data or unauthorized raw copyrighted assets to GitHub.
