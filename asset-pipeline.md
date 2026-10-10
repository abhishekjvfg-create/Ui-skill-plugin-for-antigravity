# asset pipeline

## Goal
Prepare licensed assets for reliable browser delivery.

## Workflow
1. Inventory origin, rights, dimensions, transfer size and purpose. Prefer GLB/glTF with supported compression and correctly configured decoder paths; use KTX2 only when the loader/transcoder setup is tested.

2. Use appropriately sized AVIF/WebP images with width/height and responsive sources. Include poster images for video and accessible alternatives. Keep fonts to required scripts and weights.

3. Budget total first-view assets. Check failed loads and CORS behavior. Never insert secrets into asset URLs or download private assets without authorization.

## Acceptance / stop condition
Every asset has provenance, a failure state and an intentional size budget.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
