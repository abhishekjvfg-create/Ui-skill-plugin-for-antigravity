# design tokens

## Goal
Create a small reusable visual vocabulary rather than arbitrary per-component values.

## Workflow
1. Inventory existing tokens first. Define semantic roles: background, surface, text, muted, accent, on-accent, border, success, warning and error. Select spacing from a deliberate scale.

2. Use CSS custom properties for colors, spacing, radii, elevation and timing. Keep primitive tokens separate from semantic aliases. Export JSON for design handoff, preserving names and units.

3. Check hover, focus, disabled, error and selected states. Avoid declaring every element premium through gradients. Change a root token and verify that related components adapt coherently.

## Acceptance / stop condition
CSS and exported JSON agree; text/button contrast is measured and all interactive states have tokens.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
