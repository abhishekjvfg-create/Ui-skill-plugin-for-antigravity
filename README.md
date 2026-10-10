# Atlas Studio

**One Antigravity skill pack for premium website craft, procedural 3D, motion, typography and UI engineering.**

Local-first. Open source. Node.js 22+. No runtime npm dependencies. No API key needed for the local tools.

> Yeh model upgrade ya unlimited AI engine nahi hai. Yeh Antigravity ko reusable code, searchable design recipes aur disciplined workflows deta hai. Premium results ke liye agent ko content, art direction, assets aur testing par kaam karna hoga.

## What is actually included

| Library | Count | What the number means |
|---|---:|---|
| Native Antigravity skill | **1** | `skills/atlas-studio/SKILL.md`, the main router |
| Focused workflow modules | **37** | Authored implementation and quality protocols |
| Code-structure recipes | **5,400** | 30 component families × 12 styles × 15 contexts |
| Motion presets | **600** | 24 executable keyframe families × 5 durations × 5 amplitudes |
| Product/food/sculpture 3D scenes | **120** | 12 procedural base layouts × 10 treatments |
| 3D backgrounds | **120** | 12 background patterns × 10 treatments |
| UI recipes | **1,600** | 32 semantic component families × 10 styles × 5 densities |
| Font families | **1,950** | Real Google Fonts metadata, script coverage and loading URLs |
| Color palettes | **1,200** | Deterministic semantic palettes with computed contrast pairs |
| SVG generators | **4** | Orbit, grid, waves and petals with seed-based variations |

**Counts are transparent:** recipes are parameter combinations, not 5,400 independently authored skills, 1,600 completely different hand-crafted screens, or millions of finished websites. Font binaries and commercial assets are not bundled. See `skills/atlas-studio/resources/counts.json`.

## Quick install from your GitHub repository

1. Unzip the release into the **root of your GitHub repository**. The root must contain `package.json`, `scripts/`, `skills/`, `tests/` and this README.
2. Clone the repository locally. Install Node.js 22 or newer. No `npm install` is required to use the toolkit.
3. From the repository root, inspect and test:

```sh
node skills/atlas-studio/scripts/atlas.mjs doctor
npm test
node scripts/install.mjs --workspace "/absolute/path/to/your-website" --dry-run
```

4. After reviewing the source and dry-run destination:

```sh
node scripts/install.mjs --workspace "/absolute/path/to/your-website" --yes
```

The workspace must already exist. The installer writes only:

```text
<your-website>/.agents/skills/atlas-studio/
```

5. Open that website workspace in Antigravity CLI, run `agy`, then `/skills`. Verify that **atlas-studio** appears. Reopen the session if needed. Mention the skill by name in your prompt.

Official references:
- https://antigravity.google/docs/skills/
- https://codelabs.developers.google.com/antigravity/how-to-create-agent-skills-for-antigravity-cli

The project-scoped `.agents/skills` format is documented by Google. Native discovery was not exercised in a signed-in Antigravity session in this sandbox; confirm it on your own installation. We do not invent an `agy plugin install <URL>` command.

### Windows PowerShell

```powershell
node --version
node scripts/install.mjs --workspace "C:\Projects\MyWebsite" --dry-run
node scripts/install.mjs --workspace "C:\Projects\MyWebsite" --yes
```

The installer uses cross-platform Node APIs; this release's execution tests ran on Linux, not Windows/macOS. No WSL-specific commands are needed for the installer. A target app's own build toolchain may have additional platform requirements.

### Installation prompt to paste into Antigravity

Replace the repository URL and workspace path:

```text
Install Atlas Studio from https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.
Clone it into a separate tools directory, not over my website source.
Read README.md, SKILL.md and the installer before running anything.
Check Node.js >=22, run doctor and npm test, then run the installer
with --workspace "MY_EXISTING_WEBSITE_PATH" --dry-run.
Show me the destination. After my approval, repeat with --yes.
Do not overwrite my files, edit global settings, or configure API keys.
Finally help me verify atlas-studio appears in Antigravity /skills.
```

## One simple build prompt

```text
Use atlas-studio. Build an original premium energy-drink website:
cinematic metallic product hero, bold editorial typography, accessible
motion, polished mobile layout and working navigation. Inspect my
existing stack first. Choose relevant recipes, customize the design,
then test at 360/768/1440px, reduced motion and WebGL-off.
Do not copy reference-brand assets. Use at most three refinement passes
and ask before paid image generation or deployment.
```

More prompts: `docs/PROMPTS.md`. Hindi/Hinglish setup: `docs/START-HERE-HINGLISH.md`.

## Local command examples

Commands below run from this repository root. In an installed workspace, replace `skills/atlas-studio` with `.agents/skills/atlas-studio`.

