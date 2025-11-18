# Runtime Verification Pattern - Quick Reference

**TL;DR:** Separate implementation tasks (code) from verification tasks (testing) to prevent false completion.

---

## When to Use This Pattern

Use Pattern 1 if your story has **any** of these:

- ✅ "Verify", "test", "audit", "measure" in acceptance criteria
- ✅ Lighthouse scores or performance metrics
- ✅ Browser testing (PWA, UI, animations, responsive)
- ✅ Manual QA required (accessibility, cross-browser, device testing)
- ✅ Runtime behavior that can't be validated through code review

**Rule of thumb:** Can a code reviewer verify this by reading code? NO = use this pattern.

---

## Template Structure

```markdown
## Tasks / Subtasks

### Implementation Tasks (Code & Configuration)

- [x] Task 1: Write code/config
  - [x] Subtask: Specific implementation step
  - [x] Subtask: Another implementation step

- [x] Task 2: Build/generate artifacts
  - [x] Subtask: Run build command
  - [x] Subtask: Verify output files exist

### Verification Tasks (Runtime Testing Required)

**Note:** These tasks require manual browser/device testing.

- [ ] Task 3: Test feature X (AC #Y) **BLOCKING**
  - [x] Prerequisites: Build ready, server running
  - [ ] **[USER REQUIRED]** Manual test step 1
  - [ ] **[USER REQUIRED]** Manual test step 2
  - [ ] **[USER REQUIRED]** Document results

- [ ] Task 4: Verify metrics (AC #Z)
  - [ ] **[USER REQUIRED]** Run audit tool
  - [ ] **[USER REQUIRED]** Screenshot results
  - [ ] **[USER REQUIRED]** Verify score/metric

### Acceptance Verification Checklist

- [x] **AC #1:** Code-verifiable criterion ✓
- [ ] **AC #2:** Runtime-verifiable criterion **[USER REQUIRED]** ✗
```

---

## Key Conventions

| Convention | Meaning |
|------------|---------|
| `### Implementation Tasks` | Code writing, config, build - code reviewable |
| `### Verification Tasks` | Browser testing, audits, manual QA - requires runtime |
| `**[USER REQUIRED]**` | This step MUST be done by human, cannot skip |
| `**BLOCKING**` | This task blocks story completion (maps to AC) |
| `### Acceptance Verification Checklist` | Final gate - story can't be "done" with unchecked items |

---

## Example: PWA Story

### ✗ WRONG (Old Way)

```markdown
- [x] Task: Configure PWA
- [x] Task: Run Lighthouse audit
  - [x] Run audit ❌ NOT ACTUALLY DONE
  - [x] Verify score = 100 ❌ LIE
```

**Problem:** All checked but audit never run. False completion.

### ✓ CORRECT (Pattern 1)

```markdown
### Implementation Tasks
- [x] Task 1: Configure PWA in nuxt.config.ts
  - [x] Add manifest
  - [x] Configure service worker

### Verification Tasks
- [ ] Task 2: Run Lighthouse audit (AC #5) **BLOCKING**
  - [x] Build ready
  - [ ] **[USER REQUIRED]** Run audit
  - [ ] **[USER REQUIRED]** Score = 100

### Acceptance Verification Checklist
- [x] AC #1-4: Code verified ✓
- [ ] AC #5: Lighthouse score **[USER REQUIRED]** ✗
```

**Result:** Honest status. User knows what's needed.

---

## Benefits

1. **No False Completions:** Verification tasks stay unchecked until actually tested
2. **Clear Responsibilities:** Code = dev, Testing = user/QA
3. **Code Review Friendly:** Reviewer can validate implementation, flag verification gaps
4. **Honest Progress:** Story status reflects reality, not aspiration

---

## For Developers Creating Stories

When you see AC like "verify PWA score = 100":

1. **Implementation Task:** Configure PWA code
2. **Verification Task:** Run Lighthouse audit (mark **[USER REQUIRED]**)

When writing tasks, ask: "Can I verify this by reading code?"
- YES → Implementation Task
- NO → Verification Task with **[USER REQUIRED]**

---

## For Code Reviewers

When reviewing tasks:

1. **Implementation Tasks [x]:** Verify code exists, validate correctness
2. **Verification Tasks [x]:** Check for test results, screenshots, metrics
3. **Verification Tasks [ ]:** If marked **[USER REQUIRED]**, this is expected - don't flag as false completion

**Red Flag:** Verification task [x] checked but no evidence in Dev Notes = HIGH severity finding

---

## For Users Completing Stories

Your checklist before marking story "done":

- [ ] All Implementation Tasks [x] checked
- [ ] All Verification Tasks [x] checked (no **[USER REQUIRED]** unchecked)
- [ ] Acceptance Verification Checklist 100% complete
- [ ] Dev Notes document test results with evidence

**If ANY verification task is [ ] unchecked, story is NOT done.**

---

## Full Documentation

See: `docs/recommendations/task-completion-pattern-for-runtime-verification.md`

---

**Pattern Status:** ✅ Pilot successful on Story 1.3
**Next:** Apply to all new stories with runtime verification needs
