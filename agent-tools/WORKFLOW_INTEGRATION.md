# BMM Workflow Integration Guide

## Overview

This guide explains how to integrate agent testing tools with the BMM (Build-Measure-Maintain) dev-story workflow for automated verification tasks.

## Current Manual Pattern (Before Automation)

Story files contain verification tasks marked `**[USER REQUIRED]**`:

```markdown
### Verification Tasks (Runtime Testing Required)
- [ ] Task 6: Run Lighthouse PWA audit (AC #5) **BLOCKING**
  - [ ] **[USER REQUIRED]** Serve production build
  - [ ] **[USER REQUIRED]** Run Lighthouse audit
  - [ ] **[USER REQUIRED]** Verify score = 100
  - [ ] **[USER REQUIRED]** Document results in Dev Notes
```

**Problem:** Agent cannot complete story end-to-end. Human must manually test runtime behavior.

## New Automated Pattern (With Agent Tools)

Tasks marked `**[AUTOMATED]**` can be verified by agents autonomously:

```markdown
### Verification Tasks (Automated + Manual)
- [ ] Task 6: Verify theme colors match specification (AC #2) **AUTOMATED**
  - Expected: --primary = #10b981 (emerald-500)
  - Expected: Background = rgba(255, 255, 255, 1) in light mode
  - Agent runs:
    - node agent-tools/browser-tools/start.js --headless
    - node agent-tools/browser-tools/nav.js http://localhost:4000
    - node agent-tools/browser-tools/extract-colors.js > colors.json
  - Agent verifies: Primary color = #10b981
  - Agent marks task complete if verification passes
  - [x] Automated verification passed ✓

- [ ] Task 7: Verify responsive layout (desktop vs mobile) **AUTOMATED**
  - Agent captures screenshots:
    - node agent-tools/browser-tools/screenshot.js --width=1920 --height=1080 --output=desktop
    - node agent-tools/browser-tools/screenshot.js --width=375 --height=667 --output=mobile
  - Agent compares with baseline:
    - node agent-tools/browser-tools/compare-screenshots.js baseline-desktop.png current-desktop.png
  - Agent verifies: Similarity ≥ 95%
  - Agent marks task complete if comparison passes
  - [x] Automated verification passed ✓
```

**Benefit:** Agent completes verification autonomously. Human only reviews results or handles edge cases.

## Decision Criteria: When to Use Automation

### ✅ Good Candidates for `**[AUTOMATED]**`

- **Visual Regression:** Theme colors, layout, responsive breakpoints
- **DOM Verification:** Element presence, text content, attributes
- **CSS Validation:** Computed styles, CSS custom properties
- **Screenshot Comparison:** Desktop vs mobile, light vs dark mode
- **JavaScript Execution:** Feature detection, state validation
- **URL/Routing:** Navigation flows, base URL correctness

### ❌ Keep as `**[USER REQUIRED]**`

- **Subjective Quality:** Visual design aesthetics, UX feel
- **Complex User Flows:** Multi-step interactions requiring judgment
- **PWA Install:** Actual device install testing, platform-specific behavior
- **Lighthouse Scores:** Full audit with performance/accessibility insights
- **Offline Functionality:** Real-world network conditions
- **Hardware Features:** Camera, microphone, geolocation testing

## Implementation Steps

### 1. Update Story Template

When drafting a story, identify verification tasks that can be automated:

```markdown
## Acceptance Criteria
1. Theme color configuration matches Mountains at Sunrise palette
2. Light/dark mode switching works correctly
3. Mobile and desktop layouts render responsively

## Tasks

### Implementation Tasks
- [x] Configure Tailwind CSS theme colors
- [x] Implement dark mode toggle

### Verification Tasks
- [ ] Task 1: Verify theme colors (AC #1) **AUTOMATED**
  - Expected: --primary = #10b981
  - Agent extracts colors and validates

- [ ] Task 2: Verify dark mode toggle (AC #2) **USER REQUIRED**
  - User manually tests toggle behavior
  - User verifies smooth transition
```

