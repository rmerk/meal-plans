# System-Level Test Design
**Project:** meal-plans
**Type:** Static Website / PWA
**Generated:** 2025-11-21
**Workflow:** test-design (System-Level Mode - Phase 3)
**Status:** Retrospective Testability Assessment

---

## Executive Summary

This document provides a comprehensive testability assessment for the meal-plans project, a Nuxt-based static website/PWA for weekly meal planning. The assessment was conducted retrospectively after 2 completed epics (Foundation & User Navigation/Content Display) and during Epic 3 (Interactive Features).

**Critical Finding:** Zero tests exist in the project. This represents a **HIGH testability risk** and technical debt accumulation. Immediate action is required to establish test infrastructure and coverage before completing Epic 3.

**Recommendation:** Implement test framework, write tests for completed features (Epics 1-2), and adopt test-first approach (ATDD) for remaining Epic 3 stories and future development.

---

## 1. Project Overview

### 1.1 System Context

**Purpose:** Weekly meal planning application providing curated meal plans, recipes, and prep strategies.

**Architecture:**
- **Framework:** Nuxt 4.2.1 with @nuxt/ui v4.1.0 (Component library)
- **Content:** @nuxt/content (Markdown-based recipes and meal plans)
- **Deployment:** Static site generation (SSG) with PWA capabilities
- **Rendering:** Client-side and server-side rendering (hybrid)
- **Storage:** File-based content (no database, no authentication)

**User Flows:**
1. **Browse meal plans** - View weekly meal plan cards on dashboard
2. **View meal details** - Explore recipes and nutritional info for each week
3. **View recipes** - Browse recipe gallery with filtering/search
4. **Access prep strategies** - View step-by-step meal prep guides
5. **Offline access** - Use app offline via PWA service worker

**Current Progress:**
- ✅ Epic 1: Foundation & Infrastructure (Completed)
- ✅ Epic 2: User Navigation & Content Display (Completed)
- 🔄 Epic 3: Interactive Features (In Progress - 2/6 stories done)

### 1.2 Technology Stack

| Component | Technology | Testing Implications |
|-----------|-----------|---------------------|
| **Frontend** | Vue 3 + Nuxt 4 | Component tests (Vitest + Vue Test Utils), E2E tests (Playwright) |
| **UI Library** | @nuxt/ui v4 | Pre-tested components, focus on integration |
| **Content** | @nuxt/content (Markdown) | Content validation tests, parsing tests |
| **Styling** | Tailwind CSS | Visual regression tests (Playwright screenshots) |
| **PWA** | @vite-pwa/nuxt | Service worker tests, offline functionality tests |
| **Build** | Vite + Nitro | Build output validation, SSG tests |
| **Linting** | ESLint + Oxlint | Code quality gates (already configured) |

---

## 2. Architecture Testability Assessment

### 2.1 Controllability (Can we control system state?)

**Score: 7/10** (Good controllability with some limitations)

**Strengths:**
- ✅ **File-based content** - Easy to seed test content (Markdown files)
- ✅ **No authentication** - No complex user state management
- ✅ **Static generation** - Deterministic builds, no runtime variability
- ✅ **No external APIs** - No flaky third-party dependencies

**Limitations:**
- ⚠️ **PWA service worker** - Cache state requires explicit clearing in tests
- ⚠️ **Browser storage** - LocalStorage/IndexedDB state needs cleanup between tests
- ⚠️ **SSG output** - Build artifacts must be generated before E2E tests

**Recommendations:**
1. Create test content fixtures in `tests/fixtures/content/`
2. Use Playwright's `storageState` API to isolate test storage
3. Implement service worker test utilities (register/unregister, cache clearing)
4. Add `pnpm test:build` script to generate SSG output for E2E tests

### 2.2 Observability (Can we inspect system state?)

**Score: 8/10** (Good observability)

**Strengths:**
- ✅ **DOM-based UI** - Easy to query and assert on elements
- ✅ **Lighthouse integration** - Performance/a11y metrics already captured (test evidence in `docs/test-evidence/`)
- ✅ **Console logs** - Browser console available for debugging
- ✅ **Dev tools** - Vue DevTools available in dev mode

