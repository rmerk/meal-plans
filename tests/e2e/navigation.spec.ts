import { test, expect } from '@playwright/test';

/**
 * Navigation Tests - Epic 1 & 2
 *
 * P0 (Critical Path) tests for core user journeys:
 * - Homepage loads and displays meal plans
 * - Navigate to meal plan overview
 * - Navigate to recipe detail
 * - Navigate to prep strategy
 *
 * These tests validate the fundamental navigation flows that
 * MUST work for the application to be functional.
 */

test.describe('[P0] Homepage - Meal Plans Dashboard', () => {
  test('should load homepage and display meal plan cards', async ({ page }) => {
    // GIVEN: User navigates to homepage
    await page.goto('/');

    // WHEN: Page loads
    await page.waitForLoadState('networkidle');

    // THEN: Page title is correct
    await expect(page).toHaveTitle(/Meal Plans/i);

    // AND: Main heading is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // AND: At least one meal plan card is visible
    // Note: Cards use role="link" and UButton with "View Meal Plan" text
    const viewButtons = page.getByRole('button', { name: /View Meal Plan/i });
    await expect(viewButtons.first()).toBeVisible();
  });

  test('should display correct number of meal plan cards', async ({ page }) => {
    // GIVEN: User is on homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // WHEN: Counting meal plan cards
    // Cards have role="link" with aria-label containing "View" and "meal plan"
    const cards = page.locator('[role="link"][aria-label*="View"][aria-label*="meal plan"]');

    // THEN: Should have 3 meal plan cards (Week 1, 2, 3)
    await expect(cards).toHaveCount(3);
  });
});

test.describe('[P0] Meal Plan Overview Page', () => {
  test('should navigate to Week 1 meal plan overview', async ({ page }) => {
    // GIVEN: User is on homepage
    await page.goto('/');

    // WHEN: User clicks on Week 1 meal plan card
    // Cards are now NuxtLink elements with href="/meals/week-X"
    await page.locator('a[href="/meals/week-1"]').click();

    // THEN: URL changes to Week 1 overview
    await expect(page).toHaveURL('/meals/week-1');

    // AND: Page heading contains "Week 1"
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Week 1');
  });

  test('should display recipe and prep strategy buttons on meal plan overview', async ({ page }) => {
    // GIVEN: User navigates to Week 1 overview
    await page.goto('/meals/week-1');
    await page.waitForLoadState('networkidle');

    // WHEN: Page loads
    // THEN: "View Recipe Gallery" link is visible (UButton with :to renders as link)
    const recipeLink = page.getByRole('link', { name: /View Recipe Gallery/i });
    await expect(recipeLink).toBeVisible();

    // AND: "View Prep Strategy" link is visible
    const prepLink = page.getByRole('link', { name: /View Prep Strategy/i });
    await expect(prepLink).toBeVisible();
  });

  test('should navigate to recipe gallery from meal plan overview', async ({ page }) => {
    // GIVEN: User is on Week 1 overview
    await page.goto('/meals/week-1');

    // WHEN: User clicks "View Recipe Gallery" link
    await page.getByRole('link', { name: /View Recipe Gallery/i }).click();

    // THEN: URL changes to recipes page
    await expect(page).toHaveURL('/meals/week-1/recipes');

    // AND: Page heading contains "Recipe Gallery"
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Recipe Gallery');
  });
});

test.describe('[P0] Recipe Detail Page', () => {
  test('should navigate to recipe detail from recipe gallery', async ({ page }) => {
    // GIVEN: User is on Week 1 recipe gallery
    await page.goto('/meals/week-1/recipes');
    await page.waitForLoadState('networkidle');

    // WHEN: User clicks on first recipe card (NuxtLink)
    const firstRecipe = page.locator('a[href^="/meals/week-1/recipes/"]').first();
    await firstRecipe.click();

    // THEN: URL changes to recipe detail (should match pattern /meals/week-1/recipes/*)
    await expect(page).toHaveURL(/\/meals\/week-1\/recipes\/.+/);

    // AND: Recipe title (h1) is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display recipe content sections on detail page', async ({ page }) => {
    // GIVEN: User navigates directly to a recipe
    await page.goto('/meals/week-1/recipes/chicken-stir-fry');
    await page.waitForLoadState('networkidle');

    // WHEN: Page loads
    // THEN: Key sections are present (checking for common recipe elements)
    const pageContent = await page.content();

    // Recipe should have ingredients or instructions section
    const hasIngredients = pageContent.toLowerCase().includes('ingredient');
    const hasInstructions = pageContent.toLowerCase().includes('instruction') ||
                           pageContent.toLowerCase().includes('step') ||
                           pageContent.toLowerCase().includes('direction');

    expect(hasIngredients || hasInstructions).toBeTruthy();
  });

  test('should navigate back from recipe detail to gallery', async ({ page }) => {
    // GIVEN: User navigates to recipe gallery first
    await page.goto('/meals/week-1/recipes');
    await page.waitForLoadState('networkidle');

    // WHEN: User clicks on a recipe (NuxtLink)
    const firstRecipe = page.locator('a[href^="/meals/week-1/recipes/"]').first();
    await firstRecipe.click();
    await page.waitForLoadState('networkidle');

    // AND: User clicks browser back button
    await page.goBack();

    // THEN: User returns to recipe gallery
    await expect(page).toHaveURL('/meals/week-1/recipes');
  });
});

