# testing

## Goal
Validate generated output at several levels with reproducible commands.

## Workflow
1. Run syntax/build checks, unit tests for pure logic, integration tests for data boundaries and browser tests for real flows. Label mocked services explicitly.

2. Exercise 360/768/1440px layouts, reduced motion, offline/CDN failure and invalid form input. Test dialogs, tabs, sorting, search, pagination and contact feedback.

3. Inspect console exceptions and failed requests. Save screenshots and machine-readable results. Do not mark a test passed because the page merely returned HTTP 200.

## Acceptance / stop condition
Report command, environment, result and scope; distinguish source checks from browser/device and live-service tests.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
