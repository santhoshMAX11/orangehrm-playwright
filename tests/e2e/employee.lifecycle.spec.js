import { test, expect } from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import EmployeePage from "../pages/EmployeePage"
import testData from "../utils/TestData.json"
import DashboardPage from "../pages/DashboardPage";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.loginForm(
    process.env.ORANGE_USERNAME,
    process.env.ORANGE_PASSWORD
  );
  await page.waitForURL('**/dashboard/index', { timeout: 60000 });
});


test.describe.serial('ordered flow', () => {

  test('Authentication, Employee Creation', async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const empPage = new EmployeePage(page)
    await dashboardpage.goToPIM()
    await expect(page.locator('.oxd-table-filter-title')).toBeVisible();
    await empPage.AddEmployeeBtn()
    await expect(page.locator('[class="oxd-text oxd-text--h6 orangehrm-main-title"]')).toBeVisible()
    await empPage.createEmployee(testData.employee.firstName, testData.employee.lastName, testData.employee.EmpId)
    await page.reload()
  })

  test("Employee update", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const empPage = new EmployeePage(page)
    await dashboardpage.goToPIM()
    await expect(
      page.getByRole('heading', { name: 'Employee Information' })
    ).toBeVisible();
    await empPage.searchAndWait(testData.employee.EmpId)
    await expect(page.locator(`//div[@class="oxd-table-card"]//div[text()="${testData.employee.EmpId}"]`)).toBeVisible()
    await expect(row).toBeVisible();
    await empPage.ClickingOnEdit(testData.employee.EmpId)
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await empPage.Updatefirstname(testData.employee.UpdateName)
  })

  test("Role-Based Validation", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const roleText = await dashboardpage.getRoleText();
    expect(roleText).toBe('Admin');
    await page.reload()

  })

  test("Deletion", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const empPage = new EmployeePage(page)
    await dashboardpage.goToPIM()
    await expect(
      page.getByRole('heading', { name: 'Employee Information' })
    ).toBeVisible();
    await empPage.searchAndWait(testData.employee.EmpId)
    await expect(page.locator(`//div[@class="oxd-table-card"]//div[text()="${testData.employee.EmpId}"]`)).toBeVisible()
    await empPage.deleteEmployee(testData.employee.EmpId)
    await page.reload()
  })

})






