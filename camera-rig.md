# camera rig

## Goal
Make camera motion legible, restrained and independent from scroll hijacking.

## Workflow
1. Frame the subject for the current aspect ratio. Use conservative field of view and explicit near/far planes. Keep text in screen space and preserve a stable horizon unless the concept requires otherwise.

2. Interpolate targets with a delta-time factor. Clamp pointer ranges and scroll progress. Avoid motion tied directly to raw mouse deltas or unbounded wheel input.

3. Give users pause/skip controls. Reset to a useful static composition for reduced motion. Check camera clipping at narrow aspect ratios and after resize.

## Acceptance / stop condition
No nausea-inducing rapid camera rolls; subject stays framed; controls work without pointer movement.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
