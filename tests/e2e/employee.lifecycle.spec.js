import {test, expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import EmployeePage from "../pages/EmployeePage"
import testData from "../utils/TestData.json"

test('Create and Delete employee',async({page,request})=>{

    const login=new LoginPage(page)
    const empPage=new EmployeePage(page)
    await page.goto('/')
    await login.loginForm(testData.login.username,testData.login.password)  
    await expect(page).toHaveURL(testData.empPageUrl)
    await empPage.createEmployee(testData.employee.firstName,testData.employee.lastName,testData.employee.EmpId)
    const response=await request.get(`/web/index.php/pim/viewPersonalDetails/empNumber/`)
    expect(response.status()).toBe(404)
    await empPage.deleteEmployee(testData.employee.EmpId)



})