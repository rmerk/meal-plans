# Meal Plans - Project Documentation Index

> **Welcome to the comprehensive documentation for the Meal Plans project.** This index serves as your entry point for understanding, developing, and extending this static PWA meal planning application.

---

## 📋 Project Overview

**Project:** Meal Plans - Weekly Meal Planning & Recipes
**Type:** Static Website + Progressive Web App (PWA)
**Architecture:** Static Multi-Page Application (MPA) with Offline-First Caching
**Language:** JavaScript (ES6+), HTML5, CSS3
**Framework:** None (Vanilla JavaScript) + Tailwind CSS v3.4.18

**Quick Summary:**
A lightweight, privacy-focused meal planning application with complete offline functionality. Zero server dependencies, all data stays on the device. Built for fast, reliable access to meal prep plans, shopping lists, nutrition tracking, and recipe scaling.

---

## 🎯 Quick Reference

### Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend** | Vanilla JavaScript | ES6+ | Client-side logic |
| **Styling** | Tailwind CSS | 3.4.18 | Utility-first CSS |
| **PWA** | Service Worker | v1.0.0 | Offline caching |
| **Storage** | localStorage | Browser API | Client persistence |
| **Build** | Tailwind CLI | npm | CSS compilation |
| **Hosting** | Static | Any HTTPS host | GitHub Pages, etc. |

### Architecture Pattern

- **Type:** Static Multi-Page Application (MPA)
- **Data:** Hardcoded meal data + client-side localStorage
- **Caching:** Offline-first service worker
- **State:** localStorage-based (8+ keys)
- **No Backend:** Zero server dependencies

### Repository Type

**Monolith** - Single cohesive codebase, 1 part

### Entry Points

- **Main:** `index.html` (Dashboard)
- **Meal Plans:** `meals/week1/index.html` (and week2, week3...)
- **PWA:** Defined in `manifest.json`

---

## 📚 Generated Documentation

### Core Documentation

1. **[Project Overview](./project-overview.md)**
   High-level project summary, features, design system, use cases, roadmap

2. **[Architecture](./architecture.md)**
   Technical architecture, system design, technology stack, PWA strategy, performance, security

3. **[Source Tree Analysis](./source-tree-analysis.md)**
   Complete annotated directory structure, file organization, navigation flow, optimization notes

4. **[Data Models](./data-models.md)**
   Data structures, localStorage schema, meal plans data, analytics events, persistence strategy

5. **[Component Inventory](./component-inventory.md)**
   UI components catalog, JavaScript modules, reusable utilities, component communication

6. **[Development Guide](./development-guide.md)**
   Setup instructions, build process, development workflow, testing, deployment, troubleshooting

---

## 🗂️ Existing Documentation (Archived)

**Location:** `docs/archive/`

Historical documentation from previous development iterations:

1. **[README.md](./archive/README.md)** - Previous project overview and features
2. **[CODEBASE_OVERVIEW.md](./archive/CODEBASE_OVERVIEW.md)** - Technical architecture reference
3. **[CHANGELOG.md](./archive/CHANGELOG.md)** - Change history and updates
4. **[IMPLEMENTATION_STATUS.md](./archive/IMPLEMENTATION_STATUS.md)** - Feature implementation tracking
5. **[STORAGE.md](./archive/STORAGE.md)** - localStorage documentation
6. **[REDESIGN_SUMMARY.md](./archive/REDESIGN_SUMMARY.md)** - Design redesign notes (Sage & Gold theme)
7. **[SAGE_GOLD_RETHEME_GUIDE.md](./archive/SAGE_GOLD_RETHEME_GUIDE.md)** - Theme rework documentation
8. **[FIXES_IMPLEMENTED.md](./archive/FIXES_IMPLEMENTED.md)** - Bug fixes log
9. **[GENERATE_ICONS.md](./archive/GENERATE_ICONS.md)** - Icon generation guide
10. **[SETTINGS_EVALUATION.md](./archive/SETTINGS_EVALUATION.md)** - Settings page evaluation
11. **[FUTURE_ENHANCEMENTS.md](./archive/FUTURE_ENHANCEMENTS.md)** - Planned features

---

## 🚀 Getting Started

### For Developers

**Quick Setup:**
```bash
# 1. Install dependencies
npm install

# 2. Build CSS
npm run build

# 3. Run locally with PWA support
python3 -m http.server 8000
# Open http://localhost:8000
```

