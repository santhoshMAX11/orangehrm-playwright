export default class LoginPage{
    constructor(page){
        this.page=page;
        this.username='[name="username"]'
        this.password='[name="password"]'
        this.loginBtn='[type="submit"]'
    }

    async loginForm(user, pass){
        await this.page.fill(this.username,user)
        await this.page.fill(this.password,pass)
        await this.page.locator(this.loginBtn).click()
    }


}
