export default class EmployeePage{
    constructor(page){
        this.page=page
        this.PIMbtn="//span[text()='PIM']"
        this.AddEmployee="//a[text()='Add Employee']"
        this.FirstName='[name="firstName"]'
        this.LastName='[name="lastName"]'
        this.EnterEmpId='//*[text()="Employee Id"]/parent::div/following-sibling::div/input'
        this.SaveBtn="//button[text()=' Save ']"
        this.EmpId="//*[text()='Employee Id']/parent::div/following-sibling::div/input"
        this.SearchBtn='[type="submit"]'
        //this.SelectEmpId="//div[text()='0280']/parent::div/preceding-sibling::div"
        this.YesDeleteBtn='//*[@class="oxd-icon bi-trash oxd-button-icon"] '
    }

    async createEmployee(firstName,SecondName,EI){
        await this.page.click(this.PIMbtn)
        await this.page.click(this.AddEmployee)
        await this.page.fill(this.FirstName,firstName)
        await this.page.fill(this.LastName,SecondName)
        await this.page.fill(this.EnterEmpId,'')
        await this.page.fill(this.EnterEmpId,EI)
        await this.page.click(this.SaveBtn)
    
    }

    async deleteEmployee(empId){
    await this.page.click(this.PIMbtn)
    await this.page.fill(this.EmpId, empId);
    await this.page.click(this.SearchBtn);
    await this.page.click(`//div[text()='${empId}']/parent::div/preceding-sibling::div`);
    await this.page.click(`//div[text()="${empId}"]/ancestor::div[@class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]//i[@class="oxd-icon bi-trash"]`);
    await this.page.click(this.YesDeleteBtn);

         
    }


}