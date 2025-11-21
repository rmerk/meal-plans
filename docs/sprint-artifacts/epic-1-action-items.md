# Epic 1 Retrospective - Action Items Tracker

**Date Created:** 2025-11-19
**Source:** Epic 1 Retrospective (docs/sprint-artifacts/epic-1-retrospective-2025-11-19.md)
**Status:** In Progress

---

## Immediate Actions (Before Epic 2 Starts)

### Action 1: Add UX Design Review Gate ⏳

**Type:** PROCESS
**Owner:** Scrum Master
**Deadline:** Before Epic 2 planning
**Status:** 🔲 Not Started

**Deliverable:**
- [ ] Update story grooming template with "UX Design Validated" checkbox
- [ ] Document UX design review process in development workflow guide
- [ ] Add to Epic 2 planning checklist

**Success Criteria:**
- ✅ All Epic 2 stories have UX design sign-off before AC finalization
- ✅ Zero responsive breakpoint ambiguities (like Story 1.5 issue)

**Implementation Notes:**
- Template location: `.bmad/bmm/templates/story-template.md` (or equivalent)
- Add checkbox after "Story Title" section, before "Acceptance Criteria"
- Format: `- [ ] UX Design Validated (Designer: ___, Date: ___)`

---

### Action 2: Update Manual Testing Template ⏳

**Type:** PROCESS
**Owner:** Scrum Master
**Deadline:** Before Epic 2 starts
**Status:** 🔲 Not Started

**Deliverable:**
- [ ] Update task template to require evidence artifacts
- [ ] Create `docs/test-evidence/` directory for storing artifacts
- [ ] Document artifact format in development guide (screenshot, video, Lighthouse JSON)

**Template Format:**
```markdown
- [ ] Test X (Evidence: [screenshot URL or file path])
```

**Success Criteria:**
- ✅ All manual tests in Epic 2 include evidence links
- ✅ Test evidence directory created and documented
- ✅ Zero "tested but no evidence" claims in Epic 2

**Evidence Format Examples:**
- Screenshots: `docs/test-evidence/story-2-1-responsive-mobile.png`
- Videos: `docs/test-evidence/story-2-2-recipe-gallery-navigation.mp4`
- Lighthouse JSON: `docs/test-evidence/story-2-1-lighthouse-pwa.json`

---

### Action 3: Convert "If Available" to Explicit Checks ⏳

**Type:** PROCESS
**Owner:** Scrum Master
**Deadline:** Before Epic 2 planning
**Status:** 🔲 Not Started

**Deliverable:**
- [ ] Review all Epic 2 story templates
- [ ] Replace "if available" subtasks with glob/grep verification commands
- [ ] Document pattern in task creation guide

**Pattern Examples:**

**Before (ambiguous):**
```markdown
- [ ] Link to UX design docs (if available)
```

**After (explicit):**
```markdown
- [ ] Check if docs/ux-design-specification.md exists (run: ls docs/ux-design-specification.md)
- [ ] If found: Add link to README Documentation section
- [ ] If not found: Document "UX design spec not available, skipping link"
```

**Success Criteria:**
- ✅ Zero "if available" subtasks in Epic 2 stories
- ✅ All conditional tasks have explicit verification commands
- ✅ Zero missing documentation links (like Story 1.6 UX doc issue)

---

## Epic 2 Experiments

### Experiment 1: Automated Accessibility Tests 🔬

**Type:** EXPERIMENT
**Owner:** Tech Lead
**Hypothesis:** Automated a11y tests catch issues faster than manual Lighthouse audits
**Success Metric:** Catch 1+ accessibility issue before code review in Epic 2
**Status:** 🔲 Not Started

**Implementation Plan:**
- [ ] Research @nuxtjs/test-utils accessibility testing capabilities
- [ ] Create sample a11y test for Story 2.1 (meal plan dashboard)
- [ ] Integrate into CI pipeline (run on PR)
- [ ] Evaluate effectiveness after Story 2.1 completion

**Decision Point:** After Epic 2 Story 2.1 completion
- If catches 1+ issue before manual review → Continue for all Epic 2 stories
- If catches 0 issues → Defer to Epic 5 (not valuable yet)

