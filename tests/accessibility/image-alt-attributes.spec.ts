import { test, expect } from '@playwright/test';

test.describe('Suite 9 - Accesibilidad', () => {
  test('TC-035: Imágenes con atributos alt correctos', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    const violations: string[] = [];

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      const role = await img.getAttribute('role');
      const src = await img.getAttribute('src');

      const isDecorative =
        alt === '' || ariaHidden === 'true' || role === 'presentation' || role === 'none';
      const isInformative = alt !== null && alt.trim().length > 0;

      if (!isDecorative && !isInformative) {
        violations.push(`Image src="${src}" missing valid alt (alt="${alt}")`);
      }
    }

    expect(violations, violations.join('\n')).toHaveLength(0);
  });
});