**Limitations:**
- ⚠️ **Service worker state** - Requires explicit inspection APIs
- ⚠️ **Content parsing** - Markdown rendering errors may not surface visibly

**Recommendations:**
1. Add `data-testid` attributes to critical UI elements (already partially done)
2. Implement custom Playwright assertions for Nuxt/Vue components
3. Add service worker inspection helpers (`navigator.serviceWorker.getRegistrations()`)
4. Create content validation utilities to verify Markdown parsing

### 2.3 Reliability (Are tests isolated and deterministic?)

**Score: 6/10** (Moderate reliability concerns)

**Concerns:**
- 🚨 **No test isolation** - Zero tests = no isolation strategy defined
- ⚠️ **PWA caching** - Service worker caching can cause cross-test pollution
- ⚠️ **Static build** - Build artifacts shared across tests (not regenerated per test)
- ⚠️ **Browser storage** - Persistent storage can leak between tests

**Recommendations:**
1. Use Playwright's `test.use({ storageState: undefined })` for isolated contexts
2. Clear service worker cache in `beforeEach` hooks
3. Generate fresh build artifacts per test suite (or use `--no-cache` flag)
4. Implement fixture-based test data with auto-cleanup
5. Run tests in parallel with `--workers=4` to validate isolation

### 2.4 Overall Testability Score: 7/10

**Classification:** **GOOD** (testable architecture with some challenges)

**Rationale:**
- Architecture is inherently testable (static site, no complex backend)
- File-based content simplifies test data management
- PWA features add complexity (service workers, caching)
- Zero existing tests indicate lack of testability consideration during development

---

## 3. Architecturally Significant Requirements (ASRs)

### 3.1 Accessibility (WCAG 2.1 AA Compliance)

**Priority:** P0 (Critical)
**Impact:** Legal compliance, user experience for assistive technology users
**Testability Risk:** MEDIUM

**Test Strategy:**
- **Automated:** Lighthouse a11y audits (score ≥90), axe-core integration
- **Manual:** Screen reader testing (VoiceOver, NVDA), keyboard navigation validation

**Test Scenarios:**
1. All interactive elements keyboard-accessible (Tab, Enter, Space)
2. Images have alt text, decorative images use `alt=""`
3. Headings follow semantic hierarchy (h1 → h2 → h3)
4. Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
5. Focus indicators visible and high-contrast
6. ARIA labels present for icon-only buttons

**Evidence Required:**
- Lighthouse a11y score ≥90 for all pages (already captured in `docs/test-evidence/`)
- Playwright axe-core scans passing (to be implemented)
- Manual screen reader test results (to be documented)

---

### 3.2 Performance (Core Web Vitals)

**Priority:** P0 (Critical)
**Impact:** User experience, SEO, mobile usability
**Testability Risk:** LOW (already monitored)

**Test Strategy:**
- **Automated:** Lighthouse performance audits, real user metrics (RUM)
- **Load testing:** NOT required (static site, no backend)

**Performance Targets (from architecture.md):**
- Lighthouse Performance score ≥90
- LCP (Largest Contentful Paint) <2.5s
- FID (First Input Delay) <100ms
- CLS (Cumulative Layout Shift) <0.1

**Test Scenarios:**
1. Homepage loads in <2s on 3G (mobile)
2. Recipe images lazy-loaded (not blocking LCP)
3. No layout shifts during page load (CLS <0.1)
4. Service worker caches assets for instant repeat visits

**Evidence Required:**
- Lighthouse reports for all pages (already captured: `story-2-1-lighthouse.json`, etc.)
- Field data from production (RUM metrics via Vercel Analytics or similar)
- Playwright performance timing assertions

---

### 3.3 PWA Offline Functionality

**Priority:** P1 (High)
**Impact:** User experience, mobile usability
**Testability Risk:** HIGH (complex, not yet tested)

**Test Strategy:**
- **Automated:** Playwright offline mode tests, service worker validation
- **Manual:** Real device testing (iOS, Android)

