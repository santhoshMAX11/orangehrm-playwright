import { test, expect } from "@playwright/test"
export default class EmployeePage {
  constructor(page) {
    this.page = page
    this.pimMenu = 'a[href*="pim/viewPimModule"]'
    this.AddEmployee = '//a[normalize-space()="Add Employee"]'
    this.FirstName = '[name="firstName"]'
    this.LastName = '[name="lastName"]'
    this.EnterEmpId = '//label[normalize-space()="Employee Id"]/parent::div/following-sibling::div/input'
    this.SaveBtn = page.getByRole('button', { name: 'Save' })
    this.SearchBtn = page.getByRole('button', { name: 'Search' })
    this.YesDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' })
    this.SaveUpdate = page.getByRole('button', { name: 'Save' });

  }

  async AddEmployeeBtn() {
    await this.page.click(this.AddEmployee)
  }
  async createEmployee(firstName, SecondName, EI) {
    await this.page.fill(this.FirstName, firstName)
    await this.page.fill(this.LastName, SecondName)
    await this.page.fill(this.EnterEmpId, "")
    await this.page.fill(this.EnterEmpId, EI)
    await  this.SaveBtn.click()

  }

  async clickonPIM() {
    await this.page.click(this.pimMenu)
  }

  async searchAndWait(empId) {
    await this.page.fill(this.EnterEmpId, empId)
    await  this.SearchBtn.click()
  }
  async deleteEmployee(empId){
    await this.page.click(`//div[text()="${empId}"]/ancestor::div[@class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]//i[@class="oxd-icon bi-trash"]`);
    await  this.YesDeleteBtn.click()
  }


  async ClickingOnEdit(empId) {
    await this.page.click(`//div[text()="${empId}"]/ancestor::div[@class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]//i[@class="oxd-icon bi-pencil-fill"]`)

  }
  async Updatefirstname(UpdatedName) {
    const firstName = this.page.locator(this.FirstName);
    await firstName.click();          
    await firstName.fill(UpdatedName); 
    await this.SaveUpdate.click()
  }

}



