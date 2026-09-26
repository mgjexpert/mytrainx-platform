# MyTrainX Library System V2

**Date:** 2026-09-25  
**Track:** E — Content & Knowledge  
**Status:** IN PROGRESS  
**Repository:** `mgjexpert/mytrainx-platform`  
**Branch:** `feat/content-knowledge-foundation-v1`

## 1. Mission

Build MyTrainX Library as a first-class product surface and knowledge platform, not as a file browser.

The system must support, from the same canonical content domain:

1. free public education;
2. registered-member resources;
3. MyTrainX Master content;
4. individually sold digital products;
5. program-attached materials;
6. structured exercise and nutrition encyclopedias;
7. recipes and meal-planning resources;
8. challenges, learning paths and skill tracks;
9. Coach X and specialist-agent knowledge retrieval;
10. internal editorial/reference/evidence sources.

A source is inventoried once, governed once, normalized once, and then reused across multiple experiences.

---

## 2. Product surfaces

### 2.1 Public Library
Route target: `/biblioteca`

Purpose:
- discovery;
- SEO;
- free articles/guides;
- selected recipes;
- selected exercise pages;
- previews of premium content;
- acquisition into account, Master or one-time product.

### 2.2 Member Library
Route target: `/app/biblioteca`

Purpose:
- "Continue reading/watching";
- saved items;
- owned products;
- Master collections;
- program resources;
- recommendations;
- recently viewed;
- downloads when permitted.

### 2.3 Exercise Encyclopedia
Route target: `/exercicios` and `/app/exercicios`

Canonical exercise objects power:
- exercise pages;
- workouts;
- programs;
- progression graphs;
- Coach X explanations;
- filters by muscle, movement, equipment, difficulty and location.

### 2.4 MyTrainX Kitchen
Route target: `/receitas` and `/app/receitas`

Canonical recipe objects power:
- recipe pages;
- collections/ebooks;
- nutrition calculation;
- substitutions;
- shopping lists;
- meal-plan suggestions;
- Coach X / nutrition education retrieval.

### 2.5 Programs & Challenges
Examples:
- WKT Militar;
- MyTrainX Start;
- Core 21;
- Home 30;
- HIIT pathways;
- Calisthenics Foundations;
- Handstand;
- Front Lever;
- future strength/hypertrophy pathways.

Programs reference canonical workouts, exercises, lessons and materials rather than duplicating them.

### 2.6 Learning Paths
A learning path combines ordered content objects around an outcome.

Examples:
- Start Training Safely;
- Strength Fundamentals;
- Nutrition Fundamentals;
- Calisthenics Foundations;
- Better Recovery;
- Habits 360.

### 2.7 Digital Products
A product may package:
- ebook;
- course;
- challenge;
- program;
- recipe pack;
- video series;
- bundle.

Commercial packaging is separate from canonical content ownership. The same content can be included in Master and/or one-time products according to entitlement rules.

---

## 3. Canonical content graph

The central model is a graph, not a folder tree.

```
Source
  -> Source Asset
  -> Rights Decision
  -> Review
  -> Canonical Content Item
     -> Taxonomy
     -> Media Assets
     -> Collection(s)
     -> Product(s)
     -> Program(s)
     -> Knowledge Document(s)
     -> AI Index Policy
     -> Access Policy
     -> User State
```

Specialized domain nodes:

```
Exercise
  -> muscles
  -> equipment
  -> movement patterns
  -> regressions
  -> progressions
  -> alternatives
  -> demo/tutorial media
  -> workouts/programs

Food
  -> nutrients
  -> serving definitions
  -> source provenance

Recipe
  -> normalized ingredients
  -> steps
  -> calculated nutrition
  -> dietary tags
  -> collections
  -> meal-plan use
```

---

## 4. Library information architecture

### Primary verticals

1. Training
2. Strength & Hypertrophy
3. HIIT & Conditioning
4. Home Training
5. Functional Training
6. Core
7. Calisthenics & Skills
8. Mobility & Recovery
9. Nutrition
10. Recipes
11. Wellness & Habits
12. Programs & Challenges
13. Guides, Ebooks & Manuals
14. WKT Resources

### Secondary dimensions

Every item may additionally be classified by:

- goal;
- difficulty;
- audience;
- duration;
- equipment;
- location;
- body region;
- movement pattern;
- content format;
- language;
- coach/specialist;
- access tier;
- commercial status;
- review status;
- evidence level;
- safety sensitivity.