test.describe('[P0] Prep Strategy Page', () => {
  test('should navigate to prep strategy from meal plan overview', async ({ page }) => {
    // GIVEN: User is on Week 1 overview
    await page.goto('/meals/week-1');

    // WHEN: User clicks "View Prep Strategy" link
    await page.getByRole('link', { name: /View Prep Strategy/i }).click();

    // THEN: URL changes to prep strategy
    await expect(page).toHaveURL('/meals/week-1/prep-strategy');

    // AND: Page heading contains "Prep Strategy"
    const heading = page.getByRole('heading', { level: 1, name: /Prep Strategy/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should display prep strategy content', async ({ page }) => {
    // GIVEN: User navigates to prep strategy page
    await page.goto('/meals/week-1/prep-strategy');
    await page.waitForLoadState('networkidle');

    // WHEN: Page loads
    // THEN: Content is present (checking for common prep strategy keywords)
    const pageContent = await page.content();
    const hasContent = pageContent.length > 1000; // Basic content length check

    expect(hasContent).toBeTruthy();
  });

  test('should navigate back from prep strategy to overview', async ({ page }) => {
    // GIVEN: User navigates to meal plan overview first
    await page.goto('/meals/week-1');

    // WHEN: User clicks prep strategy link
    await page.getByRole('link', { name: /View Prep Strategy/i }).click();
    await page.waitForLoadState('networkidle');

    // AND: User clicks browser back button
    await page.goBack();

    // THEN: User returns to meal plan overview
    await expect(page).toHaveURL('/meals/week-1');
  });
});

test.describe('[P0] Cross-Week Navigation', () => {
  test('should navigate between different weeks', async ({ page }) => {
    // GIVEN: User is on homepage
    await page.goto('/');

    // WHEN: User clicks on Week 1 card
    await page.locator('a[href="/meals/week-1"]').click();
    await expect(page).toHaveURL('/meals/week-1');

    // AND: User navigates back to homepage
    await page.goto('/');

    // AND: User clicks on Week 2 card
    await page.locator('a[href="/meals/week-2"]').click();

    // THEN: URL changes to Week 2
    await expect(page).toHaveURL('/meals/week-2');

    // AND: Heading contains "Week 2"
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Week 2');
  });

  test('should navigate to all three weeks successfully', async ({ page }) => {
    // Test navigation to all weeks to ensure consistency

    // Week 1
    await page.goto('/');
    await page.locator('a[href="/meals/week-1"]').click();
    await expect(page).toHaveURL('/meals/week-1');

    // Week 2
    await page.goto('/');
    await page.locator('a[href="/meals/week-2"]').click();
    await expect(page).toHaveURL('/meals/week-2');

    // Week 3
    await page.goto('/');
    await page.locator('a[href="/meals/week-3"]').click();
    await expect(page).toHaveURL('/meals/week-3');
  });
});

test.describe('[P0] Mobile Responsive Navigation', () => {
  test('should display meal plans correctly on mobile viewport', async ({ page }) => {
    // GIVEN: Mobile viewport (iPhone 12 size)
    await page.setViewportSize({ width: 390, height: 844 });

    // WHEN: User navigates to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // THEN: Meal plan cards are visible (using actual links)
    const cards = page.locator('a[href^="/meals/week-"]');
    await expect(cards.first()).toBeVisible();

    // AND: Navigation works on mobile
    await cards.first().click();
    await expect(page).toHaveURL(/\/meals\/week-\d+/);
  });

  test('should navigate recipe detail on mobile viewport', async ({ page }) => {
    // GIVEN: Mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });

    // WHEN: User navigates to recipe detail
    await page.goto('/meals/week-1/recipes/chicken-teriyaki-stir-fry');

    // THEN: Recipe content is visible and readable
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});
