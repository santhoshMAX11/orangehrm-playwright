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
    await page.waitForLoadState()
    await empPage.AddEmployeeBtn()
    await empPage.createEmployee(testData.employee.firstName, testData.employee.lastName, testData.employee.EmpId)
  })


  test("Employee update", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const empPage = new EmployeePage(page)
    await dashboardpage.goToPIM()
    await empPage.EmpUpdate(testData.employee.EmpId)
    await empPage.search(testData.employee.EmpId)
    await page.waitForSelector('input[name="firstName"]', {
      timeout: 60000
    });
    await empPage.Updatefirstname(testData.employee.UpdateName)
  })

  test("Deletion", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    const empPage = new EmployeePage(page)
    await dashboardpage.goToPIM()
    await empPage.deleteEmployee(testData.employee.EmpId)
  })

  test("Role-Based Validation", async ({ page }) => {
    const dashboardpage = new DashboardPage(page)
    await dashboardpage.getrole()
    await expect(
      page.getByRole('link', { name: 'Admin' })
    ).toHaveText('Admin');
  })

})