**Next Steps:**
- Read [Development Guide](./development-guide.md) for detailed instructions
- Review [Architecture](./architecture.md) to understand system design
- Check [Source Tree Analysis](./source-tree-analysis.md) for file organization

### For Brownfield PRD (Planning New Features)

**When creating a PRD for this brownfield project:**

1. **Start Here:** Point your PRD workflow to `docs/index.md` (this file)
2. **Key References:**
   - [Architecture](./architecture.md) - Understand existing patterns and constraints
   - [Component Inventory](./component-inventory.md) - Identify reusable components
   - [Data Models](./data-models.md) - Understand data structures and localStorage usage
   - [Source Tree Analysis](./source-tree-analysis.md) - Know where to add new files

3. **Important Constraints:**
   - **No Backend:** Features must work client-side only
   - **Vanilla JavaScript:** No framework (React, Vue, etc.)
   - **Tailwind CSS:** Use existing design system (Sage & Gold theme)
   - **Offline-First:** Must work without internet
   - **localStorage Limits:** ~5-10MB total storage

4. **Integration Points:**
   - New pages: Link from `index.html`
   - New data: Add to `meals/plans.js`
   - New utilities: Create `.js` module in root
   - New styles: Extend `tailwind.config.js`
   - New PWA features: Update `sw.js` precache list

---

## 📊 AI-Assisted Development Guidance

### Context for AI Agents

**When working on this project, AI should understand:**

1. **Architecture Philosophy:**
   - Simplicity over complexity (vanilla JS, no framework)
   - Offline-first (service worker caching)
   - Privacy-preserving (no external data transmission)
   - Mobile-optimized (PWA, gestures, haptics)

2. **Code Patterns to Follow:**
   - Use Tailwind utility classes for styling
   - Store user state in localStorage with error handling
   - Add new pages to service worker precache list
   - Follow existing file naming conventions (kebab-case)
   - Include JSDoc comments for functions

3. **Common Modifications:**
   - **Add meal plan:** Edit `meals/plans.js`, create HTML pages
   - **Add tool:** Create HTML page, link from index, update service worker
   - **Modify theme:** Edit `tailwind.config.js`, rebuild CSS
   - **Add dark mode support:** Update `dark-mode.css`

4. **Testing Checklist:**
   - Test offline (DevTools Network → Offline)
   - Test dark mode toggle
   - Test localStorage persistence (reload page)
   - Test on mobile (gestures, haptics, PWA install)
   - Run Lighthouse audit (target 90+ all categories)

---

## 🛠️ Common Development Tasks

### Adding a New Meal Plan

1. Edit `meals/plans.js` - Add new plan object
2. Create `meals/weekX/index.html` - Use `_template.html`
3. Add to `sw.js` precache list
4. Rebuild CSS if needed: `npm run build`
5. Test: Visit index.html, verify new plan appears

### Modifying the Design System

1. Edit `tailwind.config.js` - Update colors, typography, spacing
2. Run `npm run build` - Regenerate Tailwind CSS
3. Test light and dark modes
4. Verify across all pages

### Adding a New Utility Page

1. Create `new-tool.html` at root
2. Include Tailwind CSS and mobile-utils.js
3. Link from `index.html`
4. Update `sw.js` precache list
5. Test offline functionality

---

## 📖 Documentation Map

### By Role

**New Developer:**
1. Start: [Project Overview](./project-overview.md)
2. Setup: [Development Guide](./development-guide.md)
3. Understand: [Architecture](./architecture.md)
4. Navigate: [Source Tree Analysis](./source-tree-analysis.md)

**Feature Developer:**
1. Understand data: [Data Models](./data-models.md)
2. Reuse components: [Component Inventory](./component-inventory.md)
3. Follow patterns: [Architecture](./architecture.md)
4. Test: [Development Guide](./development-guide.md) - Testing section

**Product Manager (Brownfield PRD):**
1. Overview: [Project Overview](./project-overview.md)
2. Constraints: [Architecture](./architecture.md) - Constraints section
3. Existing features: [Component Inventory](./component-inventory.md)
4. Data limits: [Data Models](./data-models.md) - localStorage schema

