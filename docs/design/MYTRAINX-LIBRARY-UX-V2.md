# MyTrainX Library UX / Visual System V2

**Date:** 2026-09-25  
**Status:** DESIGN SPEC  
**Visual family:** BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE

## Product feeling

The Library should feel like a hybrid of:
- premium fitness streaming catalog;
- modern learning platform;
- performance knowledge base;
- personal collection.

It must not look like:
- Google Drive;
- a WordPress ebook archive;
- a generic LMS;
- a grid of anonymous PDF icons.

## Core surfaces

### Public /biblioteca

Hero:
- compact, content-led;
- title: Biblioteca MyTrainX;
- search field;
- one featured collection;
- quick category pills.

Sections:
1. Comece Aqui
2. Em Destaque
3. Fundamentos do Treino
4. Exercícios
5. MyTrainX Kitchen
6. Treine em Casa
7. HIIT
8. Calistenia & Skills
9. Nutrição
10. Novidades

Locked items may appear if previewable, but never dominate the page.

### Member /app/biblioteca

Above fold:
- Continue;
- Minha Biblioteca;
- search;
- quick access to owned products and Master.

Shelves:
- Continuar
- Salvos
- Seus Programas
- Comprados
- Recomendados
- Novos no Master
- Exercícios recentes
- Receitas salvas

## Card system

### Content card
Contains:
- strong image/poster;
- small type badge;
- title;
- duration/read time;
- access badge only when useful;
- progress bar when applicable.

Avoid excessive metadata on cards.

### Program card
More cinematic:
- hero poster;
- program logo/title;
- level;
- duration/weeks;
- progress;
- Continue CTA.

### Exercise card
More functional:
- start/end or neutral movement frame;
- name;
- primary muscle;
- equipment;
- difficulty;
- quick-save.

### Recipe card
Food-first:
- hero image;
- title;
- prep time;
- servings;
- useful tags;
- save action.

Do not put calorie numbers on every thumbnail by default.

## Access states

### Available
Normal card.

### Master
Small restrained orange/gold-adjacent premium marker; do not use fake metallic overload.

### Owned
Use subtle "Seu" / check marker.

### Locked
Dim image slightly, preserve title/preview, clear unlock action.

### Staff-only
Never render in consumer surfaces.

## Search UX

Universal Library search should support suggestions grouped by:
- Conteúdo
- Exercícios
- Receitas
- Programas

Desktop:
- command/search overlay is acceptable.

Mobile:
- full-screen search sheet.

Filters are contextual, not one giant filter panel.

Exercises:
- muscle;
- equipment;
- difficulty;
- movement;
- location.

Recipes:
- meal;
- time;
- dietary tags;
- ingredients later.

Content:
- topic;
- type;
- access;
- duration.

## Exercise detail page

Desktop layout:
- media left / key data right above fold;
- execution below;
- coaching cues and mistakes;
- regressions/progressions as linked cards;
- workouts/programs using the exercise;
- Coach X action: "Perguntar ao X sobre este exercício".

Mobile:
- media first;
- sticky compact actions;
- collapsible advanced detail.

## Recipe detail page

Hero:
- image;
- title;
- prep/cook time;
- servings;
- save;
- optional add-to-plan action later.

Body:
- ingredients;
- method;
- substitutions;
- nutrition estimate;
- storage;
- related recipes.

Coach X actions:
- "Adaptar ingredientes"
- "Criar lista de compras"
- "Como encaixar esta receita?"

These actions must respect the boundaries of general nutrition education.

## Ebook / manual reader

Do not simply iframe a PDF when a structured web edition exists.

Reader:
- table of contents;
- reading progress;
- resume position;
- text size;
- light/dark reading mode may be considered independently of global brand;
- inline Coach X "Perguntar sobre este trecho" later;
- download only if entitlement and rights allow.

PDF remains downloadable companion, not the best reading UX.

## Learning Path

Visual model:
- staged route;
- current stage highlighted;
- completed stages;
- locked prerequisite states;
- estimated effort;
- next action.

For calisthenics skill paths, the progression graph can become a strong visual differentiator.

## Visual tokens

Use the existing MyTrainX orange token system from the platform.

Library-specific principles:
- black/graphite background;
- imagery gets room to breathe;
- orange indicates action/current state;
- neutral grayscale for metadata;
- progress uses the product's established progress treatment;
- success green only for real completion/success.

## Typography

- strong condensed display for page/collection titles;
- highly readable sans for long-form body;
- reader line length approximately 60–75 characters on desktop;
- avoid all-caps for paragraphs.

## Motion

Use motion to explain state:
- card hover depth;
- shelf transitions;
- progress updates;
- unlock transition;
- save confirmation.

Avoid constant ambient animation inside reading/learning surfaces.

## Content imagery

Owned visual language should become consistent by family:
- Strength: dark gym / precise form / orange technical accents;
- Home: warm modern home / realistic accessible equipment;
- Calisthenics: architectural/body-control visuals;
- Nutrition: clean real-food photography;
- Recovery: lower contrast, calmer but still MyTrainX;
- WKT: allowed military sub-language, contained within WKT.

## Watermark display

Watermarks belong primarily to exported/downloaded media, not as noisy overlays across every in-app card.

For streamed premium videos use the defined brand bug/dynamic token strategy.

## Responsive priority

Design mobile-first for:
- exercise use during training;
- recipe use in kitchen;
- quick Coach X handoff;
- save/continue.

Desktop gets richer discovery and comparison, not simply stretched mobile cards.

## Accessibility

- keyboard navigable search/filters;
- visible focus;
- captions;
- transcript access;
- text alternatives;
- progress not indicated by color only;
- sufficient contrast;
- tap targets appropriate for gym use.
