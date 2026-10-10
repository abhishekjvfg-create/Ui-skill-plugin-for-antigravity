# motion accessibility

## Goal
Respect motion sensitivity and control animation explicitly.

## Workflow
1. Detect prefers-reduced-motion before starting animation and listen for changes. Use static geometry or a poster, not an equally intense alternate effect. Never put essential information only in movement.

2. Provide pause for persistent animation and stop when offscreen or the page is hidden. Avoid autoplay sound. Decorative canvases should be aria-hidden while meaningful content stays in HTML.

3. Test toggling the OS preference during playback. Verify controls keep accurate names and pressed state. A user request to stop overrides the creative concept.

## Acceptance / stop condition
No background animation under reduced motion; information and tasks remain available.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
