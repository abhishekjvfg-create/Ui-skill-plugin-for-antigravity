# typography

## Goal
Use real font metadata to choose expressive, readable typography.

## Workflow
1. Search the fonts catalog by family, category or script. The entries are real Google Fonts metadata, not installed font binaries. Read upstream license and supported weights before using a family.

2. Load at most two families and only required subsets/weights. Use the listed CSS URL or self-host licensed WOFF2 files with the license notice. Set font-display swap and sensible system fallback metrics.

3. Choose display/body contrast deliberately. Test lowercase, numbers, punctuation, Hindi/Devanagari when needed, and mixed scripts. Do not add letter-spacing to scripts where it harms shaping.

## Acceptance / stop condition
No missing glyphs; no invisible text on font failure; heading wrapping and layout shift are acceptable.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
