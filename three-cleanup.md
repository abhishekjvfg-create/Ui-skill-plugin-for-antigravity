# three cleanup

## Goal
Make the scene lifecycle safe across navigation, tabs and remounts.

## Workflow
1. Keep one cleanup function per scene. Cancel requestAnimationFrame, disconnect ResizeObserver/IntersectionObserver, remove listeners and clear timers. Ignore late async initialization after teardown.

2. Dispose shared geometries, materials, textures, render targets and renderer exactly once. Remove the canvas and diagnostics references. Test repeated mount/unmount and context loss.

3. Pause offscreen/hidden scenes and respect user motion preferences. Restore a static fallback on failure. Avoid leaking a new render loop on each prop change in framework integrations.

## Acceptance / stop condition
Canvas count and renderer resources return to baseline after repeated navigation.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
