import { Locator, Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly usernameHeader: Locator;
  readonly bioText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameHeader = page.locator('.user-info h4');
    this.bioText = page.locator('.user-info p');
  }

  async goto(username: string) {
    await this.page.goto(`/profile/${username}`);
    await this.usernameHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getBioText(): Promise<string> {
    await this.bioText.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.bioText.innerText()).trim();
  }
}