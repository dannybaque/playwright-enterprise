import {  chromium } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

async function globalSetup() {
  const browsers = await chromium.launch();
  const page = await browsers.newPage();
  await page.goto('https://the-internet.herokuapp.com/login');
  const loginPage = new LoginPage(page);
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  
  // Espera a que el login complete antes de guardar
  await page.waitForURL('**/secure');
  
  await page.context().storageState({ path: 'tests/auth/auth.json' });
  await browsers.close();
}

export default globalSetup;