```sh
# Counts, search and inspect
node skills/atlas-studio/scripts/atlas.mjs stats
node skills/atlas-studio/scripts/atlas.mjs search backgrounds ribbon --limit 5
node skills/atlas-studio/scripts/atlas.mjs search fonts devanagari --limit 10
node skills/atlas-studio/scripts/atlas.mjs show ui ui-tabs-noir-balanced

# Original product website starter (output directory must not exist)
node skills/atlas-studio/scripts/atlas.mjs scaffold --out ./my-product-site --prompt "Premium product website"

# Background-led starter
node skills/atlas-studio/scripts/atlas.mjs scaffold --out ./my-background-site --prompt "Creative portfolio" --scene background-ribbon-tunnel-cobalt

# Runnable isolated studies
node skills/atlas-studio/scripts/atlas.mjs emit backgrounds background-starfield-arctic --out ./starfield-study
node skills/atlas-studio/scripts/atlas.mjs emit scenes scene-can-carousel-litchi --out ./product-study
node skills/atlas-studio/scripts/atlas.mjs emit ui ui-pricing-noir-balanced --out ./pricing-study
node skills/atlas-studio/scripts/atlas.mjs emit motions motion-rise-500-24 --out ./motion-study

# Original SVG and CSS tokens
node skills/atlas-studio/scripts/atlas.mjs graphic --kind petals --seed 12 --out ./petals.svg
node skills/atlas-studio/scripts/atlas.mjs tokens palette-270-1

# Searchable visual library, with preview and recipe JSON download
node skills/atlas-studio/scripts/atlas.mjs gallery --out ./my-library
node skills/atlas-studio/scripts/atlas.mjs serve --dir ./my-library --port 3000
```

Open **http://127.0.0.1:3000**. Use Ctrl+C to stop the local preview. To preview a generated site instead, point `--dir` at that site. Only serve a generated public-content directory—not your home, repository secrets or private work. The server is loopback-only, read-only, and includes CORS for isolated recipe previews; it is not a production web server.

`scaffold` uses a deterministic starter and heuristic brief routing. The Antigravity agent supplies the reasoning, customization and code refinement through the skill; the CLI itself does not call an LLM.

## 3D backgrounds

Starfield, particle wave, terrain grid, orbital dust, glass-style towers, crystal field, ribbon tunnel, neon lattice, low-poly dunes, floating islands, helix stream and sphere garden. Each has 10 color/material treatments.

The renderer uses Three.js `0.180.0`, instanced repeated geometry, capped DPR, visibility pausing, reduced-motion handling, disposal and static fallback. Procedural studies are editable starter code, not production-quality liquid simulation or licensed photorealistic product models. High-end food/product fidelity may require original GLB/HDR/texture assets or an approved prerendered clip.

## Fonts and colors

- 1,950 actual upstream font-family entries; not 1,950 font files installed on your computer.
- Search category and script, inspect supported weights, then use the listed Google Fonts CSS URL or self-host properly licensed files.
- Library thumbnails use system fonts; they are not live previews of every font.
- Load only required families/weights; respect privacy policies and each upstream license.
- 1,200 palettes include semantic tokens and four checked contrast pairs. Actual gradients, imagery, focus outlines and composited UI still require inspection.

## Google Stitch

Optional native MCP workflow, **not an authenticated MCP client bundled into this repository**. Configure Stitch through the supported Antigravity MCP interface with your own authorized account/key. Discover current tools/schemas, confirm the generation budget, then use the skill's design-to-code workflow.

```sh
node skills/atlas-studio/scripts/atlas.mjs stitch --prompt "Premium skincare store, desktop and mobile"
```

This prints a handoff brief; it does not send a request. See `resources/workflows/stitch.md` inside the skill. Never commit API keys. Stitch's live service was not authenticated/tested here. Availability of images, exports and generation depends on the actual connected tools and account.

## Updating and uninstalling

The installer refuses modified or conflicting destinations. It does not silently overwrite user work.

```sh
node scripts/install.mjs uninstall --workspace "/absolute/path/to/your-website" --dry-run
node scripts/install.mjs uninstall --workspace "/absolute/path/to/your-website" --yes
```

Uninstall succeeds only when all owned files are unchanged and no unknown files were added. Back up custom edits first. Then install a reviewed new version. Do not manually edit installation receipts to bypass these checks.

## Architecture and storage

- One native `SKILL.md` router plus 37 progressively loaded workflow modules.
- JSON catalogs: typed recipe IDs, geometry/keyframes, semantic style tokens, acceptance criteria and provenance.
- Dependency-free Node local tools for search, planning, emission, SVG, installation, verification and packaging.
- Browser output: semantic HTML/CSS/JS with optional CDN Three.js.
- No remote database, analytics or runtime credential store. Form examples use ephemeral preview state and do not submit data.
- `audit --dir <path>` is a heuristic advisory, not automatic bug repair or security certification.
- `doctor` hashes detect accidental modification, not cryptographic publisher identity.

## Verification and development

```sh
npm test
npm run verify
# After intentional source/catalog changes:
node scripts/build-workflows.mjs
npm run catalogs
npm run seal
npm test
npm run package
```

Build tools use the bundled frozen font snapshot. Do not silently refresh metadata: review upstream changes, counts, licenses and stable-ID impacts before replacing it.

Optional browser test instructions and scope are in `docs/TESTING.md`. This repository includes test source and the browser report when produced. No claim is made that every possible variation is individually visually approved.

## Limits / next steps

- No model-limit bypass, hidden chain-of-thought access, endless execution or guaranteed 2x speed.
- No automatic paid image generation, native `.fig` export or Figma replacement.
- No backend payments, authentication or real contact delivery in starter pages.
- No bundled photorealistic GLBs/HDRs, font binaries, copyrighted reference clips or scraped premium assets.
- Next: customize real brand content/assets, connect approved services, test target devices and deploy only with user approval.

## Deployment status

This is a **local developer skill pack**, delivered as source ZIP. No production deployment, public API or external account configuration is required or performed. Generated static sites may be hosted on a compatible host separately.

Original toolkit code: MIT. Third-party libraries/fonts retain their own terms; see `THIRD_PARTY_NOTICES.md`.
