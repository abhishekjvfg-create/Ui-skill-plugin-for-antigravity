# procedural geometry

## Goal
Build reusable mathematical forms without generating wasteful geometry.

## Workflow
1. Use lathe profiles for bottles, curves/tubes for ribbons and pasta, instancing for repeated forms, and Points for dust or starfields. Choose segment counts based on projected screen size.

2. Make generation deterministic with a seeded PRNG. Update bounding boxes/spheres after vertex edits when culling requires it. Compute normals after deformation and validate winding/side settings.

3. Cache shared geometry/materials. Avoid rebuilding meshes every frame. Separate geometry parameters from color/material treatment so presets are honest combinations.

## Acceptance / stop condition
No NaNs, missing normals or exploding bounds; geometry count and GPU allocations remain stable.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
