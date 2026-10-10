# Third-party references and provenance

## Original toolkit
The router, workflows, component code, catalog builders, keyframes, procedural geometry and SVG generators are original Atlas Studio toolkit code under MIT. Third-party libraries, names and metadata retain their upstream rights. No official Google, Figma or Three.js affiliation is claimed.

## Three.js
Version 0.180.0 is loaded from jsDelivr by generated 3D pages. Project: https://threejs.org/ . License: MIT; retain the upstream notice if vendoring core/addons: https://github.com/mrdoob/three.js/blob/r180/LICENSE . Three.js binaries are not bundled. Without CDN access the HTML content and static composition remain available.

## Google Fonts
Metadata source: https://fonts.google.com/metadata/fonts . Snapshot retrieved 2026-10-09. The frozen source is `skills/atlas-studio/resources/font-source.json`; normalized references are in that skill's `resources/catalogs/fonts.json`. There are 1,950 entries marked open-source by the upstream snapshot. No font binaries are bundled. Copyright and license vary by family: check each upstream family page before self-hosting, redistribution or modification and retain required notices. Loading fonts from Google contacts external servers; consider licensed self-hosting for privacy-sensitive projects. A metadata entry is not a blanket license grant.

## Compatibility documentation
Guidance was checked against:
- https://antigravity.google/docs/skills/
- https://codelabs.developers.google.com/antigravity/how-to-create-agent-skills-for-antigravity-cli
- https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch

These are references, not redistributed full documents. The direct Stitch docs page did not expose a useful readable API schema in this environment; the pack uses native authenticated tool discovery instead of invented methods or configuration paths.

## User reference videos
Five user-supplied clips informed composition, metallic product presentation, oversized typography and ingredient choreography. No clips, soundtracks, screenshots, original-brand labels, textures or models are bundled. The ATLAS label and procedural forms are original starter graphics. Visual analysis cannot prove the reference creator used Three.js, GSAP or a specific rendering engine.

## Optional test tools
Browser verification uses separately installed Playwright 1.58.2 (Apache-2.0) and Chromium. Those dependencies/binaries are not bundled or required to run the local toolkit. Their upstream notices apply when installing them.
