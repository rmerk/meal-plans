# Project Recommendations

This directory contains process improvement recommendations identified during the meal-plans project development.

---

## Active Recommendations

### 1. Runtime Verification Task Pattern (Pattern 1)

**Status:** ✅ Pilot Successful on Story 1.3
**Date:** 2025-11-17
**Problem:** Stories with runtime testing requirements had ambiguous completion status (tasks marked [x] but testing not done)

**Documents:**
- 📘 **[Full Specification](./task-completion-pattern-for-runtime-verification.md)** - Complete pattern documentation with 3 pattern options, BMM integration guide, and migration path
- 📊 **[Pilot Summary](./pattern-1-pilot-summary.md)** - Story 1.3 before/after analysis, impact assessment, and adoption recommendations
- 📋 **[Quick Reference](./runtime-verification-pattern-quick-reference.md)** - One-page cheat sheet for developers, reviewers, and users

**Key Innovation:** Separate "Implementation Tasks" (code) from "Verification Tasks" (manual testing) to eliminate false task completion

**Impact:**
- Eliminated 2 HIGH severity "falsely marked complete" findings in Story 1.3 code review
- Provided clear user action items (6 verification tasks with **[USER REQUIRED]** labels)
- Created honest story completion status (4/6 ACs complete via code, 2/6 require user testing)

**Recommendation:** Apply Pattern 1 to all future stories involving:
- PWA features (service workers, install behavior, offline testing)
- UI/UX (visual design, animations, responsive layouts)
- Performance (Lighthouse audits, metrics, benchmarks)
- Accessibility (screen reader testing, keyboard navigation)
- Cross-browser/device testing

**Next Steps:**
1. ✅ Applied to Story 1.3 (pilot complete)
2. ⏳ Awaiting user completion of verification tasks for final validation
3. 📋 Planned: Update BMM story template and workflows
4. 📋 Planned: Propose to BMM core team for inclusion in standard workflow

---

## How to Use This Directory

### For Developers

1. **Creating Stories:** Check recommendations for patterns to apply
2. **Implementing Stories:** Reference quick guides for best practices
3. **Encountering Issues:** Document new recommendations here

### For Code Reviewers

1. **Review Checklist:** Verify pattern compliance (if pattern applies to story)
2. **Pattern Validation:** Check that verification tasks are properly marked
3. **Finding Gaps:** If pattern not applied but should be, flag in review

### For Project Leads

1. **Process Improvement:** Review recommendations for workflow enhancements
2. **Pattern Adoption:** Decide which patterns to formalize into project standards
3. **BMM Integration:** Propose valuable patterns to BMM core team

---

## Recommendation Lifecycle

### 1. Identified (Problem Found)
- Document the problem and context
- Propose solution(s)
- Tag: `status: proposed`

### 2. Pilot (Testing Solution)
- Apply to one story as proof-of-concept
- Document before/after impact
- Tag: `status: pilot`

### 3. Adopted (Successful)
- Proven effective in pilot
- Applied to subsequent stories
- Tag: `status: adopted`

### 4. Formalized (Standard Practice)
- Integrated into project documentation
- Added to workflow templates
- Tag: `status: standard`

---

## Current Recommendations Summary

| Recommendation | Status | Impact | Stories Affected |
|----------------|--------|--------|------------------|
| Runtime Verification Pattern (Pattern 1) | ✅ Pilot Successful | HIGH - Prevents false completions | Story 1.3 (pilot), all future runtime-test stories |

---

## Contributing Recommendations

Found a process improvement opportunity? Document it here:

### Template

```markdown
# [Recommendation Title]

**Status:** Proposed / Pilot / Adopted / Standard
**Date:** YYYY-MM-DD
**Problem:** Brief description of the issue
**Solution:** Proposed approach
**Impact:** Expected benefit

[Details...]
```

Save as: `docs/recommendations/[short-name].md`

---

## Related Documentation

- **Architecture:** `docs/architecture.md` - Technical decisions and patterns
- **Epics:** `docs/epics.md` - Story breakdown and requirements
- **Sprint Artifacts:** `docs/sprint-artifacts/` - Individual story files
- **BMM Workflows:** `.bmad/bmm/workflows/` - BMM method workflows

---

**Last Updated:** 2025-11-17
**Maintainer:** Ryan
