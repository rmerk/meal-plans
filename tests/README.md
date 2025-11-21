# Test Suite Documentation

**Framework:** Playwright
**Language:** TypeScript
**Generated:** 2025-11-21

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Test Architecture](#test-architecture)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI Integration](#ci-integration)
- [Knowledge Base References](#knowledge-base-references)

---

## Setup Instructions

### 1. Install Dependencies

Test dependencies are already installed (`@playwright/test`, `@faker-js/faker`).

### 2. Install Playwright Browsers

```bash
pnpm exec playwright install
```

This downloads Chromium, Firefox, and WebKit browsers for testing.

### 3. Configure Environment (Optional)

Copy `.env.example` to `.env` if you need custom environment variables:

```bash
cp .env.example .env
```

**Default Values:**
- `BASE_URL=http://localhost:3000` (dev server)
- `TEST_ENV=local`

---

## Running Tests

### Basic Commands

```bash
# Run all tests (headless)
pnpm test

# Run tests with UI mode (interactive)
pnpm test:ui

# Run tests in headed mode (see browser)
pnpm test:headed

# Debug tests (step through with debugger)
pnpm test:debug

# View test report
pnpm test:report
```

### Advanced Commands

```bash
# Run specific test file
pnpm test tests/e2e/homepage.spec.ts

# Run tests matching a pattern
pnpm test --grep "homepage"

# Run tests in specific browser
pnpm test --project=chromium

# Run tests in parallel with 4 workers
pnpm test --workers=4

# Update screenshots (visual regression)
pnpm test --update-snapshots
```

---

## Test Architecture

### Directory Structure

```
tests/
├── e2e/                        # End-to-end test files
│   └── example.spec.ts         # Sample tests (delete when ready)
├── support/                    # Test infrastructure
│   ├── fixtures/               # Custom fixtures for tests
│   │   └── index.ts            # Fixture definitions
│   └── helpers/                # Utility functions
│       └── content-helpers.ts  # Content parsing utilities
└── README.md                   # This file
```

### Fixture Pattern

Tests use Playwright's fixture pattern for setup/teardown and dependency injection.

**Example Fixture:**

```typescript
// tests/support/fixtures/index.ts
import { test as base } from '@playwright/test';

type TestFixtures = {
  userFactory: UserFactory;
};

export const test = base.extend<TestFixtures>({
  userFactory: async ({}, use) => {
    const factory = new UserFactory();
    await use(factory); // Provide fixture to test
    await factory.cleanup(); // Auto-cleanup after test
  },
});
```

**Benefits:**
- Automatic setup and cleanup
- Dependency injection
- Type-safe fixtures
- Composable patterns

---

## Writing Tests

### Test Structure

```typescript
import { test, expect } from '../support/fixtures';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // 1. Navigate
    await page.goto('/');

    // 2. Interact
    await page.click('[data-testid="button"]');

    // 3. Assert
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Selector Strategy

**Always prefer `data-testid` attributes:**

```typescript
// ✅ GOOD: Stable, semantic
await page.click('[data-testid="meal-plan-card"]');

// ❌ BAD: Brittle, implementation-dependent
await page.click('.css-class-xyz > div:nth-child(2)');
```

### Network-First Pattern

**Wait for network responses before asserting:**

```typescript
// ✅ GOOD: Deterministic
const responsePromise = page.waitForResponse('**/api/recipes');
await page.click('[data-testid="load-recipes"]');
await responsePromise;
await expect(page.getByTestId('recipe-list')).toBeVisible();

// ❌ BAD: Non-deterministic
await page.click('[data-testid="load-recipes"]');
await page.waitForTimeout(3000); // NEVER use arbitrary waits
await expect(page.getByTestId('recipe-list')).toBeVisible();
```

### Content Validation

**Use helper utilities for content parsing:**

```typescript
import { parseRecipeFrontmatter, validateRecipe } from '../support/helpers/content-helpers';

test('recipe should have valid metadata', async ({ page }) => {
  await page.goto('/meals/week-1/recipes/chicken-tacos');

  const title = await page.getByRole('heading', { level: 1 }).textContent();
  expect(title).toBe('Chicken Tacos');

  // Verify structured data (if exposed via API)
  const response = await page.request.get('/api/recipes/chicken-tacos');
  const recipe = await response.json();
  expect(validateRecipe(recipe)).toBe(true);
});
```

---

## Best Practices

### 1. Test Isolation

**Each test must be independent:**
- No shared state between tests
- Clean up test data after each test
- Use fixtures for automatic cleanup

### 2. Deterministic Tests

**Avoid flaky tests:**
- ❌ NEVER use `page.waitForTimeout()`
- ✅ ALWAYS use `page.waitForResponse()` or element state checks
- ❌ NO conditionals (`if/else`) in test logic
- ✅ YES explicit, linear test paths

### 3. Explicit Assertions

**Keep assertions in test bodies:**
- ❌ DON'T hide `expect()` calls in helper functions
- ✅ DO use helpers for data extraction/transformation

### 4. Test Length

**Keep tests focused:**
- Target: <300 lines per test
- Split large tests into smaller, focused tests
- Extract setup logic to fixtures

### 5. Execution Time

**Optimize for speed:**
- Target: <1.5 minutes per test
- Use API for data setup (faster than UI)
- Run tests in parallel (`--workers=4`)

---

## CI Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Run Playwright tests
        run: pnpm test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: test-results/html
          retention-days: 30
```

---

## Knowledge Base References

The test architecture follows patterns from the TEA (Test Expert Agent) knowledge base:

### Core Patterns

- **Fixture Architecture** (`.bmad/bmm/testarch/knowledge/fixture-architecture.md`)
  - Pure function → fixture → mergeTests composition
  - Auto-cleanup pattern for resource management

- **Data Factories** (`.bmad/bmm/testarch/knowledge/data-factories.md`)
  - Faker-based factories with overrides
  - Nested factory composition
  - API seeding for fast test setup

- **Network-First Safeguards** (`.bmad/bmm/testarch/knowledge/network-first.md`)
  - Intercept-before-navigate workflow
  - Deterministic waits (no `waitForTimeout`)
  - HAR capture for debugging

- **Test Quality Definition of Done** (`.bmad/bmm/testarch/knowledge/test-quality.md`)
  - Deterministic tests (no conditionals)
  - Isolated tests (no shared state)
  - Explicit assertions (visible in test body)
  - Length limits (<300 lines)
  - Time limits (<1.5 minutes)

### Framework-Specific

- **Playwright Configuration** (`.bmad/bmm/testarch/knowledge/playwright-config.md`)
  - Environment-based config
  - Timeout standards (action 15s, navigation 30s, test 60s)
  - Artifact output (screenshots, videos, traces)
  - Parallelization strategies

---

## Troubleshooting

### Common Issues

**1. Tests fail with "Cannot find module" errors**

Solution: Ensure dependencies are installed:
```bash
pnpm install
```

**2. Tests fail with "Browser not found" errors**

Solution: Install Playwright browsers:
```bash
pnpm exec playwright install
```

**3. Tests timeout waiting for dev server**

Solution: Increase `webServer.timeout` in `playwright.config.ts` or start dev server manually:
```bash
pnpm dev  # In one terminal
pnpm test # In another terminal
```

**4. Tests fail in CI but pass locally**

Solution: Check for:
- Missing environment variables
- Different Node/pnpm versions
- Race conditions (increase retries in CI config)

---

## Next Steps

1. **Delete Example Tests:** Remove `tests/e2e/example.spec.ts` when you're ready
2. **Write Your First Test:** Start with P0 user journeys (homepage, navigation)
3. **Add Fixtures:** Create custom fixtures for your app (user factories, content helpers)
4. **Run ATDD Workflow:** Use `/bmad:bmm:workflows:atdd` to generate tests for stories
5. **Review Test-Design Doc:** See `docs/system-test-design.md` for comprehensive strategy

---

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Fixtures](https://playwright.dev/docs/test-fixtures)
- [Test Retries](https://playwright.dev/docs/test-retries)
- [CI Integration](https://playwright.dev/docs/ci)

---

**Generated by:** tea agent (Murat - Master Test Architect)
**Workflow:** `*framework` (testarch/framework)
