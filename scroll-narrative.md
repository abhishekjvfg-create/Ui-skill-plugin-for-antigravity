# scroll narrative

## Goal
Create progressive scroll stories without taking over input.

## Workflow
1. Structure the story in semantic sections before attaching motion. Keep native scrolling. Map clamped progress to scene properties and preserve useful content when scripts fail.

2. Use IntersectionObserver for section activation, or an existing compatible scroll library only when needed. Recompute measurements after font/image load and resize. Avoid multiple animation systems controlling the same property.

3. For reduced motion use static sections and no pinned camera travel. Test keyboard PageDown/Home/End and browser find. Keep sticky layers below critical controls.

## Acceptance / stop condition
Content can be read in DOM order; no scroll traps; all sections accessible with keyboard.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