**Test Scenarios:**
1. App installs as PWA (manifest.json valid, install prompt shown)
2. Service worker registers successfully on first visit
3. Assets cached after first load (HTML, CSS, JS, images)
4. App loads offline (no network, service worker serves cached content)
5. Offline indicator shown when network unavailable
6. Online indicator shown when network restored
7. Background sync queues actions when offline (if applicable)

**Evidence Required:**
- Playwright tests for offline mode (to be implemented)
- PWA audit passing (Lighthouse PWA score ≥90)
- Manual device testing on iOS Safari, Android Chrome

**Testability Concerns:**
- Service worker lifecycle is complex (install → activate → fetch)
- Cache invalidation strategy must be tested (stale content risk)
- Cross-browser PWA support varies (Safari has limitations)

---

### 3.4 Content Integrity (Markdown Parsing)

**Priority:** P1 (High)
**Impact:** Content accuracy, recipe usability
**Testability Risk:** MEDIUM

**Test Strategy:**
- **Automated:** Content validation tests, Markdown parsing tests
- **Manual:** Content review by editor

**Test Scenarios:**
1. Recipe Markdown files parse correctly (no broken HTML)
2. Ingredients list renders as unordered list
3. Instructions render as ordered list
4. Image paths resolve correctly (no 404s)
5. Frontmatter metadata extracted (title, servings, prep time)
6. Special characters escaped (e.g., `&`, `<`, `>`)
7. Code blocks render with syntax highlighting (if applicable)

**Evidence Required:**
- Vitest unit tests for content parsing utilities
- Playwright E2E tests verifying rendered content
- Manual spot-checks for content accuracy

---

### 3.5 Mobile Responsiveness

**Priority:** P0 (Critical)
**Impact:** User experience (mobile-first design)
**Testability Risk:** MEDIUM

**Test Strategy:**
- **Automated:** Playwright viewport tests (mobile, tablet, desktop)
- **Manual:** Real device testing

**Test Scenarios:**
1. Navigation menu collapses to hamburger on mobile (<768px)
2. Recipe cards stack vertically on mobile (1 column)
3. Recipe cards display 2 columns on tablet (768px-1024px)
4. Recipe cards display 3+ columns on desktop (>1024px)
5. Images scale correctly (no overflow, no distortion)
6. Touch targets ≥44x44px (WCAG 2.5.5)
7. Text remains legible on small screens (min 16px font size)

**Evidence Required:**
- Playwright screenshots at multiple viewports (320px, 768px, 1920px)
- Visual regression tests (Percy, Chromatic, or Playwright screenshots)
- Manual testing on iPhone, iPad, Android devices

---

## 4. Test Levels Strategy

### 4.1 Unit Tests (Vitest)

**Coverage Target:** 70% for utility functions, 50% for components

**Scope:**
- ✅ **Utility functions** (date formatting, price calculations, string manipulation)
- ✅ **Content parsing** (Markdown frontmatter extraction, recipe schema validation)
- ✅ **Composables** (@nuxt/ui composables, custom logic)
- ❌ **NOT components** (favor component tests over isolated unit tests)

**Example Test Cases:**
```typescript
// tests/unit/utils/format-time.test.ts
describe('formatTime', () => {
  it('should format minutes correctly', () => {
    expect(formatTime(30)).toBe('30 mins');
  });

  it('should format hours and minutes', () => {
    expect(formatTime(90)).toBe('1 hr 30 mins');
  });
});

// tests/unit/content/parse-recipe.test.ts
describe('parseRecipe', () => {
  it('should extract frontmatter metadata', () => {
    const markdown = `---
title: Chicken Tacos
servings: 4
prepTime: 20
---`;
    const recipe = parseRecipe(markdown);
    expect(recipe.title).toBe('Chicken Tacos');
    expect(recipe.servings).toBe(4);
  });
});
```

**Framework:** Vitest (already in dependencies)

**Run Command:** `pnpm test:unit`

---

### 4.2 Component Tests (Vitest + @vue/test-utils)

