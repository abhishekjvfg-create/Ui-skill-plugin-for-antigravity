# color contrast

## Goal
Choose colors by role and verify actual readable contrast.

## Workflow
1. Inspect palette tokens and numeric contrast ratios. Metadata checks cover specified pairs only, not every composited gradient, image overlay or UI state.

2. Target at least 4.5:1 for normal text and 3:1 for large text. Check non-text control boundaries and focus indicators separately. Place a stable scrim behind text over moving backgrounds.

3. Never convey status through color alone. Use labels, icons with text, patterns or position. Verify disabled, hover, selected and error states on real rendered backgrounds.

## Acceptance / stop condition
List tested foreground/background pairs and thresholds; manually inspect gradients and 3D overlays.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