The public UX must never mirror Google Drive folder names.

---

## 5. Access and monetization

Canonical access policies:

- `public`
- `registered`
- `master`
- `owned_product`
- `program_entitlement`
- `staff_only`

The same authorization resolver must be used by:
- page rendering;
- file/download delivery;
- search;
- recommendations;
- Coach X retrieval;
- specialist-agent tools.

No AI tool may retrieve premium or product-owned content by bypassing the user's entitlement.

### Commercial models

Supported:
- free;
- freemium preview;
- Master inclusive;
- one-time purchase;
- bundle;
- attached to another program/product;
- internal/reference-only.

---

## 6. Source and rights model

Source availability never implies redistribution rights.

Rights statuses:

- `owned`
- `commissioned`
- `verified_plr`
- `public_domain`
- `cc0`
- `cc_by`
- `cc_by_sa`
- `odbl`
- `ogl`
- `other_explicit_license`
- `reference_only`
- `unknown`
- `restricted`

Each rights decision must preserve:
- source;
- author/provider;
- license type;
- evidence URL/file;
- commercial-use permission;
- derivative permission;
- redistribution permission;
- attribution requirement;
- expiry/review date if applicable;
- reviewer;
- notes.

### Initial Drive rule

Named third-party courses are `reference_only` by default unless package-specific rights are proven.

### PLR rule

PLR is evaluated at package level. A license discovered in one archive does not authorize neighboring archives.

---

## 7. Editorial and safety governance

Review flags:

- editorial;
- exercise;
- nutrition;
- scientific;
- medical/clinical;
- legal/rights;
- safety.

Quarantine by default:
- hormone protocols;
- medication;
- disease treatment;
- diabetes treatment claims;
- detox claims;
- respiratory disease treatment;
- injury diagnosis;
- aggressive weight-loss promises;
- content with unknown rights.

Quarantined sources may remain in internal inventory but cannot become public, premium or retrievable AI knowledge until resolved.

---

## 8. AI knowledge architecture

Raw source files and AI knowledge are separate.

### Layers

#### KB-PUBLISHABLE
Owned/licensed material approved for product and AI retrieval.

#### KB-EVIDENCE
Official/public scientific and guideline sources used to ground or verify education.

#### KB-REFERENCE-PRIVATE
Internal research/reference sources not authorized for redistribution.

#### KB-QUARANTINE
Unreviewed, clinical, unsafe or rights-unclear material.

### Index policy

Each content item has:
- `none`
- `metadata_only`
- `retrievable`

Knowledge documents are versioned and derived from canonical source text/transcripts. Embeddings are replaceable infrastructure, never the canonical record.

Agent retrieval must return provenance and enforce access policy before the model sees content.

---

## 9. Content lifecycle

```
DISCOVERED
  -> INVENTORIED
  -> RIGHTS_PENDING
  -> RIGHTS_RESOLVED
  -> REVIEW_PENDING
  -> APPROVED_FOR_TRANSFORMATION
  -> NORMALIZED
  -> EDITED
  -> QA
  -> PUBLISHED
  -> INDEXED
  -> MONITORED
  -> UPDATED / ARCHIVED
```

Independent statuses must exist for:
- rights;
- editorial review;
- safety/science review;
- publication;
- AI indexing.

This avoids one generic "published" boolean hiding unresolved risks.

---

## 10. Transformation model

MyTrainX should prefer transformation over simple file redistribution.

Examples:

### Legacy/PLR ebook
```
source ebook
 -> rights verification
 -> fact/safety review
 -> structured chapters
 -> MyTrainX rewrite
 -> web reading experience
 -> downloadable branded edition
 -> knowledge chunks
 -> collection/product packaging
```

### Workout course
```
source course
 -> reference analysis
 -> canonical exercise mapping
 -> methodology extraction
 -> original MyTrainX programming
 -> own scripts/media
 -> program object
 -> workout schedule
 -> Coach X integration
```

### Recipe PDF
```
PDF
 -> recipe extraction
 -> normalize ingredients
 -> nutrient mapping
 -> structured recipe
 -> web page
 -> collection
 -> shopping list
 -> meal-plan suggestion
 -> AI retrieval
```

---

## 11. Initial acquisition waves

