# Verification scope

## Completed: dependency-free automated suite

`npm test` ran successfully with **18 passing tests**, zero failures and zero skipped tests on Linux / Node 22.23.2. The final raw TAP output is `docs/core-test-results.tap`.

The suite covers:
- Skill integrity hashes, 37 workflow documents and exact catalog counts.
- Unique IDs and real named font families with script/weight metadata.
- Four actual color-contrast pairs for all 1,200 palettes.
- Finite executable keyframe records for all 600 motion presets.
- Implementation branches for 12 product/sculpture and 12 background base layouts.
- All 32 UI families, token emission and HTML escaping.
- Runnable output files for every UI family and representative scene/background/motion/structure recipes.
- Scaffold planning, paid-call limits, local Stitch handoff and search behavior.
- Refusal to overwrite output directories, path traversal and symlink rejection.
- Installer dry-run, idempotency, changed-file protection and safe uninstall.
- Loopback preview server restrictions, hostile Host headers and disallowed files/methods.

`doctor` also passed: 57 skill payload files checked, zero integrity errors. Hashes detect accidental changes, not trusted publisher identity.

## Browser checks observed before interruption

The browser run used Playwright 1.58.2 / Chromium 145 on Linux. These five checks reported PASS in the execution log:
1. All 32 UI base families at 360, 768 and 1440px: no horizontal overflow.
2. Tab keyboard navigation, native dialog open/close and focus return.
3. Search empty-state, numeric table sorting and pagination.
4. Contact validation/demo feedback, pricing toggle, quantity and multi-step form.
5. Reduced-motion handling for the WAAPI study.

The run was interrupted before a complete report was saved. **These observations are not a completed end-to-end browser certification.** Do not assume all 3D variants have been visually tested from this partial result.

## Not verified in this release environment

- Completion of the all-scenes WebGL browser test, GPU appearance and real-device performance.
- Every color/density permutation in a browser.
- Native discovery in a signed-in Antigravity client.
- Live authenticated Google Stitch operations.
- Windows/macOS execution or real mobile GPU performance.
- Full screen-reader audit, production hosting, payments, auth or real form delivery.

The browser test source is included so these checks can be completed locally. No reported timing constitutes a 2x performance improvement.

## Reproduce the complete browser run

From a fresh extracted repository, with Node 22+:

```sh
npm install --no-save --package-lock=false playwright@1.58.2
npx playwright install --with-deps chromium
node scripts/prepare-browser.mjs
```

The preparation command creates `generated-demo` and deliberately refuses an existing directory. Review/remove only your previous generated test output if rerunning; never point cleanup commands at your website source.

In one terminal:

```sh
node skills/atlas-studio/scripts/atlas.mjs serve --dir generated-demo --port 3000
```

In another terminal:

```sh
node tests/browser-check.mjs
```

This writes `docs/browser-results.json` and screenshots when the relevant checks complete. The script requires access to the pinned Three.js CDN for normal 3D checks; explicit blocked-CDN tests verify the fallback separately. Software WebGL is suitable for functional checking, not hardware benchmarking.

## Ready-to-run examples

```sh
node skills/atlas-studio/scripts/atlas.mjs serve --dir examples/product-site --port 3000
```

Other included example directories: `examples/3d-background`, `examples/food-scene`. Open http://127.0.0.1:3000. Source is editable. No form submits real data.
