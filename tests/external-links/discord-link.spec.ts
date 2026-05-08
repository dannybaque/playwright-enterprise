import { test, expect } from '@playwright/test';

test.describe('Suite 11 - Enlaces Externos y Seguridad', () => {
  test('TC-041: Enlace de Discord en Community apunta a URL válida', async ({ page, request }) => {
    await page.goto('/community');

    const discordLink = page.getByRole('link', { name: /discord/i });
    await expect(discordLink).toBeVisible();

    const href = await discordLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/discord/i);

    const response = await request.get(href!);
    expect(response.status()).toBe(200);
  });
});