**Coverage Target:** 60% for custom components

**Scope:**
- ✅ **Custom components** (MealPlanCard.vue, RecipeCard.vue, PrepStep.vue)
- ❌ **NOT @nuxt/ui components** (pre-tested by library)
- ✅ **Component props** (required props, optional props, defaults)
- ✅ **Component events** (click handlers, emits)
- ✅ **Computed properties** (reactive logic)

**Example Test Cases:**
```typescript
// tests/component/MealPlanCard.test.ts
import { mount } from '@vue/test-utils';
import MealPlanCard from '~/components/MealPlanCard.vue';

describe('MealPlanCard', () => {
  it('should render meal plan title', () => {
    const wrapper = mount(MealPlanCard, {
      props: { week: 1, title: 'Week 1: Quick & Easy' }
    });
    expect(wrapper.text()).toContain('Week 1: Quick & Easy');
  });

  it('should emit click event when card clicked', async () => {
    const wrapper = mount(MealPlanCard, {
      props: { week: 1, title: 'Week 1' }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

**Framework:** Vitest + @vue/test-utils (to be installed)

**Run Command:** `pnpm test:component`

---

### 4.3 Integration Tests (NOT REQUIRED)

**Rationale:** Static site with no backend APIs means integration testing (API-to-service layer) is not applicable. Content integration is validated via E2E tests.

---

### 4.4 End-to-End Tests (Playwright)

**Coverage Target:** P0/P1 user journeys (15-20 tests total)

**Scope:**
- ✅ **Critical user journeys** (browse meal plans, view recipes, access prep strategy)
- ✅ **Navigation flows** (home → meal plan → recipe → back)
- ✅ **PWA functionality** (offline mode, install prompt)
- ✅ **Accessibility** (keyboard navigation, screen reader)
- ✅ **Visual regression** (screenshots for layout validation)

**Priority Breakdown:**
- **P0 (Critical):** 8 tests (homepage, meal plan overview, recipe detail, navigation)
- **P1 (High):** 7 tests (filtering, search, prep strategy, offline mode)
- **P2 (Medium):** 5 tests (visual regression, edge cases)

**Example Test Cases:**
```typescript
// tests/e2e/meal-plans.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Meal Plans', () => {
  test('should display meal plan cards on homepage', async ({ page }) => {
    await page.goto('/');

    const cards = page.getByTestId('meal-plan-card');
    await expect(cards).toHaveCount(3); // 3 weeks

    // Verify first card content
    const week1 = cards.nth(0);
    await expect(week1.getByText('Week 1')).toBeVisible();
    await expect(week1.getByRole('img')).toBeVisible();
  });

  test('should navigate to meal plan overview', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Week 1').click();

    await expect(page).toHaveURL('/meals/week-1');
    await expect(page.getByRole('heading', { name: 'Week 1' })).toBeVisible();
  });

  test('should work offline', async ({ page, context }) => {
    // First visit (service worker registers)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Go offline
    await context.setOffline(true);

    // Reload page (should load from cache)
    await page.reload();
    await expect(page.getByText('Meal Plans')).toBeVisible();
  });
});
```

**Framework:** Playwright (to be installed)

**Run Command:** `pnpm test:e2e`

---

### 4.5 Visual Regression Tests (Playwright Screenshots)

**Coverage Target:** Key pages and responsive breakpoints

**Scope:**
- ✅ **Key pages** (homepage, meal plan overview, recipe detail, prep strategy)
- ✅ **Responsive breakpoints** (mobile 320px, tablet 768px, desktop 1920px)
- ✅ **Component states** (hover, focus, active)

**Example Test Cases:**
```typescript
// tests/visual/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Responsive', () => {
  const viewports = [
    { name: 'mobile', width: 320, height: 568 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`homepage should render correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');

      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
```

**Framework:** Playwright (built-in screenshot comparison)

**Run Command:** `pnpm test:visual`

---

## 5. NFR Testing Approach

### 5.1 Security

**Assessment:** LOW RISK (static site, no authentication, no user data)

**Required Tests:**
- ❌ **NOT REQUIRED:** Authentication, authorization, RBAC (no auth)
- ❌ **NOT REQUIRED:** SQL injection, XSS (no database, no user input stored)
- ✅ **REQUIRED:** CSP headers (Content Security Policy)
- ✅ **REQUIRED:** HTTPS enforcement (redirect HTTP → HTTPS)

**Test Approach:**
- Playwright test to verify CSP headers present (`Content-Security-Policy`)
- Playwright test to verify HTTPS redirect (if deployed)
- Manual review of deployment config (Vercel security headers)

**NFR Criteria:**
- ✅ **PASS:** CSP headers present, HTTPS enforced
- ⚠️ **CONCERNS:** Missing security headers or warnings in Lighthouse audit
- ❌ **FAIL:** Critical security vulnerabilities (XSS, CSRF)

---

### 5.2 Performance

**Assessment:** MEDIUM RISK (image optimization, PWA caching critical)

**Required Tests:**
- ✅ **Lighthouse audits** (Performance score ≥90)
- ✅ **Core Web Vitals** (LCP <2.5s, FID <100ms, CLS <0.1)
- ✅ **Image optimization** (WebP format, lazy loading)
- ❌ **NOT REQUIRED:** Load testing (k6) - static site with no backend

**Test Approach:**
- Playwright + Lighthouse integration (already captured evidence)
- Custom Playwright assertions for performance timings:
  ```typescript
  const performanceMetrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    };
  });
  expect(performanceMetrics.loadTime).toBeLessThan(2000); // <2s load time
  ```

**NFR Criteria:**
- ✅ **PASS:** Lighthouse score ≥90, Core Web Vitals green
- ⚠️ **CONCERNS:** Lighthouse score 80-89, trending toward limits
- ❌ **FAIL:** Lighthouse score <80, Core Web Vitals red

---

### 5.3 Reliability

**Assessment:** MEDIUM RISK (PWA offline functionality, service worker lifecycle)

**Required Tests:**
- ✅ **Service worker registration** (registers successfully on first visit)
- ✅ **Offline functionality** (app loads when network unavailable)
- ✅ **Cache invalidation** (stale content updated when online)
- ✅ **Error boundaries** (graceful degradation when content fails to load)

**Test Approach:**
- Playwright offline mode tests (already outlined in ASR 3.3)
- Service worker lifecycle tests:
  ```typescript
  test('service worker should update when new version deployed', async ({ page }) => {
    await page.goto('/');
    const swVersion1 = await page.evaluate(() =>
      navigator.serviceWorker.controller?.scriptURL
    );

    // Simulate new deployment (update service worker)
    await page.evaluate(() => navigator.serviceWorker.register('/sw.js?v=2'));
    await page.reload();

    const swVersion2 = await page.evaluate(() =>
      navigator.serviceWorker.controller?.scriptURL
    );
    expect(swVersion2).not.toBe(swVersion1);
  });
  ```

**NFR Criteria:**
- ✅ **PASS:** Service worker tests green, offline mode functional
- ⚠️ **CONCERNS:** Flaky service worker tests, inconsistent caching
- ❌ **FAIL:** Offline mode broken, service worker fails to register

---

### 5.4 Maintainability

**Assessment:** HIGH RISK (zero tests = tech debt accumulating)

**Required Actions:**
- ✅ **Test coverage ≥60%** (unit + component + E2E combined)
- ✅ **Code duplication <5%** (already enforced via Oxlint)
- ✅ **No critical/high vulnerabilities** (`pnpm audit` in CI)
- ✅ **Structured logging** (console.error for critical failures)

**Test Approach:**
- CI job for coverage reporting (Vitest coverage + Playwright coverage)
- CI job for `pnpm audit` (fail on critical/high vulnerabilities)
- Oxlint already configured (code quality gates)

**NFR Criteria:**
- ✅ **PASS:** Coverage ≥60%, no vulnerabilities, duplication <5%
- ⚠️ **CONCERNS:** Coverage 40-59%, low-severity vulnerabilities
- ❌ **FAIL:** Coverage <40%, critical vulnerabilities, duplication >10%

---

## 6. Testability Concerns & Recommendations

### 6.1 Critical Concerns

#### 🚨 **CONCERN 1: Zero Tests Written (BLOCKER)**

**Risk Level:** CRITICAL
**Impact:** Technical debt, regression risk, no safety net for refactoring
**Probability:** 3/3 (already happening)
**Risk Score:** 9/9 (CRITICAL BLOCKER)

**Evidence:**
- No test files exist outside `node_modules/`
- 2 epics completed without any test coverage
- Epic 3 in progress with no tests written yet

**Mitigation Plan:**
1. **Immediate (Week 1):** Set up test infrastructure (Playwright, Vitest)
2. **Short-term (Week 2-3):** Write tests for completed Epics 1-2 (retrospectively)
3. **Long-term (Ongoing):** Adopt ATDD for remaining Epic 3 stories and future development

**Owner:** Ryan (with tea agent guidance)
**Deadline:** 2025-11-28 (1 week from today)

---

#### ⚠️ **CONCERN 2: PWA Service Worker Testing Complexity**

**Risk Level:** HIGH
**Impact:** Offline functionality untested, cache invalidation bugs
**Probability:** 2/3 (likely to cause issues)
**Risk Score:** 6/9 (HIGH RISK)

**Evidence:**
- Service worker lifecycle is complex (install → activate → fetch)
- No tests exist for PWA functionality
- Cache invalidation strategy undefined

**Mitigation Plan:**
1. Load knowledge fragment: `network-first.md` (service worker testing patterns)
2. Implement service worker test utilities (register, unregister, cache clearing)
3. Write Playwright tests for offline mode (before marking Epic 3 complete)

**Owner:** Ryan
**Deadline:** Before Epic 3 completion

---

#### ⚠️ **CONCERN 3: Content Integrity Not Validated**

**Risk Level:** MEDIUM
**Impact:** Broken recipes, incorrect metadata, 404 images
**Probability:** 2/3 (content errors likely exist)
**Risk Score:** 4/9 (MEDIUM RISK)

**Evidence:**
- Content files in `content/meals/` not validated
- No tests for Markdown parsing
- No automated checks for broken image links

**Mitigation Plan:**
1. Write Vitest tests for content parsing utilities
2. Add Playwright E2E tests to verify rendered content
3. Implement CI job to validate content schema (frontmatter fields)

**Owner:** Ryan
**Deadline:** Before adding more content (next sprint)

---

### 6.2 Recommendations

#### 📋 **RECOMMENDATION 1: Establish Test Infrastructure (Priority: CRITICAL)**

**Actions:**
1. Install test dependencies:
   ```bash
   pnpm add -D @playwright/test @vue/test-utils vitest @vitest/ui
   ```
2. Create test configuration files:
   - `playwright.config.ts` (E2E test config)
   - `vitest.config.ts` (unit/component test config)
3. Add test scripts to `package.json`:
   ```json
   {
     "scripts": {
       "test": "pnpm test:unit && pnpm test:e2e",
       "test:unit": "vitest",
       "test:component": "vitest --config vitest.config.component.ts",
       "test:e2e": "playwright test",
       "test:visual": "playwright test --grep @visual"
     }
   }
   ```
4. Create test directories:
   - `tests/unit/` (utility functions, composables)
   - `tests/component/` (Vue components)
   - `tests/e2e/` (end-to-end user journeys)
   - `tests/fixtures/` (test data, content fixtures)

**Estimated Effort:** 4-6 hours
**Priority:** P0 (CRITICAL)

---

#### 📋 **RECOMMENDATION 2: Adopt ATDD for Remaining Development**

**Approach:**
1. Run `*atdd` workflow (tea agent) for each remaining Epic 3 story
2. Generate E2E tests BEFORE implementing feature
3. Red → Green → Refactor (TDD loop)

**Benefits:**
- Tests drive implementation (clear acceptance criteria)
- No more untested features
- Catches regressions early

**Estimated Effort:** 20% overhead per story (worth it)
**Priority:** P0 (CRITICAL)

---

#### 📋 **RECOMMENDATION 3: Backfill Tests for Completed Epics 1-2**

**Approach:**
1. Prioritize P0 user journeys:
   - Homepage displays meal plan cards
   - Click meal plan card → navigates to overview
   - Overview page displays recipes
   - Click recipe → navigates to recipe detail
2. Write E2E tests with Playwright (10-12 tests)
3. Add component tests for `MealPlanCard`, `RecipeCard` (4-6 tests)

**Estimated Effort:** 8-12 hours
**Priority:** P1 (HIGH)

---

#### 📋 **RECOMMENDATION 4: Integrate Lighthouse Audits in CI**

**Approach:**
1. Install `@lhci/cli` (Lighthouse CI)
2. Add CI job to run Lighthouse on key pages
3. Fail build if score <90 (performance, a11y, PWA)

**Benefits:**
- Automated performance regression detection
- Accessibility compliance enforced
- PWA audit ensures offline functionality

**Estimated Effort:** 2-3 hours
**Priority:** P1 (HIGH)

---

#### 📋 **RECOMMENDATION 5: Add Visual Regression Tests**

**Approach:**
1. Use Playwright built-in screenshot comparison
2. Capture screenshots at 3 viewports (mobile, tablet, desktop)
3. Run visual tests in CI (fail on pixel differences >1%)

**Benefits:**
- Catch unintended layout changes
- Validate responsive design automatically
- Prevent visual regressions

**Estimated Effort:** 4-6 hours
**Priority:** P2 (MEDIUM)

---

## 7. System-Level Test Design Summary

### 7.1 Test Coverage Matrix

| Epic | Feature | Unit Tests | Component Tests | E2E Tests | Priority |
|------|---------|-----------|----------------|-----------|----------|
| **1 - Foundation** | Nuxt initialization | ❌ (not testable) | ❌ | ✅ (1) | P0 |
| **1 - Foundation** | Base layouts | ❌ | ✅ (2) | ✅ (1) | P0 |
| **2 - User Navigation** | Dashboard with meal cards | ❌ | ✅ (2) | ✅ (2) | P0 |
| **2 - User Navigation** | Meal plan overview | ❌ | ✅ (1) | ✅ (2) | P0 |
| **2 - User Navigation** | Recipe gallery | ❌ | ✅ (2) | ✅ (2) | P0 |
| **2 - User Navigation** | Recipe detail | ❌ | ✅ (1) | ✅ (2) | P0 |
| **2 - User Navigation** | Prep strategy page | ❌ | ✅ (1) | ✅ (1) | P1 |
| **3 - Interactive** | Recipe filtering | ✅ (2) | ❌ | ✅ (2) | P1 |
| **3 - Interactive** | Search functionality | ✅ (2) | ✅ (1) | ✅ (2) | P1 |
| **3 - Interactive** | Shopping list | ✅ (3) | ✅ (2) | ✅ (2) | P1 |
| **3 - Interactive** | Meal customization | ✅ (2) | ✅ (1) | ✅ (1) | P2 |
| **NFR** | Accessibility (a11y) | ❌ | ❌ | ✅ (3) | P0 |
| **NFR** | Performance | ❌ | ❌ | ✅ (3) | P0 |
| **NFR** | PWA Offline | ❌ | ❌ | ✅ (4) | P1 |
| **NFR** | Content integrity | ✅ (4) | ❌ | ✅ (2) | P1 |
| **NFR** | Visual regression | ❌ | ❌ | ✅ (8) | P2 |

**Total Tests Needed:**
- **Unit:** 13 tests (utility functions, content parsing)
- **Component:** 13 tests (custom Vue components)
- **E2E:** 36 tests (user journeys, NFR validation)
- **TOTAL:** ~62 tests

---

### 7.2 Risk Summary

| Risk Category | Score | Status | Mitigation |
|--------------|-------|--------|-----------|
| **TECH** (No tests) | 9/9 | 🚨 CRITICAL | Set up test infra (Week 1) |
| **PERF** (Core Web Vitals) | 4/9 | ⚠️ MEDIUM | Lighthouse CI integration |
| **OPS** (PWA offline) | 6/9 | ⚠️ HIGH | Write service worker tests |
| **DATA** (Content integrity) | 4/9 | ⚠️ MEDIUM | Content validation tests |
| **BUS** (User journeys untested) | 6/9 | ⚠️ HIGH | Backfill E2E tests for Epics 1-2 |

**Overall Risk Assessment:** **HIGH RISK** (requires immediate mitigation)

---

### 7.3 Gate Decision Recommendation

**Decision:** ⚠️ **CONCERNS** (not ready for production)

**Rationale:**
- ✅ Architecture is testable (static site, file-based content)
- ❌ Zero tests written (critical blocker)
- ❌ No test infrastructure (Playwright/Vitest not set up)
- ⚠️ 2 epics completed without test coverage (tech debt)

**Recommendation for Implementation-Readiness Gate:**
- **Block gate** until test infrastructure is set up (Week 1)
- **Require backfill tests** for Epics 1-2 before Epic 3 completion (Week 2-3)
- **Adopt ATDD** for remaining Epic 3 stories (ongoing)

**Next Steps:**
1. Run `*framework` workflow to initialize test framework (Playwright + Vitest)
2. Run `*atdd` workflow for each remaining Epic 3 story
3. Run `*automate` workflow to backfill tests for completed Epics 1-2
4. Re-run `*trace` workflow to validate coverage and quality gate decision

---

## 8. Test Automation Roadmap

### Phase 1: Foundation (Week 1)
- [x] Complete test-design assessment (THIS DOCUMENT)
- [ ] Run `*framework` workflow to initialize test infrastructure
- [ ] Install Playwright, Vitest, @vue/test-utils
- [ ] Create test configuration files
- [ ] Set up CI job for test execution

### Phase 2: Backfill Tests (Week 2-3)
- [ ] Run `*automate` workflow for Epic 1 (Foundation)
- [ ] Run `*automate` workflow for Epic 2 (User Navigation)
- [ ] Write 10-12 P0 E2E tests (critical user journeys)
- [ ] Write 8-10 component tests (MealPlanCard, RecipeCard, etc.)
- [ ] Run `*test-review` to validate test quality

### Phase 3: ATDD for Epic 3 (Week 4+)
- [ ] Run `*atdd` for remaining Epic 3 stories
- [ ] Generate E2E tests BEFORE implementation (red → green → refactor)
- [ ] Write unit tests for interactive features (filtering, search)
- [ ] Add visual regression tests (Playwright screenshots)

### Phase 4: NFR Testing (Week 5+)
- [ ] Integrate Lighthouse CI (performance, a11y, PWA audits)
- [ ] Write service worker tests (offline mode, cache invalidation)
- [ ] Add content validation tests (Markdown parsing)
- [ ] Run `*nfr-assess` to validate NFR compliance

### Phase 5: Quality Gate (Week 6)
- [ ] Achieve 60%+ test coverage (combined)
- [ ] All P0 tests green (user journeys, a11y, performance)
- [ ] Run `*trace` to validate requirements-to-tests mapping
- [ ] Pass `*implementation-readiness` gate

---

## 9. Conclusion

The meal-plans project has a testable architecture (static site, file-based content) but **ZERO tests** currently exist. This represents a **CRITICAL** risk and technical debt accumulation.

**Immediate action required:**
1. Set up test infrastructure (Playwright + Vitest) - Week 1
2. Backfill tests for completed Epics 1-2 - Week 2-3
3. Adopt ATDD for remaining Epic 3 stories - Week 4+
4. Pass implementation-readiness gate - Week 6

**Estimated Total Effort:** 40-60 hours (spread over 6 weeks)

**ROI:** High - prevents production bugs, enables confident refactoring, establishes quality culture

---

**Document Status:** FINAL
**Next Workflow:** `*framework` (initialize test infrastructure)
**Owner:** Ryan
**Generated By:** tea agent (Murat - Master Test Architect)
