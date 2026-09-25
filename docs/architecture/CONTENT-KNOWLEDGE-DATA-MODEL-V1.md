# Content & Knowledge Data Model V1

**Date:** 2026-09-25  
**Status:** IMPLEMENTED FOUNDATION / IN REVIEW  
**Supabase project:** `oitfnnsfgaxcxqvizorw`  
**Branch:** `feat/content-knowledge-foundation-v1`

## Purpose

This document defines the canonical MyTrainX content, library and knowledge model.

Google Drive, GitHub datasets, APIs and uploads are source/storage providers. They are not the MyTrainX domain model.

## Boundary

```
mytrainx-data
  -> manifests / inventories / import tooling
  -> MyTrainX server ingestion

MyTrainX Internal API
  -> authorization / entitlement
  -> Supabase domain + content registry
  -> knowledge retrieval

Atendimento.Center
  -> Coach X runtime
  -> approved MyTrainX tools only
```

Atendimento.Center never receives unrestricted Supabase or Drive credentials.

## Existing tables retained

The existing domain foundation remains authoritative:

- `content_items`
- `content_sources`
- `content_product_access`
- `recipes`

The V1 content migration extends these rather than replacing them.

## New registry/governance tables

### source_collections

Hierarchical inventory of source roots, folders, archives, APIs and datasets.

Important fields:

- provider / source_kind;
- source external ID / URL;
- relevance status;
- default rights basis;
- rights verification status;
- ingestion policy;
- default AI policy;
- domain tags;
- scan metadata.

This is internal/server-only.

### content_rights

Per-content rights evidence and publication permissions:

- basis/license;
- holder;
- commercial/derivative/redistribution permissions;
- attribution;
- AI retrieval/derivative permission;
- verification state.

This is internal/server-only.

### content_reviews

Versioned review records for:

- editorial;
- scientific;
- legal;
- safety;
- nutrition;
- exercise.

This is internal/server-only.

## New product-facing tables

### content_collections

Curated shelves, series, courses, challenges, bundles and pathways.

Collection access is entitlement-aware and mirrors content access.

### content_collection_items

Ordered relation between collections and content.

### taxonomy_terms / content_taxonomy

Stable hierarchical vocabulary used for filtering, discovery, AI context and analytics.

Initial dimensions:

- domain;
- topic;
- goal;
- format;
- equipment;
- muscle;
- movement pattern;
- skill;
- dietary;
- audience;
- lifecycle;
- safety.

### content_relationships

Graph between content items:

- part of;
- prerequisite;
- next;
- related;
- companion;
- translation;
- transcript;
- supersedes;
- derived from;
- references.

### user_content_state

Per-user library state:

- saved;
- in progress;
- completed;
- hidden;
- progress;
- playback/page position.

Rows are restricted to the authenticated owner.

## Exercise domain

### exercises

Canonical exercise object independent from any video.

### exercise_content_links

Links exercises to tutorial/demo/workout content.

### exercise_relations

Progression, regression, alternative, variation, warmup or mobility relationships.

This enables MyTrainX Skills and Coach X to reason over movement relationships without scraping course folders.

## Nutrition domain

### food_items

Canonical foods with provider provenance.

### food_nutrients

Normalized nutrient facts per 100g/source.

### recipe_ingredients

Normalized ingredients layered on top of the existing `recipes` JSON fields. The JSON representation remains compatible while normalized records enable searching, shopping lists and nutrition calculation.

## Knowledge/RAG domain

### knowledge_documents

Versioned normalized extraction from an authorized content/source record.

### knowledge_chunks

Canonical text chunks with heading, locator and metadata.

V1 uses full-text indexing. Embeddings are deliberately not yet part of the canonical schema. When a specific embedding model/dimension is approved, vectors can be added as a derived index without changing source truth.

## Access control

Client-readable content is explicit and read-only.

Internal tables such as sources, rights, reviews and raw knowledge chunks are not directly exposed to client roles.

User state is owner-scoped with RLS.

Collection and item access support:

`public | registered | owned_product | master | staff_only`

AI tools must perform authorization at the MyTrainX Internal API boundary even when the underlying data also has RLS.

## Source classes

### OWNED / VERIFIED OPEN

May proceed through editorial/scientific review toward publication.

### VERIFIED PLR

May be transformed according to the exact package license. License evidence remains attached to the source/item.

### REFERENCE ONLY

May inform product research and editorial planning where legally appropriate, but is not automatically redistributable or AI-retrievable.

### QUARANTINE

Clinical, unsafe, disputed, unclear-rights or scientifically sensitive material. Cannot silently enter customer-facing surfaces.

## Current live migration sequence

- `domain_foundation_v1`
- `seed_wkt_v1`
- `domain_foundation_v1_advisor_fixes`
- `content_knowledge_foundation_v1`
- `content_knowledge_foundation_v1_advisor_fixes`
- `content_registry_seed_v1`

## Validation

After the content foundation migrations:

- security advisor: no findings;
- missing FK indexes from the first pass were added;
- duplicate GIN indexes were removed;
- unused-index notices are expected on a newly seeded database and are not evidence of a defect.

## Next schema increments

1. recursive source scan/import jobs;
2. stable import IDs/idempotency manifests;
3. exercise dataset staging + review;
4. FoodData Central staging + normalization;
5. recipe extraction pipeline;
6. entitlement-aware Internal API search;
7. approved vector index strategy;
8. user-facing Library routes after the orange visual work is integrated.
