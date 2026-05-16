import { test,expect } from "../fixtures/index";

test('test auth', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
  await expect(authenticatedPage).toHaveURL(/the-internet\.herokuapp\.com\/secure/);
});