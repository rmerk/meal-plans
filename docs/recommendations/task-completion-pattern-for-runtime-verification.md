# Task Completion Pattern: Runtime Verification Tasks

**Date:** 2025-11-17
**Author:** Ryan
**Context:** Identified during Story 1.3 code review
**Status:** Recommendation for BMM workflow enhancement

---

## Problem Statement

Stories involving runtime behavior (PWA, UI, animations, API integrations) have a completion ambiguity:

**Traditional Task Pattern:**
```markdown
- [x] Task 5: Run Lighthouse PWA audit
  - [x] Build production version
  - [x] Serve production build
  - [x] Run PWA audit
  - [x] Verify PWA score = 100
```

**Actual Reality:**
- ✅ Configuration code written
- ✅ Production build successful
- ❌ Lighthouse audit NOT actually run (deferred to user)
- ❌ PWA score NOT verified

**Result:** Tasks marked [x] complete create false impression of completion when acceptance criteria are not met.

---

## Root Cause

Runtime verification tasks have **two distinct phases**:

1. **Implementation Phase:** Write code, configure modules, generate artifacts
2. **Verification Phase:** Test runtime behavior in browser/device/environment

Current task structure conflates these phases, leading to:
- Tasks marked complete when only implementation is done
- Acceptance criteria marked "met" without actual verification
- Dev Notes with "User Action Required" disclaimers that contradict task checkboxes
- Code reviews unable to verify runtime behavior

---

## Proposed Solution: Two-Phase Task Structure

### Pattern 1: Explicit Separation (Recommended)

Separate implementation tasks from verification tasks explicitly:

```markdown
## Tasks / Subtasks

### Implementation Tasks

- [x] Task 1: Configure @vite-pwa/nuxt in nuxt.config.ts
  - [x] Add pwa configuration section
  - [x] Set strategies to 'generateSW'
  - [x] Configure manifest with required properties
  - [x] Set theme colors (#192E59, #F2CC85)

- [x] Task 2: Create PWA icons
  - [x] Generate icon-192.png (192x192)
  - [x] Generate icon-512.png (512x512)
  - [x] Add icons array to manifest

- [x] Task 3: Configure Workbox caching strategies
  - [x] Set navigateFallback to '/'
  - [x] Configure runtime caching (Fonts, Images, HTML)

### Verification Tasks (User/Manual Testing Required)

- [ ] Task 4: Verify service worker registration in DevTools
  - [ ] Run dev server: pnpm dev
  - [ ] Open Chrome DevTools → Application → Service Workers
  - [ ] Verify service worker shows "activated and running"
  - [ ] Check Manifest tab for correct configuration

- [ ] Task 5: Run Lighthouse PWA audit (AC #5)
  - [ ] Build production: pnpm generate
  - [ ] Serve build: npx serve .output/public
  - [ ] Run Lighthouse PWA audit in Chrome DevTools
  - [ ] **Verify PWA score = 100** (screenshot result)
  - [ ] Document results in Dev Notes

- [ ] Task 6: Test offline functionality (AC #6)
  - [ ] Load app with network connection
  - [ ] Visit multiple pages
  - [ ] DevTools → Network → Set Offline
  - [ ] **Verify pages load from cache**
  - [ ] Verify navigation works offline
```

**Benefits:**
- ✅ Clear distinction between "code written" and "behavior verified"
- ✅ Verification tasks remain unchecked until actually tested
- ✅ Code review can approve implementation tasks, flag verification gaps
- ✅ No ambiguity about story completion status

---

### Pattern 2: Inline Verification Checkboxes

Keep tasks together but mark verification steps distinctly:

```markdown
- [x] Task 5: Run Lighthouse PWA audit (AC #5)
  - [x] Build production version: pnpm generate
  - [x] Serve production build: npx serve .output/public
  - [x] Open Chrome DevTools → Lighthouse tab
  - [ ] **[VERIFY]** Run PWA audit and achieve score = 100
  - [ ] **[VERIFY]** Screenshot results
  - [ ] **[VERIFY]** Document Lighthouse results in Dev Notes
```

