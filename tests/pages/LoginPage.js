export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = '[name="username"]'
        this.password = '[name="password"]'
        this.loginBtn = '[type="submit"]'
    }

    async loginForm(username, password) {
        await this.page.fill(this.username, username)
        await this.page.fill(this.password, password)
        //await this.page.waitforTimeout(50000)
        await this.page.click(this.loginBtn)
    }


}