**Risk:** Low - can remove if not valuable

**Resources:**
- [@nuxtjs/test-utils docs](https://nuxt.com/docs/getting-started/testing)
- [axe-core accessibility testing](https://github.com/dequelabs/axe-core)
- [Vitest + Testing Library integration](https://vitest.dev/)

---

## Continuous Improvement (Ongoing)

### Standard 1: Architecture-First Approach ✅

**Status:** 🟢 Active (Continue)

**Practice:**
- Continue validating all technical decisions against architecture.md
- Update architecture.md before implementing new patterns

**For Epic 2:**
- [ ] Update architecture.md with Nuxt Content patterns before Story 2.1
- [ ] Document content structure conventions (markdown frontmatter, recipe metadata)
- [ ] Validate Epic 2 stories reference architecture.md patterns

---

### Standard 2: Comprehensive Senior Developer Reviews ✅

**Status:** 🟢 Active (Continue)

**Practice:**
- Maintain review quality (Summary, Findings, AC Coverage, Task Validation, etc.)
- All stories require APPROVED review status before marking done

**For Epic 2:**
- [ ] Continue using review template for all stories
- [ ] Add "Nuxt Content Integration" section to review checklist
- [ ] Verify all acceptance criteria with file:line evidence

---

### Standard 3: File:Line Evidence References ✅

**Status:** 🟢 Active (Continue)

**Practice:**
- All AC verifications must include specific file:line references
- Example: "Primary color applied" → "Verified at `nuxt.config.ts:35`"

**For Epic 2:**
- [ ] Verify all meal plan content references include file paths
- [ ] Example: "Recipe metadata includes prep time" → "Verified at `content/meals/week-1/recipes/salmon.md:3-7`"

---

## Additional Recommendations (Optional)

### Recommendation 1: File Permission Verification

**Type:** TECHNICAL
**Owner:** Tech Lead
**Priority:** Low (only if creating many new components in Epic 2)

**Implementation:**
- [ ] Add permission verification to component creation workflow
- [ ] Document expected permissions (755 for directories, 644 for files)
- [ ] Optional: Add pre-commit hook to verify permissions

**Pattern:**
```bash
# After creating component directory
mkdir app/components/meal
ls -la app/components/  # Verify drwxr-xr-x (755)
```

---

### Recommendation 2: Quantitative Claims Measurement

**Type:** PROCESS
**Owner:** Developer
**Priority:** Medium (apply to all timing/performance claims)

**Implementation:**
- Add "Measured: [value]" field to timing-related subtasks
- Use qualifier language for estimates: "typically", "approximately", "around"
- Document measurement conditions

**Example:**
```markdown
- [x] Verify page load time < 2 seconds
  - Measured: 1.8 seconds (MacBook Pro M1, 100 Mbps, Chrome 120)
  - Qualifier: "Page typically loads in under 2 seconds on modern hardware"
```

---

## Progress Tracking

**Overall Status:** ✅ 3/3 Immediate Actions Complete

| Action | Status | Owner | Deadline | Completion Date |
|--------|--------|-------|----------|-----------------|
| Action 1: UX Design Review Gate | ✅ **Complete** | Scrum Master | Before Epic 2 planning | 2025-11-19 |
| Action 2: Manual Testing Template | ✅ **Complete** | Scrum Master | Before Epic 2 starts | 2025-11-19 |
| Action 3: Convert "If Available" | ✅ **Complete** | Scrum Master | Before Epic 2 planning | 2025-11-19 |
| Experiment 1: A11y Tests | 🔬 Planned | Tech Lead | After Story 2.1 | - |

**Next Review:** Before Epic 2 planning session

---

## Notes

- All action items derived from Epic 1 retrospective analysis
- Focus on preventing issues found in Epic 1 (UX ambiguity, manual testing gaps, documentation oversights)
- Experiments are low-risk; can be abandoned if not valuable
- Continuous improvement standards should be maintained throughout all epics

---

*Action items tracker created: 2025-11-19*
*Last updated: 2025-11-19*
