import { test, expect } from '@playwright/test';

test.describe('Suite 1 - Carga y Renderizado de la Página Principal', () => {
  test('TC-002: Sin errores JavaScript ni recursos 404 en la carga inicial', async ({ page }) => {
    const failedRequests: { url: string; status: number }[] = [];
    const consoleErrors: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      const isCritical =
        url.endsWith('.js') ||
        url.endsWith('.css') ||
        url.includes('/fonts/') ||
        /\.(woff2?|ttf|eot)(\?.*)?$/.test(url);

      if (isCritical && status >= 400) {
        failedRequests.push({ url, status });
      }
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    expect(
      failedRequests,
      `Failed critical resources: ${JSON.stringify(failedRequests, null, 2)}`
    ).toHaveLength(0);

    expect(
      consoleErrors,
      `Console errors found: ${JSON.stringify(consoleErrors, null, 2)}`
    ).toHaveLength(0);
  });
});
