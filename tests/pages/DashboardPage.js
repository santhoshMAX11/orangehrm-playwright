export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.roleButton = page.getByRole('link', { name: 'Admin' })
  }

  async goToPIM() {
    await this.pimMenu.waitFor({ state: 'visible' });
    await this.pimMenu.click();
  }

  async getrole() {
    const text = await this.roleButton.innerText();
    return text

  }
}
