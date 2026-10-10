# internationalization

## Goal
Support the actual languages and scripts in the brief.

## Workflow
1. Identify language, script, direction and locale-specific formatting. Use lang attributes and Intl for numbers/dates where appropriate.

2. Choose fonts with required glyph coverage. Use logical CSS properties and test RTL if needed. Avoid concatenating translated sentence fragments.

3. Test long translations, Hindi text shaping, mixed Latin/script numerals and translated form errors. Do not stretch letter spacing in scripts that depend on connected shaping.

## Acceptance / stop condition
No missing glyphs or clipped text; reading/focus order remains correct.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
