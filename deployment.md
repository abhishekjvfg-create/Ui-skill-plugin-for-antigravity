# deployment

## Goal
Deliver a tested static artifact into the user-approved hosting environment.

## Workflow
1. Inspect the target stack and hosting constraints before choosing commands. The generated demos are static sites; the local Node preview tool is not a production backend.

2. Build and test locally, confirm the deployment destination and request authorization before publishing. Keep credentials in host secrets, never client code.

3. Document rollback, asset paths, CSP/import-map requirements and CDN dependencies. For offline use vendor Three.js with its license and rewrite imports.

## Acceptance / stop condition
No unapproved deployment; final URL and critical routes are checked after publication.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
