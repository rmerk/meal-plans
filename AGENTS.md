# Agent Guide: Automated Testing Tools

**Audience:** AI Agents working on meal-plans project
**Purpose:** Enable autonomous verification of visual regression, theme, and layout tasks
**Token Cost:** This document + tool README ≈ 500 tokens (vs 13,000-18,000 for MCP)

## Quick Start (30 Seconds)

### 1. When You See This in a Story:
```markdown
- [ ] Task 5: Verify homepage layout (AC #3) **AUTOMATED**
```

### 2. You Should Do This:
```bash
# Start browser (once per session)
node agent-tools/browser-tools/start.js --headless

# Navigate to page
node agent-tools/browser-tools/nav.js http://localhost:4000

# Run verification (example: screenshot comparison)
node agent-tools/browser-tools/screenshot.js --output=current-desktop --width=1920 --height=1080
node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-desktop.png \
  tests/screenshots/current/current-desktop-*.png

# Parse JSON output, verify similarity ≥ 95%, mark task complete
```

### 3. You Can Now Mark Task Complete:
```markdown
- [x] Task 5: Verify homepage layout (AC #3) **AUTOMATED** ✓
```

---

## Available Tools

### Core Tools (agent-tools/browser-tools/)

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `start.js` | Launch Chrome with debugging | `--headless`, `--port=9222` | Browser running on port |
| `nav.js` | Navigate to URL | URL, `--new-tab` | Page loaded |
| `screenshot.js` | Capture viewport | `--output=name`, `--width=1920`, `--height=1080`, `--fullpage` | PNG file path |
| `extract-colors.js` | Get CSS colors | `--selector=:root` | JSON with CSS vars & computed colors |
| `eval.js` | Execute JavaScript | JavaScript code string | JSON result |
| `compare-screenshots.js` | Compare images | baseline.png, current.png, `--threshold=0.1` | JSON with similarity % |

### npm Script Aliases (Use These for Cleaner Code)

```bash
pnpm test:browser:start      # Start browser
pnpm test:browser:nav <url>  # Navigate
pnpm test:screenshot         # Screenshot
pnpm test:colors             # Extract colors
pnpm test:compare            # Compare images
```

---

## Decision Matrix: When to Use Each Tool

### Use `screenshot.js` + `compare-screenshots.js` when:
- ✅ Task mentions "verify layout", "responsive design", "visual regression"
- ✅ Acceptance criteria include "desktop vs mobile", "theme appearance"
- ✅ Baseline screenshot exists in `tests/screenshots/baseline/`
- ✅ Task marked `**[AUTOMATED]**`

**Example:**
```bash
node agent-tools/browser-tools/screenshot.js --width=375 --height=667 --output=mobile
node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-mobile.png \
  tests/screenshots/current/mobile-*.png
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

**Decision Logic:**
- `similarity >= 95%` → ✅ Mark task complete
- `similarity < 95%` → 🚨 Flag for human review (include diff image path)

### Use `extract-colors.js` when:
- ✅ Task mentions "verify theme colors", "check CSS variables", "validate palette"
- ✅ Acceptance criteria specify color values (e.g., "--primary = #10b981")
- ✅ Need to validate Mountains at Sunrise theme

**Example:**
```bash
node agent-tools/browser-tools/extract-colors.js > current-colors.json
cat current-colors.json | jq '.cssVariables["--primary"]'
# Expected: "#10b981"
```

**Expected Output:**
```json
{
  "cssVariables": {
    "--primary": "#10b981",
    "--background": "#ffffff",
    ...
  },
  "computedColors": {
    "color": "rgba(0, 0, 0, 0.87)",
    "background-color": "rgba(255, 255, 255, 1)"
  },
  "selector": ":root"
}
```

**Decision Logic:**
- Compare extracted colors against AC specifications
- If all colors match → ✅ Mark task complete
- If any mismatch → 🚨 Document discrepancy, flag for review

### Use `eval.js` when:
- ✅ Task requires checking DOM state, element presence, or JavaScript values
- ✅ Need to verify feature flags, configuration, or runtime behavior
- ✅ Testing element attributes, text content, or computed values

**Example:**
```bash
# Check if element exists
node agent-tools/browser-tools/eval.js "document.querySelector('.mobile-nav') !== null"
# Returns: true

# Get page title
node agent-tools/browser-tools/eval.js "document.title"
# Returns: "Meal Plans"

# Check dark mode class
node agent-tools/browser-tools/eval.js "document.documentElement.classList.contains('dark')"
# Returns: false
```

---

## Common Verification Patterns

### Pattern 1: Desktop vs Mobile Layout
```bash
# Start browser once
node agent-tools/browser-tools/start.js --headless
node agent-tools/browser-tools/nav.js http://localhost:4000

# Desktop screenshot
node agent-tools/browser-tools/screenshot.js --width=1920 --height=1080 --output=desktop-test
DESKTOP_RESULT=$(node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-desktop.png \
  tests/screenshots/current/desktop-test-*.png)