**Convention:** `[VERIFY]` prefix indicates runtime verification step that cannot be skipped.

**Benefits:**
- ✅ Tasks stay logically grouped
- ✅ Visual distinction between implementation and verification
- ✅ Quick scan shows what's actually tested vs. just configured

---

### Pattern 3: Verification Checklist Appendix

Add verification checklist at end of story:

```markdown
## Acceptance Verification Checklist

**Instructions:** Complete this checklist before marking story "ready-for-review".

- [ ] **AC #1:** Verified PWA manifest in DevTools → Application → Manifest
  - [ ] name: "Meal Plans"
  - [ ] theme_color: #192E59
  - [ ] background_color: #F2CC85
  - [ ] icons: 192x192, 512x512

- [ ] **AC #5:** Lighthouse PWA audit score = 100 (screenshot attached)

- [ ] **AC #6:** Offline functionality tested
  - [ ] Loaded app online, visited 3+ pages
  - [ ] Went offline (DevTools Network → Offline)
  - [ ] All visited pages loaded from cache
  - [ ] Navigation worked offline

**If any checklist item is unchecked, story is NOT complete.**
```

**Benefits:**
- ✅ Clear "Definition of Done" criteria
- ✅ Cannot accidentally mark story complete without verification
- ✅ Code reviewer can audit checklist compliance

---

## Story Types Requiring Verification Tasks

Apply this pattern to stories involving:

| Story Type | Why Verification Needed | Examples |
|------------|-------------------------|----------|
| **PWA Features** | Runtime service worker behavior | Offline caching, install prompts, app shortcuts |
| **UI Components** | Visual rendering and interactions | Animations, responsive layouts, touch gestures |
| **API Integrations** | Network behavior and error handling | External API calls, timeout handling, retries |
| **Performance** | Actual metrics vs. theoretical | Lighthouse scores, bundle sizes, load times |
| **Accessibility** | Screen reader compatibility | ARIA labels, keyboard navigation, focus management |
| **Cross-Browser** | Browser-specific rendering | Safari vs Chrome, iOS vs Android |
| **Mobile Features** | Device-specific APIs | Haptic feedback, geolocation, camera access |
| **Analytics/Tracking** | Event firing verification | Click tracking, page views, conversion events |

**Rule of Thumb:** If acceptance criteria includes "verify", "test", "measure", or "audit", use verification task pattern.

---

## Implementation in BMM Workflows

### For Story Creation Workflow (`create-story`)

Update story template to include verification section:

```yaml
# In story template
task_structure:
  - implementation_tasks: []  # Code/config tasks
  - verification_tasks: []    # Runtime testing tasks
  - verification_checklist: []  # AC verification checklist
```

### For Dev-Story Workflow (`dev-story`)

Add validation before marking story ready for review:

```markdown
## Before Marking Story "Review"

1. All implementation tasks [x] complete
2. All verification tasks [x] complete OR documented as "User Action Required"
3. If verification deferred:
   - Add "User Action Required" section to Dev Notes
   - Mark story status as "ready-for-verification" (not "review")
   - Update sprint status to "verification-pending"
```

### For Code-Review Workflow (`code-review`)

Update review checklist to distinguish implementation vs. verification:

```markdown
## Task Completion Validation

For each task marked [x] complete:
1. If implementation task → Verify code exists with evidence
2. If verification task → Check for test results/screenshots/metrics
3. If verification task marked [x] but no evidence → **HIGH SEVERITY** finding

**Zero tolerance for falsely marked verification tasks.**
```

---

## Migration Path for Existing Stories

### For Active Stories (in-progress, review):

1. Read existing task structure
2. Identify verification tasks (keywords: test, verify, audit, measure)
3. If verification tasks marked [x] but no evidence:
   - Uncheck verification subtasks
   - Add "Verification Pending" section to Dev Notes
   - Update story status to "verification-pending"

### For Backlog Stories:

