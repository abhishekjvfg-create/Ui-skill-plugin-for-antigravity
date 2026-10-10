# forms states

## Goal
Create honest validated forms with robust feedback.

## Workflow
1. Use label, name, autocomplete, input type and native validation. Add server validation when connected; never rely solely on HTML constraints. Preserve user input on recoverable failures.

2. Provide idle, submitting, success and failure states. Prevent duplicate submissions where appropriate. Use role=status for nonurgent feedback and associate errors with fields.

3. If no backend is configured, explicitly label the form a local demo and never claim delivery or subscription. Do not persist personal input unnecessarily.

## Acceptance / stop condition
Invalid input is explained; failures can be retried; success only reflects a real operation or clearly labeled simulation.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