# Mobile screenshot
node agent-tools/browser-tools/screenshot.js --width=375 --height=667 --output=mobile-test
MOBILE_RESULT=$(node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-mobile.png \
  tests/screenshots/current/mobile-test-*.png)

# Parse results, verify both ≥ 95% similarity
```

### Pattern 2: Theme Color Validation
```bash
# Start browser + navigate
node agent-tools/browser-tools/start.js --headless
node agent-tools/browser-tools/nav.js http://localhost:4000

# Extract and validate colors
COLORS=$(node agent-tools/browser-tools/extract-colors.js)
PRIMARY=$(echo $COLORS | jq -r '.cssVariables["--primary"]')

if [ "$PRIMARY" = "#10b981" ]; then
  echo "✓ Theme color verified"
  # Mark task complete
else
  echo "✗ Theme color mismatch: Expected #10b981, got $PRIMARY"
  # Flag for review
fi
```

### Pattern 3: Light/Dark Mode Comparison
```bash
# Start browser + navigate
node agent-tools/browser-tools/start.js --headless
node agent-tools/browser-tools/nav.js http://localhost:4000

# Light mode screenshot
node agent-tools/browser-tools/screenshot.js --output=light-mode
LIGHT_COLORS=$(node agent-tools/browser-tools/extract-colors.js)

# Toggle dark mode
node agent-tools/browser-tools/eval.js "document.documentElement.classList.add('dark')"

# Dark mode screenshot
node agent-tools/browser-tools/screenshot.js --output=dark-mode
DARK_COLORS=$(node agent-tools/browser-tools/extract-colors.js)

