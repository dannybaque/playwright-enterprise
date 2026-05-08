import { test, expect } from '@playwright/test';

test.describe('Suite 12 - Performance y Métricas', () => {
  test('TC-043: No hay recursos críticos con respuesta lenta (mayor a 3s)', async ({ page }) => {
    const slowResources: { url: string; duration: number }[] = [];

    page.on('response', (response) => {
      const url = response.url();
      const isCritical = url.endsWith('.js') || url.endsWith('.css');
      if (!isCritical) return;

      const timing = response.timing();
      const duration = timing.responseEnd - timing.requestStart;

      if (duration > 3000) {
        slowResources.push({ url, duration });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(
      slowResources,
      `Slow critical resources found:\n` +
        slowResources.map((r) => `  ${r.url} — ${r.duration.toFixed(0)}ms`).join('\n')
    ).toHaveLength(0);
  });
});
