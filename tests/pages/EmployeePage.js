import { test, expect } from "@playwright/test"
export default class EmployeePage {
  constructor(page) {
    this.page = page
    this.pimMenu = 'a[href*="pim/viewPimModule"]'
    this.AddEmployee = '//a[normalize-space()="Add Employee"]'
    this.FirstName = '[name="firstName"]'
    this.LastName = '[name="lastName"]'
    this.EnterEmpId = '//*[text()="Employee Id"]/parent::div/following-sibling::div/input'
    this.SaveBtn = "//button[text()=' Save ']"
    //this.EmpId="//*[text()='Employee Id']/parent::div/following-sibling::div/input"
    this.SearchBtn = '[type="submit"]'
    this.YesDeleteBtn = '//*[@class="oxd-icon bi-trash oxd-button-icon"]'
    this.SaveUpdate = '[class="orangehrm-horizontal-padding orangehrm-vertical-padding"] [type="submit"]'

  }

  async AddEmployeeBtn() {
    await this.page.click(this.AddEmployee)
  }
  async createEmployee(firstName, SecondName, EI) {
    await this.page.fill(this.FirstName, firstName)
    await this.page.fill(this.LastName, SecondName)
    await this.page.fill(this.EnterEmpId, "")
    await this.page.fill(this.EnterEmpId, EI)
    await this.page.click(this.SaveBtn)

  }


  async clickonPIM() {
    await this.page.click(this.pimMenu)
  }

  async deleteEmployee(empId) {
    await this.page.fill(this.EnterEmpId, empId)
    await this.page.click(this.SearchBtn)
    await this.page.click(`//div[text()='${empId}']/parent::div/preceding-sibling::div`);
    await this.page.click(`//div[text()="${empId}"]/ancestor::div[@class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]//i[@class="oxd-icon bi-trash"]`);
    await this.page.click(this.YesDeleteBtn)
    await this.page.click(this.SearchBtn)
  }

  async EmpUpdate(UPID) {
    await this.page.fill(this.EnterEmpId, UPID)
    await this.page.click(this.SearchBtn)
  }
  async search(empId) {
    await this.page.click(`//div[text()="${empId}"]/ancestor::div[@class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]//i[@class="oxd-icon bi-pencil-fill"]`)

  }
  async Updatefirstname(UpdatedName) {
    const firstName = this.page.locator(this.FirstName);
    await firstName.click();          
    await firstName.fill(UpdatedName); 
    await firstName.press('Tab');     
    await firstName.press('Tab')
    await this.page.locator(this.SaveUpdate).click()
  }

}



