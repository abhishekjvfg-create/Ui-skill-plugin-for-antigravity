# performance

## Goal
Optimize based on measurement, not on impressive-sounding library choices.

## Workflow
1. Collect bundle bytes, asset sizes, LCP, CLS and INP using appropriate tools. Suggested targets: LCP <=2.5s, CLS <=0.1, INP <=200ms on representative devices; these are goals, not claimed test results.

2. Use a 1–1.5 DPR cap for heavy scenes, compressed textures, lazy noncritical 3D and static fallbacks. Measure draw calls and frame time before instancing or reducing segments.

3. Pause hidden/offscreen loops. Avoid multiple full-screen canvases. Defer expensive postprocessing and treat mobile as a distinct quality tier. Report lab limitations and network conditions.

## Acceptance / stop condition
Deliver observed metrics and an optimization diff; do not claim a benchmark that was not run.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
