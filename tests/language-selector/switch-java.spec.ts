import { test, expect } from '@playwright/test';

test.describe('Suite 4 - Selector de Lenguaje de Programación', () => {
  test('TC-016: Cambiar lenguaje a Java actualiza los ejemplos de código', async ({ page }) => {
    await page.goto('/');

    const javaTab = page.getByRole('tab', { name: 'Java' });
    await javaTab.click();

    await expect(javaTab).toHaveAttribute('aria-selected', 'true');

    const codeBlock = page.locator('pre code').first();
    await expect(codeBlock).toContainText('import com.microsoft.playwright');
    await expect(codeBlock).toContainText('public class');
  });
});
