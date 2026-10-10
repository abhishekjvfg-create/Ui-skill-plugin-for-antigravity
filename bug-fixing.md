# bug fixing

## Goal
Diagnose, patch and regress-test bugs with concrete evidence.

## Workflow
1. Reproduce the failure with exact steps and environment. Read console/network/server traces without exposing secrets. Minimize the case and identify the first wrong state, not only the final symptom.

2. Write a regression test that fails for the issue when feasible. Change the smallest relevant code path. Verify assumptions about asynchronous timing, event ownership, data shape and framework lifecycle.

3. Run focused tests then the wider suite. Compare UI screenshots for visual regressions. The atlas audit command is only a heuristic advisory and does not automatically repair code.

## Acceptance / stop condition
Record cause, patch, passing regression evidence and remaining uncertainty.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
