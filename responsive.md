# responsive

## Goal
Make the design fluid rather than merely shrinking the desktop view.

## Workflow
1. Begin with a 360px content layout and test 768px and 1440px as well. Use content-driven breakpoints, CSS grid minmax and clamp for type. Avoid fixed heights for text containers.

2. Preserve touch targets of roughly 44px, visible focus, adequate gutters and readable measures. Stack complex product stories on mobile; reduce canvas complexity and reserve layout space.

3. Test horizontal overflow with document.scrollWidth against clientWidth. Test 200% zoom, landscape orientation and long navigation labels. Keep sticky regions from covering focused controls.

## Acceptance / stop condition
No accidental horizontal scrolling; all actions remain reachable without hovering.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
