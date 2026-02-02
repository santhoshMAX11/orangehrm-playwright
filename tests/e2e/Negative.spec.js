import {test, expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import testData from "../utils/TestData.json"

test('Login with invalid credentials should fail', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.loginForm(testData.employee.NegativeUser, testData.employee.NegativePassword);
  await expect(
    page.locator('[class="oxd-text oxd-text--p oxd-alert-content-text"]')
  ).toHaveText('Invalid credentials');
  await expect(page).toHaveURL(/auth\/login/);
  await expect(
    page.locator('h6:has-text("Dashboard")')
  ).toHaveCount(0);
});

