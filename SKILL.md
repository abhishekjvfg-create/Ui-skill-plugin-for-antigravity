---
name: atlas-studio
description: Builds and refines premium responsive websites, UI systems, procedural Three.js product scenes, 3D backgrounds and motion graphics from simple briefs. Use for cinematic product pages, UI/UX detail work, typography, design tokens, accessible animations, debugging, performance optimization, and authorized Google Stitch design-to-code workflows. Includes searchable local recipe catalogs and executable generators.
---

# Atlas Studio

A design workflow toolkit, not a new model, unlimited runtime, or proprietary Figma engine. Be ambitious about craft and precise about evidence. Catalog totals describe parameterized recipes, not thousands of independently authored skills. Never promise 2x speed or reference-video photorealism without measurements and suitable assets.

## First: locate tools, do not ingest the whole library

Resolve `SKILL_ROOT` to the absolute directory containing this file. Run:

```text
node "<SKILL_ROOT>/scripts/atlas.mjs" --help
node "<SKILL_ROOT>/scripts/atlas.mjs" stats
```

Node 22+ is required. No npm installation or paid API is needed for local commands. Replace the placeholder with the real path. Read only 2–4 relevant files from `resources/workflows/`; search catalogs instead of loading every JSON record into model context.

## Single-prompt workflow

1. Inspect the existing code, framework, assets, runtime, build/test commands and working tree. Preserve user work and the existing stack. Never scaffold over an existing project.
2. Extract audience, conversion goal, content, asset rights, motion intensity and accessibility requirements. Ask only blocking questions; otherwise state reasonable assumptions.
3. Read `art-direction.md`, `design-tokens.md`, `quality-loop.md`. Choose an intentional concept: hierarchy, color roles, negative space, composition and one signature visual moment. Do not apply neon/glass aesthetics indiscriminately.
4. Search and inspect a few useful recipes:
   - `search structures hero energy-drink --limit 5`
   - `search ui pricing noir --limit 5`
   - `search scenes can carousel --limit 5`
   - `search backgrounds ribbon --limit 5`
   - `search fonts devanagari --limit 5`
   - `show scenes scene-can-hero-litchi`
5. Choose the path:
   - Existing app: emit into a NEW scratch directory; adapt selected code to the actual app and its tokens.
   - New page: `scaffold --out <new-directory> --prompt "<brief>"`, then customize. This command is a deterministic starter generator, not an LLM.
   - Background-led page: add `--scene background-ribbon-tunnel-cobalt` to scaffold.
   - Component: `emit ui <id> --out <new-directory>`.
   - Animation: `emit motions <id> --out <new-directory>`.
   - 3D: `emit scenes <id> --out <new-directory>` or `emit backgrounds <id> --out <new-directory>`.
   - Library browser: `gallery --out <new-directory>` and serve that directory.
   - Vector art: `graphic --kind petals --seed 12 --out <new-file.svg>`.
6. Implement genuine flows, honest content and complete states. A demo success is not a real backend operation. Product information must exist in semantic HTML, not only canvas or aria-hidden text.
7. Run a bounded quality loop: build/tests → browser interactions → responsive screenshots → measured fixes. Defaults: maximum 3 iterations or 30 minutes, zero external paid generations. Ask before expanding budgets, spending credits, deploying or making destructive changes. Stop immediately on cancellation.
8. Deliver paths, setup commands, observed test evidence, measured metrics where available, gaps and next steps. Save a concise checkpoint if interrupted. Never claim unrun tests or unavailable integrations succeeded.

## Route to focused workflow modules

| Task | Read |
|---|---|
| Premium web/UI | art-direction, ui-composition, responsive, micro-detail |
| Type/color | typography, color-contrast, design-tokens |
| Figma-style handoff | figma-handoff, svg-graphics, design-tokens |
| Product/3D backgrounds | three-foundations, product-scenes, materials-lighting, camera-rig |
| Food motion | food-motion, procedural-geometry, instancing |
| Motion/scroll | motion-choreography, scroll-narrative, motion-accessibility |
| Performance | performance, asset-pipeline, three-cleanup |
| Bugs | bug-fixing, testing, security |
| Stitch | stitch, asset-licensing, visual-qa |
| Delivery | seo, deployment, documentation, quality-loop |
| Other | forms-states, accessible-components, internationalization, progressive-enhancement, accessibility |

## Definition of done

- Primary controls have meaningful outcomes; disconnected services are labeled.
- Inspect 360, 768 and 1440px layouts, wrapping, overflow and keyboard focus.
- Test reduced motion, WebGL failure, keyboard use and slow loading.
- Check actual text/control contrast, not only palette metadata.
- Measure GPU draw calls and frame time; budget textures, DPR and postprocessing.
- No credentials, unlicensed assets, fabricated endorsements or surprise costs.

## External integrations and limits

Stitch is optional: use the user's native authenticated MCP connection, discover its live tool schemas, and follow `resources/workflows/stitch.md`. Never invent an API or assume premium image generation exists. Local fallbacks remain available without Stitch.

`audit` is a heuristic source advisory, not an automatic bug fixer or full security audit. `doctor` checks local hashes/counts, not publisher identity. Fonts are real upstream metadata with CSS loading URLs; binaries, photorealistic GLB/HDR assets and the reference videos are not bundled. Visual references do not prove the original implementation stack. Large libraries are searched progressively; do not generate millions of files or run indefinitely.
