# accessible components

## Goal
Implement interaction patterns completely rather than by appearance alone.

## Workflow
1. Prefer details/summary for simple disclosures and dialog.showModal for dialogs. Return focus on close. Use roving tabindex and Arrow/Home/End keys for tabs.

2. Give tables captions and headers; announce sorting through aria-sort. Keep buttons as buttons and links as navigation. Disabled states must reflect actual availability.

3. Test Escape, Tab/Shift+Tab, Enter, Space and selection changes. Avoid nested interactive elements and clickable divs. Keep hidden panels genuinely hidden.

## Acceptance / stop condition
The full documented keyboard pattern works; no focus escapes or inaccessible controls.

## Evidence to retain
Relevant file paths, exact commands actually run, observed outcomes and unresolved limitations. Ask before destructive changes or external paid operations.
