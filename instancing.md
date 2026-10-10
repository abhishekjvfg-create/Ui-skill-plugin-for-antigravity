# instancing

## Goal
Reduce repeated draw calls using InstancedMesh or Points where appropriate.

## Workflow
1. Measure renderer.info.render.calls before changing architecture. Use InstancedMesh when objects share geometry/material; use per-instance matrices and colors. Use Points for tiny particles.

2. Allocate typed arrays once. Set instanceMatrix.needsUpdate only after changes, not automatically on every frame. Use spatial grouping for culling when a huge instance set becomes inefficient.

3. Do not turn every object into a transparent particle. Overdraw and fill rate can dominate even with few draw calls. Compare low-DPR mobile performance as well as desktop.

## Acceptance / stop condition
Record before/after draw calls, frame time and visual differences; never infer a guaranteed 2x speedup.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
