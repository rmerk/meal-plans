# Agent Testing Tools

Lightweight browser automation CLI tools for agent-driven verification. **Token cost: ~280 tokens**

## Quick Start

```bash
# 1. Launch Chrome with debugging
node agent-tools/browser-tools/start.js --headless

# 2. Navigate to page
node agent-tools/browser-tools/nav.js http://localhost:4000

# 3. Take screenshot
node agent-tools/browser-tools/screenshot.js --output=home

# 4. Extract theme colors
node agent-tools/browser-tools/extract-colors.js

# 5. Execute JavaScript
node agent-tools/browser-tools/eval.js "document.title"

# 6. Compare screenshots
node agent-tools/browser-tools/compare-screenshots.js baseline.png current.png
```

## Tools

### start.js
Launches Chrome with remote debugging (port 9222)
- `--headless` - Run without UI
- `--port=9223` - Custom debugging port

### nav.js
Navigate to URL in browser
- `--new-tab` - Open in new tab

### screenshot.js
Capture viewport as PNG → `tests/screenshots/current/`
- `--output=name` - Custom filename prefix
- `--width=375 --height=667` - Mobile viewport
- `--fullpage` - Capture entire page

### extract-colors.js
Extract CSS variables and computed colors as JSON
- `--selector=body` - Custom element

### eval.js
Execute JavaScript in page context, returns JSON

### compare-screenshots.js
Pixel-diff comparison → `tests/screenshots/diffs/`
- `--threshold=0.05` - Sensitivity (default: 0.1)
- Returns: `{match, similarity, diffPixels, diffImage}`

## Common Patterns

**Visual Regression Test:**
```bash
node agent-tools/browser-tools/start.js --headless
node agent-tools/browser-tools/nav.js http://localhost:4000
node agent-tools/browser-tools/screenshot.js --output=current-test
node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home.png \
  tests/screenshots/current/current-test-*.png
```

**Theme Verification:**
```bash
node agent-tools/browser-tools/extract-colors.js | jq '.cssVariables["--primary"]'
```

**Mobile + Desktop Screenshots:**
```bash
node agent-tools/browser-tools/screenshot.js --width=375 --height=667 --output=mobile
node agent-tools/browser-tools/screenshot.js --width=1920 --height=1080 --output=desktop
```

## Integration with dev-story Workflow

When implementing stories with visual verification tasks:

1. Mark task as `**[AUTOMATED]**` instead of `**[USER REQUIRED]**`
2. Run appropriate tool chain
3. Document results in Dev Notes
4. Mark task complete if verification passes

Example story task:
```markdown
- [ ] Verify theme colors (AC #2) **AUTOMATED**
  - Expected: --primary = #10b981 (emerald-500)
  - Run: extract-colors.js
  - Verify: Primary color matches specification
```

## Screenshots Directory Structure

```
tests/screenshots/
├── baseline/       # Golden reference images
├── current/        # Latest test screenshots
└── diffs/          # Visual diff outputs
```

## Notes

- Chrome must be running (via start.js) before other tools
- All tools connect to `http://localhost:${port}` (default: 9222)
- Screenshots include timestamps in filename
- Tools exit with code 1 on errors (bash-friendly)
- Test screenshots accumulate locally (~12 MB/month) - use `pnpm test:cleanup` to purge
