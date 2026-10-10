# security

## Goal
Protect credentials, filesystem boundaries and untrusted inputs.

## Workflow
1. Inspect external repository scripts before running. Do not curl-pipe scripts, auto-install unknown dependencies, execute text from generated designs, or disable platform permission prompts.

2. Keep API keys in private client configuration or server-side secrets. Treat exported HTML/SVG as untrusted; sanitize before integrating. Escape user strings and avoid dynamic eval.

3. Use explicit output directories, refuse overwrite by default and reject path traversal/symlinks for installer operations. Hash manifests detect local corruption, not publisher authenticity. Review version provenance.

## Acceptance / stop condition
No credentials in frontend/Git/logs; no unapproved network actions or destructive filesystem operations.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
