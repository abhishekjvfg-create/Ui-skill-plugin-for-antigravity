# three foundations

## Goal
Integrate Three.js as progressive enhancement with a measurable GPU budget.

## Workflow
1. Use the pinned Three.js version consistently across core and addons. Start with one renderer, one scene and one camera. Keep UI/content in HTML. Render static content before loading 3D.

2. Use sRGB output, physically plausible materials, capped DPR and delta-time-based animation. A scene/background catalog entry chooses a base geometry and treatment; it is not a photorealistic asset.

3. Check WebGL creation, import failure, visibility, reduced motion, resize and context loss. Use host.atlasMetrics() in generated studies to inspect draw calls, triangles and DPR.

## Acceptance / stop condition
The page remains useful without WebGL; no duplicate render loops; metrics are observed rather than guessed.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
