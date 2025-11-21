# Story {{epic_num}}.{{story_num}}: {{story_title}}

Status: drafted

## UX Design Validation

- [ ] **UX Design Validated** (Designer: ___, Date: ___)
  - [ ] Responsive breakpoints defined and validated (mobile/tablet/desktop)
  - [ ] Visual design patterns documented in UX spec
  - [ ] Accessibility requirements specified (WCAG 2.1 AA)
  - [ ] Any design assumptions confirmed before writing technical ACs

> **Epic 1 Learning:** Validate UX decisions before writing technical acceptance criteria to prevent specification ambiguities (e.g., Story 1.5 responsive breakpoint issue).

## Story

As a {{role}},
I want {{action}},
so that {{benefit}}.

## Acceptance Criteria

1. [Add acceptance criteria from epics/PRD - ensure criteria are precise, measurable, and verifiable with file:line evidence]

> **Epic 1 Learning:** Use quantitative metrics, specific file:line references, and binary pass/fail criteria for precise ACs.

## Tasks / Subtasks

- [ ] Task 1 (AC: #)
  - [ ] Subtask 1.1
- [ ] Task 2 (AC: #)
  - [ ] Subtask 2.1

### Manual Testing Tasks (Evidence Required)

> **Epic 1 Learning:** All manual tests must include evidence artifacts (screenshots, Lighthouse JSON, videos) stored in `docs/test-evidence/`.

- [ ] Test X (Evidence: [path to screenshot/video/lighthouse.json])
  - Example: `docs/test-evidence/story-2-1-responsive-mobile.png`

### Conditional Verification Tasks (Explicit Checks Required)

> **Epic 1 Learning:** Replace "if available" with explicit glob/grep verification commands.

- [ ] Check if [file] exists (run: `ls [file_path]`)
  - [ ] If found: [action]
  - [ ] If not found: Document reason

### Quantitative Claims (Measurement Required)

> **Epic 1 Learning:** Quantitative claims require measurement evidence OR qualifier language.

- [ ] Verify [metric] meets target
  - Measured: [value] ([conditions: device, network, browser])
  - OR use qualifier: "typically", "approximately", "around"

## Dev Notes

- Relevant architecture patterns and constraints
- Source tree components to touch
- Testing standards summary

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
- Detected conflicts or variances (with rationale)

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