1. Update task structure using Pattern 1 (explicit separation)
2. Add "Verification Checklist" section
3. Update acceptance criteria to reference verification checklist

---

## Acceptance Criteria for This Recommendation

To formalize this recommendation, complete:

- [ ] **Decide on Pattern:** Choose Pattern 1, 2, or 3 (Recommendation: Pattern 1)
- [ ] **Update BMM Templates:** Modify story template with verification section
- [ ] **Update Workflows:** Integrate into `create-story`, `dev-story`, `code-review`
- [ ] **Document Convention:** Add to project README or architecture.md
- [ ] **Migrate Active Story:** Apply pattern to Story 1.3 as proof-of-concept
- [ ] **Team Review:** Get feedback from other contributors (if applicable)

---

## Example: Story 1.3 Refactored with Pattern 1

### Before (Current):

```markdown
## Tasks / Subtasks

- [x] Task 5: Run Lighthouse PWA audit (AC: #5)
  - [x] Build production version: pnpm generate
  - [x] Serve production build: npx serve dist
  - [x] Open Chrome DevTools → Lighthouse
  - [x] Run PWA audit (ensure HTTPS or localhost)
  - [x] Verify PWA score = 100
  - [x] Address any failing PWA criteria
  - [x] Document Lighthouse results in Dev Notes
```

**Problem:** All checked, but audit never run. Dev Notes say "User Action Required".

### After (Pattern 1):

```markdown
## Tasks / Subtasks

### Implementation Tasks

- [x] Task 1: Configure @vite-pwa/nuxt in nuxt.config.ts
  - [x] Add complete PWA configuration section
  - [x] Configure manifest with theme colors
  - [x] Configure Workbox caching strategies

- [x] Task 2: Create PWA icons
  - [x] Generate icon-192.png and icon-512.png
  - [x] Add icons array to manifest

### Verification Tasks

- [ ] Task 3: Verify PWA configuration in DevTools
  - [ ] Check Application → Service Workers (should show "activated")
  - [ ] Check Application → Manifest (verify all properties correct)

- [ ] Task 4: Run Lighthouse PWA audit (AC #5) **BLOCKING**
  - [x] Build production: pnpm generate (completed)
  - [x] Serve build: npx serve .output/public (verified working)
  - [ ] **[USER REQUIRED]** Run Lighthouse PWA audit
  - [ ] **[USER REQUIRED]** Verify PWA score = 100
  - [ ] **[USER REQUIRED]** Screenshot and document results

- [ ] Task 5: Test offline functionality (AC #6) **BLOCKING**
  - [ ] **[USER REQUIRED]** Load app, visit pages
  - [ ] **[USER REQUIRED]** DevTools → Network → Offline
  - [ ] **[USER REQUIRED]** Verify all pages load from cache
  - [ ] **[USER REQUIRED]** Document offline test results
```

**Result:** Clear distinction. Story cannot be marked "done" with unchecked verification tasks.

---

## References

- **Source:** Story 1.3 code review findings (2025-11-17)
- **Related Patterns:** Definition of Done (DoD), Acceptance Test-Driven Development (ATDD)
- **BMM Context:** Phase 4 Implementation workflows (dev-story, code-review)

---

## Questions for Formalization

1. **Which pattern do you prefer?** (Pattern 1, 2, or 3)
2. **Should we add new story status?** (e.g., "verification-pending" between "in-progress" and "review")
3. **Who performs verification?** (Dev before review? User/QA? Code reviewer?)
4. **What if verification can't be done?** (e.g., no test environment) - Accept story anyway?
5. **Apply retroactively?** Refactor existing stories or only apply to new stories?

---

**Next Steps:**
1. Discuss pattern choice with team/user
2. Update story template (`.bmad/bmm/workflows/4-implementation/create-story/template.md`)
3. Update dev-story workflow instructions
4. Update code-review workflow to validate verification tasks
5. Apply pattern to Story 1.3 as pilot
6. Document pattern in project architecture.md or README.md