# Compare colors, verify both modes work
```

### Pattern 4: Full Page Screenshot (Long Content)
```bash
node agent-tools/browser-tools/start.js --headless
node agent-tools/browser-tools/nav.js http://localhost:4000/plans
node agent-tools/browser-tools/screenshot.js --fullpage --output=plans-page
```

---

## Story Task Execution Workflow

### Step 1: Identify Automated Tasks
When you read a story file, look for:
```markdown
### Verification Tasks
- [ ] Task 5: Verify theme colors (AC #2) **AUTOMATED**
- [ ] Task 6: Verify responsive layout (AC #3) **AUTOMATED**
- [ ] Task 7: Test PWA install (AC #4) **USER REQUIRED**
```

**Only execute tasks marked `**[AUTOMATED]**`**

### Step 2: Ensure Dev Server is Running
```bash
# Check if port 4000 is active
lsof -ti :4000

# If not running, start dev server
pnpm dev
# Wait for "Local: http://localhost:4000" message
```

### Step 3: Execute Tool Chain
Select appropriate tools based on task requirements (see Decision Matrix above).

### Step 4: Parse Results & Make Decision
**For screenshot comparison:**
- `similarity >= 95%` → Pass
- `similarity < 95%` → Review required

**For color validation:**
- All colors match specification → Pass
- Any mismatch → Review required

**For DOM checks:**
- Expected elements exist → Pass
- Missing/incorrect → Review required

### Step 5: Document Results in Dev Notes
Append to story's Dev Notes section:

```markdown
## Dev Notes

### Task 5: Theme Color Verification (Automated)
**Test Run:** 2025-11-19T11:30:00Z

**Tool Chain:**
1. Started headless Chrome (port 9222)
2. Navigated to http://localhost:4000
3. Extracted CSS variables via extract-colors.js

**Results:**
- --primary: #10b981 ✓ (matches AC)
- --background: #ffffff ✓ (matches AC)
- --foreground: #000000 ✓ (matches AC)

**Conclusion:** All theme colors match Mountains at Sunrise specification.

**Status:** ✅ Passed

---

### Task 6: Responsive Layout Verification (Automated)
**Test Run:** 2025-11-19T11:31:00Z

**Tool Chain:**
1. Desktop screenshot (1920x1080)
2. Mobile screenshot (375x667)
3. Compare with baseline images

**Results:**
- Desktop: 99.97% similarity (576 diff pixels / 2,073,600 total)
- Mobile: 99.95% similarity (312 diff pixels / 250,125 total)
- Diff images:
  - tests/screenshots/diffs/desktop-diff-2025-11-19T11-31-00.png
  - tests/screenshots/diffs/mobile-diff-2025-11-19T11-31-00.png

**Conclusion:** Layout verified. Minor pixel differences due to timestamp/animation variance.

**Status:** ✅ Passed
```

### Step 6: Mark Task Complete
Update task status:
```markdown
- [x] Task 5: Verify theme colors (AC #2) **AUTOMATED** ✓
- [x] Task 6: Verify responsive layout (AC #3) **AUTOMATED** ✓
```

---

## Troubleshooting

### Issue: Browser Not Starting
```bash
# Check Chrome installation
which google-chrome-stable  # Linux
which chrome                # macOS
ls "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"  # macOS

# If missing, inform user Chrome must be installed
```

### Issue: Navigation Timeout
```bash
# Check dev server is running
curl http://localhost:4000

# If 404, check correct path (might be /meal-plans/)
curl http://localhost:4000/meal-plans/
```

### Issue: Screenshot Differences >5%
**Likely causes:**
- Timestamps rendered on page
- Animations not settled
- Font rendering differences

**Solution:**
- Wait 2-3 seconds before screenshot: `sleep 3 && node agent-tools/...`
- Disable animations via eval: `eval.js "document.body.style.animation = 'none'"`
- Flag for human review if persistent

### Issue: Color Extraction Returns Empty
```bash
# Verify CSS is loaded
node agent-tools/browser-tools/eval.js "getComputedStyle(document.documentElement).getPropertyValue('--primary')"

# If empty, wait for CSS: sleep 2 && extract-colors.js
```

---

## Best Practices

### DO ✅
- Start browser **once** per verification session (reuse connection)
- Always document results in Dev Notes section
- Use `--headless` mode unless debugging
- Compare against baseline screenshots (don't create new baselines without user approval)
- Flag `similarity < 95%` for human review
- Include diff image paths in Dev Notes when flagging
- Use `pnpm test:*` scripts for cleaner code
- Run `pnpm test:cleanup` before test sessions to start with a clean slate

### DON'T ❌
- Don't create new baseline screenshots (those are version controlled)
- Don't mark tasks complete if verification fails
- Don't run tools for `**[USER REQUIRED]**` tasks
- Don't skip documenting results (always update Dev Notes)
- Don't assume 100% similarity (99%+ is acceptable)
- Don't use headed mode (slows down automation)

### Screenshot Cleanup 🧹
Test screenshots accumulate locally in `tests/screenshots/current/` and `tests/screenshots/diffs/`:
- **These are .gitignored** - Won't bloat the repository
- **Accumulate ~12 MB/month** on local disk (negligible on modern storage)
- **Baseline screenshots stay in git** (`tests/screenshots/baseline/`)

**To clean up test screenshots:**
```bash
pnpm test:cleanup
```

This purges all test outputs (current/ and diffs/) while keeping baseline screenshots intact.

**Recommended:** Run cleanup before starting new test sessions for a fresh slate.

---

## Full Example: Automated Story Completion

**Story Task:**
```markdown
- [ ] Task 5: Verify homepage layout matches design (AC #3) **AUTOMATED**
  - Desktop viewport (1920x1080) matches baseline
  - Mobile viewport (375x667) matches baseline
  - Similarity threshold: ≥ 95%
```

**Agent Execution:**
```bash
# 1. Start browser
node agent-tools/browser-tools/start.js --headless

# 2. Navigate to homepage
node agent-tools/browser-tools/nav.js http://localhost:4000

# 3. Desktop verification
node agent-tools/browser-tools/screenshot.js \
  --output=verify-desktop \
  --width=1920 \
  --height=1080

DESKTOP_RESULT=$(node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-desktop.png \
  tests/screenshots/current/verify-desktop-*.png)

DESKTOP_SIMILARITY=$(echo $DESKTOP_RESULT | jq -r '.similarity')

# 4. Mobile verification
node agent-tools/browser-tools/screenshot.js \
  --output=verify-mobile \
  --width=375 \
  --height=667

MOBILE_RESULT=$(node agent-tools/browser-tools/compare-screenshots.js \
  tests/screenshots/baseline/home-mobile.png \
  tests/screenshots/current/verify-mobile-*.png)

MOBILE_SIMILARITY=$(echo $MOBILE_RESULT | jq -r '.similarity')

# 5. Decision logic
if (( $(echo "$DESKTOP_SIMILARITY >= 95" | bc -l) )) && \
   (( $(echo "$MOBILE_SIMILARITY >= 95" | bc -l) )); then
  echo "✓ Verification passed"
  # Mark task complete, document in Dev Notes
else
  echo "✗ Verification failed"
  # Flag for review, include diff paths
fi
```

**Agent Updates Story:**
```markdown
- [x] Task 5: Verify homepage layout matches design (AC #3) **AUTOMATED** ✓

## Dev Notes

### Task 5: Homepage Layout Verification (Automated)
**Test Run:** 2025-11-19T12:00:00Z

**Results:**
- Desktop (1920x1080): 99.97% similarity ✓
- Mobile (375x667): 99.95% similarity ✓
- Both exceed 95% threshold

**Status:** ✅ Passed
```

---

## Additional Resources

- **Tool Documentation:** [agent-tools/README.md](./agent-tools/README.md)
- **Workflow Integration:** [agent-tools/WORKFLOW_INTEGRATION.md](./agent-tools/WORKFLOW_INTEGRATION.md)
- **Baseline Screenshots:** `tests/screenshots/baseline/`
- **Article Reference:** [What if you don't need MCP?](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)

---

**Token Budget:** This guide + README.md ≈ 500 tokens total (98% cheaper than MCP servers)

**Questions?** Read the full documentation in `agent-tools/README.md` and `agent-tools/WORKFLOW_INTEGRATION.md`