**Technical Writer:**
1. High-level: [Project Overview](./project-overview.md)
2. User features: [Component Inventory](./component-inventory.md)
3. Architecture: [Architecture](./architecture.md)
4. Historical: [Archive docs](./archive/)

---

## 🏗️ Project Structure Summary

```
meal-plans/
├── index.html                    # Main dashboard (Entry Point)
├── manifest.json                 # PWA configuration
├── sw.js                         # Service Worker (caching)
├── tailwind.config.js            # Design system (Sage & Gold)
├── package.json                  # Dependencies
│
├── meals/                        # Meal Plans Content
│   ├── plans.js                  # SOURCE OF TRUTH - All meal data
│   ├── meal-utils.js             # Shopping, checkboxes
│   ├── cookingModeManager.js     # Cooking guidance
│   └── week1/, week2/, week3/    # Individual meal plans
│
├── *.html                        # Tool pages (9 utilities)
│   ├── shopping-helper.html      # Smart shopping list
│   ├── nutrition-dashboard.html  # Nutrition analysis
│   ├── recipe-scaler.html        # Recipe scaling
│   └── (6 others...)
│
├── *.js                          # JavaScript Modules
│   ├── mobile-utils.js           # PWA, gestures, dark mode
│   ├── analytics-tracker.js      # Usage tracking
│   └── notifications.js          # Notifications
│
├── dist/                         # Build Output
│   └── tailwind.css              # Generated CSS (42KB)
│
└── docs/                         # Documentation
    ├── index.md                  # This file
    ├── architecture.md           # System design
    ├── component-inventory.md    # UI catalog
    ├── data-models.md            # Data schemas
    ├── development-guide.md      # Dev instructions
    ├── project-overview.md       # High-level summary
    ├── source-tree-analysis.md   # File structure
    └── archive/                  # Legacy docs (11 files)
```

---

## ⚙️ Workflow Status

**BMad Workflow:** Brownfield Method Track
**Status File:** `docs/bmm-workflow-status.yaml`
**Current Phase:** Documentation Complete (Prerequisite)
**Next Phase:** Phase 1 - Planning (PRD)

**Workflow Context:**
- This project is being documented retroactively (brownfield)
- Documentation serves as foundation for future feature planning
- PRD workflow will reference this index for architectural constraints

---

## 📝 Notes for PRD Workflow

**When planning new features:**

**✅ Leverage Existing:**
- Reuse components from [Component Inventory](./component-inventory.md)
- Extend data models from [Data Models](./data-models.md)
- Follow patterns in [Architecture](./architecture.md)
- Use Sage & Gold design system (see `tailwind.config.js`)

**⚠️ Respect Constraints:**
- No backend (client-side only)
- localStorage limits (~5-10MB)
- Vanilla JavaScript (no React, Vue, etc.)
- Offline-first (must cache in service worker)

**🔍 Integration Points:**
- UI → Tailwind utilities + custom components
- Data → `meals/plans.js` or localStorage
- State → localStorage with error handling
- Caching → Service worker precache updates

**🧪 Testing Requirements:**
- Offline functionality (service worker)
- Dark mode support
- Mobile responsiveness
- localStorage persistence
- Lighthouse PWA audit (100 score)

---

## 🎓 Learning Resources

### External Documentation

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - PWA caching
- [PWA Checklist](https://web.dev/pwa-checklist/) - PWA best practices
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Storage reference

### Internal References

- See [Development Guide](./development-guide.md) for coding guidelines
- See [Architecture](./architecture.md) for design patterns
- See [Archive docs](./archive/) for historical context

---

## 🔄 Document Generation

**Generated by:** BMad Document Project Workflow
**Workflow Version:** 1.2.0
**Generated:** 2025-11-16
**Scan Level:** Exhaustive (all source files analyzed)

**State File:** `docs/project-scan-report.json`

**Regeneration:**
To regenerate or update documentation, run:
```bash
/bmad:bmm:workflows:document-project
```

---

## 📞 Support & Contributions

For questions, contributions, or feature requests:
- Review the [Development Guide](./development-guide.md) for contribution workflow
- Check archived docs for historical context
- Refer to BMad workflow status for project phase

---

**Happy Developing! 🚀**

This documentation is your comprehensive guide to understanding, maintaining, and extending the Meal Plans project. Start with the [Project Overview](./project-overview.md) for a high-level understanding, then dive into specific areas as needed.
