# Epic 1 Process Improvements - Applied to Workflows

**Date Applied:** 2025-11-19
**Source:** Epic 1 Retrospective Action Items

---

## Summary of Changes

Based on Epic 1 retrospective findings, the following process improvements have been integrated into the BMM workflow templates and guidelines:

### 1. ✅ UX Design Review Gate (Action Item #1)

**Change Applied:**
- Added "UX Design Validation" section to story template
- Requires designer sign-off before AC finalization
- Prevents responsive breakpoint ambiguities (Story 1.5 issue)

**Template Location:** `.bmad/bmm/workflows/4-implementation/create-story/template.md`

**Checklist Added:**
```markdown
## UX Design Validation

- [ ] **UX Design Validated** (Designer: ___, Date: ___)
  - [ ] Responsive breakpoints defined and validated
  - [ ] Visual design patterns documented in UX spec
  - [ ] Accessibility requirements specified (WCAG 2.1 AA)
  - [ ] Any design assumptions confirmed before writing technical ACs
```

---

### 2. ✅ Manual Testing Evidence Requirements (Action Item #2)

**Change Applied:**
- Updated story template to require evidence artifacts for all manual tests
- Created evidence storage pattern: `docs/test-evidence/`
- Documented acceptable formats (screenshots, videos, Lighthouse JSON)

**Template Section Added:**
```markdown
### Manual Testing Tasks (Evidence Required)

- [ ] Test X (Evidence: [path to screenshot/video/lighthouse.json])
  - Example: `docs/test-evidence/story-2-1-responsive-mobile.png`
```

**Evidence Format Guide:**
- **Screenshots:** PNG/JPG for UI validation
- **Videos:** MP4 for workflow demonstrations
- **Lighthouse JSON:** Performance/PWA/Accessibility audit results
- **Storage:** `docs/test-evidence/story-{epic}-{story}-{test-name}.{ext}`

---

### 3. ✅ Explicit Verification for Conditional Tasks (Action Item #3)

**Change Applied:**
- Replaced "if available" pattern with explicit glob/grep verification
- All conditional tasks now require verification command
- "Not found" outcomes must be documented

**Template Section Added:**
```markdown
### Conditional Verification Tasks (Explicit Checks Required)

- [ ] Check if [file] exists (run: `ls [file_path]`)
  - [ ] If found: [action]
  - [ ] If not found: Document reason
```

**Pattern Examples:**

**Before (Ambiguous):**
```markdown
- [ ] Link to UX design docs (if available)
```

**After (Explicit):**
```markdown
- [ ] Check if docs/ux-design-specification.md exists (run: `ls docs/ux-design-specification.md`)
  - [ ] If found: Add link to README Documentation section
  - [ ] If not found: Document "UX design spec not available, skipping link"
```

---

### 4. ✅ Quantitative Claims Measurement (Recommendation)

**Change Applied:**
- Added requirement for measurement evidence OR qualifier language
- Template includes measurement documentation format

**Template Section Added:**
```markdown
### Quantitative Claims (Measurement Required)

- [ ] Verify [metric] meets target
  - Measured: [value] ([conditions: device, network, browser])
  - OR use qualifier: "typically", "approximately", "around"
```

**Example:**
```markdown
- [x] Verify page load time < 2 seconds
  - Measured: 1.8 seconds (MacBook Pro M1, 100 Mbps, Chrome 120)
  - Qualifier: "Page typically loads in under 2 seconds on modern hardware"
```

---

## How to Use These Improvements

### For Product Owners / Scrum Masters:

**During Story Grooming:**
1. ✅ Ensure UX designer reviews story before finalizing ACs
2. ✅ Mark "UX Design Validated" checkbox with designer name and date
3. ✅ Convert any "if available" tasks to explicit verification commands
4. ✅ Verify all ACs are precise, measurable, and include verification criteria

### For Developers:

**During Story Implementation:**
1. ✅ Capture evidence for all manual tests (screenshot/video/Lighthouse JSON)
2. ✅ Store evidence in `docs/test-evidence/story-{epic}-{story}-{test-name}.{ext}`
3. ✅ Reference evidence in completion notes: "Evidence: docs/test-evidence/..."
4. ✅ For conditional tasks, run verification command and document outcome
5. ✅ For quantitative claims, measure and document conditions OR use qualifiers

**During Code Review:**
1. ✅ Verify all manual tests include evidence links
2. ✅ Verify UX Design Validation section is complete
3. ✅ Verify conditional tasks have documented verification outcomes
4. ✅ Verify quantitative claims include measurement data or qualifiers

---

## Epic 1 Issues These Improvements Prevent

| Issue (Epic 1 Story) | Severity | Prevention Mechanism |
|---------------------|----------|---------------------|
| Responsive breakpoint ambiguity (1.5) | MEDIUM | UX Design Validation gate before AC writing |
| Manual testing documentation gaps (1.3, 1.5, 1.6) | MEDIUM | Evidence artifact requirements |
| Documentation link oversight (1.6) | MEDIUM | Explicit verification commands (no "if available") |
| Timing claims without measurement (1.6) | LOW | Measurement requirements or qualifier language |
| File permission issues (1.5) | LOW | Not template-based; documented in dev guide |

---

## Continuous Improvement Standards (Ongoing)

These standards from Epic 1 continue to apply:

### Standard 1: Architecture-First Approach
- Continue validating all technical decisions against architecture.md
- Update architecture.md before implementing new patterns

### Standard 2: Comprehensive Senior Developer Reviews
- Maintain review quality (Summary, Findings, AC Coverage, Task Validation)
- All stories require APPROVED review status before marking done

### Standard 3: File:Line Evidence References
- All AC verifications must include specific file:line references
- Example: "Primary color applied" → "Verified at `nuxt.config.ts:35`"

---

## Experiment Status

### Experiment 1: Automated Accessibility Tests (Pending)

**Status:** 🔬 Planned for Epic 2 Story 2.1
**Owner:** Tech Lead
**Hypothesis:** Automated a11y tests catch issues faster than manual Lighthouse audits
**Success Metric:** Catch 1+ accessibility issue before code review
**Decision Point:** After Story 2.1 completion

---

## Action Item Completion

| Action Item | Status | Completed Date | Applied To |
|-------------|--------|----------------|------------|
| Add UX Design Review Gate | ✅ Complete | 2025-11-19 | Story template |
| Update Manual Testing Template | ✅ Complete | 2025-11-19 | Story template |
| Convert "If Available" to Explicit Checks | ✅ Complete | 2025-11-19 | Story template + guidelines |
| Quantitative Claims Measurement | ✅ Complete | 2025-11-19 | Story template |

**All immediate action items complete.** Epic 2 can proceed with improved processes.

---

## References

- **Epic 1 Retrospective:** `docs/sprint-artifacts/epic-1-retrospective-2025-11-19.md`
- **Action Items Tracker:** `docs/sprint-artifacts/epic-1-action-items.md`
- **Updated Story Template:** `.bmad/bmm/workflows/4-implementation/create-story/template.md`

---

*Process improvements applied: 2025-11-19*
*Ready for Epic 2 implementation*
