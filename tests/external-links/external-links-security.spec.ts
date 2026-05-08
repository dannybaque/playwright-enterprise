import { test, expect } from '@playwright/test';

test.describe('Suite 11 - Enlaces Externos y Seguridad', () => {
  test('TC-040: Todos los enlaces externos abren en nueva pestaña con rel correcto', async ({ page }) => {
    await page.goto('/');

    const externalLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors
        .filter((a) => {
          const href = (a as HTMLAnchorElement).href;
          return href.startsWith('http') && !href.startsWith('https://playwright.dev');
        })
        .map((a) => ({
          href: (a as HTMLAnchorElement).href,
          target: (a as HTMLAnchorElement).target,
          rel: (a as HTMLAnchorElement).rel,
        }));
    });

    expect(externalLinks.length).toBeGreaterThan(0);

    for (const link of externalLinks) {
      expect(link.target, `Link ${link.href} should open in a new tab`).toBe('_blank');
      expect(link.rel, `Link ${link.href} should include 'noopener' in rel`).toContain('noopener');
    }
  });
});