### Wave A — Existing MyTrainX/WKT assets
Highest confidence because already product-connected.

Deliver:
- WKT workout and supporting-material registry;
- program attachment rules;
- exercise mapping.

### Wave B — High-value Drive references
Reference-only until rights resolution:
- WKT / Xtreme families;
- Total HIIT;
- Summer ABS;
- Calisthenics;
- GRAVIDADE_ZERO;
- training technique;
- Vida Funcional;
- Smart Emagrecimento;
- Wellness.

Goal: extract taxonomy, gaps, educational structure and candidate concepts.

### Wave C — PLR archives
Priority:
1. Musculação;
2. Alimentação e Dieta;
3. Culinária;
4. Saúde e Bem Estar;
5. Mindset.

Goal:
- enumerate nested packages;
- locate license evidence;
- classify rights;
- identify transformable assets;
- create product candidates.

### Wave D — Open canonical datasets
Priority:
- exercise dataset(s) with compatible public/open license;
- USDA FoodData Central;
- other official evidence sources.

Goal: seed canonical exercise and nutrition knowledge.

### Wave E — MyTrainX original production
Produce:
- own scripts;
- own exercise media;
- own recipes;
- own programs;
- own ebooks;
- expert-reviewed educational content.

Over time, replace external/reference dependency with owned intellectual property.

---

## 12. Launch collections

Initial target collections:

1. Start Here
2. Training Fundamentals
3. Exercise Encyclopedia
4. Train at Home
5. HIIT
6. Build Strength
7. Core
8. Calisthenics Foundations
9. Skills: Handstand
10. Skills: Front Lever
11. Mobility & Recovery
12. Nutrition Fundamentals
13. Macronutrients
14. MyTrainX Kitchen
15. High-Protein Recipes
16. Meal Prep
17. Habits 360
18. WKT Resources
19. My Downloads
20. My Purchased Products

---

## 13. First MyTrainX-owned production backlog

P0:
- MyTrainX Start — 4 weeks;
- Exercise Encyclopedia seed;
- Nutrition Fundamentals;
- MyTrainX Kitchen initial recipe set;
- WKT supporting resources normalization.

P1:
- Core 21;
- Home 30;
- HIIT Beginner -> Intermediate -> Advanced;
- Calisthenics Foundations;
- Habits 360.

P2:
- Handstand pathway;
- Front Lever pathway;
- Strength Foundations;
- Meal Prep;
- Recovery & Mobility.

---

## 14. Search and discovery

Library search must support:
- keyword;
- semantic search later;
- content type;
- collection;
- goal;
- equipment;
- muscle;
- difficulty;
- duration;
- access;
- format;
- coach;
- dietary attributes.

Search results must clearly show entitlement state:
- available;
- Master;
- owned;
- locked;
- previewable.

Coach X should use the same catalog/search domain through internal APIs rather than a second hidden corpus.

---

## 15. User state

Persist:
- viewed;
- progress;
- completed;
- saved;
- downloaded;
- rating/feedback later;
- current position in ebook/video/path;
- collection progress;
- purchase/entitlement.

"Continue" must work across content types.

---

## 16. Media strategy

Storage is an implementation detail.

A media asset may live on:
- Google Drive during migration/MVP;
- managed object storage;
- dedicated streaming provider later.

The canonical database stores identity, rights, playback/download policy, duration, poster/thumbnail, captions/transcript status and provenance.

Do not expose permanent raw source URLs as the product contract.

---

## 17. Internal API targets

Future authenticated internal endpoints/tools:

- `search_library`
- `get_content_item`
- `get_collection`
- `get_program_materials`
- `search_exercises`
- `get_exercise`
- `get_exercise_progressions`
- `search_recipes`
- `get_recipe`
- `get_user_library`
- `get_learning_path_progress`

All are entitlement-aware.

---

## 18. Success criteria

The Library V2 foundation is successful when:

1. raw Drive folders are no longer the product IA;
2. every surfaced item has provenance and access policy;
3. content, exercise and recipe entities are reusable;
4. rights-unclear sources cannot accidentally publish;
5. clinical/unsafe sources cannot accidentally index;
6. the same entitlement logic governs humans and AI;
7. a recipe/exercise can participate in multiple products without duplication;
8. user progress is persistent;
9. new sources can be ingested through a repeatable pipeline;
10. the first original MyTrainX collections can be built without schema redesign.