### 2. Agent Execution During dev-story Workflow

When the agent encounters `**[AUTOMATED]**` tasks:

1. **Start Browser:** `node agent-tools/browser-tools/start.js --headless`
2. **Navigate to Page:** `node agent-tools/browser-tools/nav.js http://localhost:4000`
3. **Run Verification:** Execute appropriate tool chain (screenshot, extract-colors, eval, etc.)
4. **Parse Results:** Check JSON output or exit codes
5. **Mark Complete:** If verification passes, mark task as `[x]`
6. **Document Results:** Add verification output to Dev Notes section

### 3. Example: Automated Visual Regression Test

**Story Task:**
```markdown
- [ ] Task 5: Verify homepage layout matches design (AC #3) **AUTOMATED**
```

**Agent Execution:**
```bash
# Start browser (if not running)
node agent-tools/browser-tools/start.js --headless

# Navigate to homepage
node agent-tools/browser-tools/nav.js http://localhost:4000

# Capture desktop screenshot
node agent-tools/browser-tools/screenshot.js --output=current-desktop --width=1920 --height=1080

# Compare with baseline
node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-desktop.png \
  tests/screenshots/current/current-desktop-*.png
```

**Expected Output:**
```json
{
  "match": false,
  "similarity": 99.97,
  "diffPixels": 576,
  "totalPixels": 2073600,
  "diffImage": "tests/screenshots/diffs/diff-2025-11-19T11-01-44.png"
}
```

**Agent Decision Logic:**
- If `similarity >= 95`: Mark task complete, document results
- If `similarity < 95`: Flag for human review, attach diff image

### 4. Update Dev Notes

After automated verification, agent appends results:

```markdown
## Dev Notes

### Task 5: Homepage Layout Verification (Automated)

**Test Run:** 2025-11-19T11:01:44Z

**Results:**
- Desktop screenshot: ✓ 99.97% similarity to baseline
- Diff pixels: 576 / 2,073,600 (minor animation variance)
- Diff image: tests/screenshots/diffs/diff-2025-11-19T11-01-44.png

**Conclusion:** Layout verified successfully. Minor pixel differences due to timestamp rendering.

**Status:** ✅ Passed
```

## Future Enhancements

### Phase 1 (Current)
- ✅ Core CLI tools (start, nav, screenshot, eval, extract-colors, compare-screenshots)
- ✅ Visual regression testing for Stories 1.2 & 1.5
- ✅ Agent-facing documentation
- ⏳ Workflow integration (manual execution)

### Phase 2 (Planned)
- ⬜ PWA verification tool (service worker registration, offline mode)
- ⬜ Lighthouse CLI integration
- ⬜ Accessibility testing (axe-core)
- ⬜ Network throttling simulation

### Phase 3 (Planned)
- ⬜ Automatic tool selection based on task description
- ⬜ Retry logic for flaky tests
- ⬜ Parallel test execution
- ⬜ CI/CD integration (GitHub Actions)

## Troubleshooting

### Common Issues

**1. Browser Not Starting**
```bash
# Check if Chrome is installed
which google-chrome-stable  # Linux
which chrome                # macOS

# Try manual start
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

**2. Screenshots Have Minor Differences**
- **Timestamps:** Disable timestamp rendering in dev mode
- **Animations:** Add `--wait` flag to allow animations to settle
- **Fonts:** Ensure consistent font rendering (use web fonts, not system fonts)

**3. Color Extraction Returns Empty**
- **Timing:** Wait for CSS to load (add delay before extraction)
- **Selector:** Verify element exists (use browser DevTools)

## Additional Resources

- [Agent Tools README](./README.md) - Complete tool documentation
- [Article: What if you don't need MCP?](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/) - Original approach inspiration
- [Puppeteer Docs](https://pptr.dev/) - Underlying browser automation API
- [pixelmatch](https://github.com/mapbox/pixelmatch) - Screenshot comparison library
