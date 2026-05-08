import { test, expect } from '@playwright/test';

test.describe('Suite 10 - Documentación (Flujos internos)', () => {
  test('TC-036: Sidebar de la documentación es navegable', async ({ page }) => {
    await page.goto('/docs/intro');

    const sidebar = page.locator('aside.theme-doc-sidebar-container');
    await expect(sidebar).toBeVisible();

    await expect(sidebar.getByText(/Getting Started/i)).toBeVisible();

    const writingTestsLink = sidebar.getByRole('link', { name: /Writing tests/i });
    await writingTestsLink.click();

    await expect(page).toHaveURL(/\/docs\/writing-tests/);
    await expect(writingTestsLink).toHaveClass(/active|menu__link--active/);
  });
});
