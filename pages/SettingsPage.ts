import { Locator, Page } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly imageUrlInput: Locator;
  readonly bioTextarea: Locator;
  readonly usernameInput: Locator;
  readonly updateSettingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Explicit attribute mappings to prevent positional mixing
    this.imageUrlInput = page.locator('input[name="image"]');
    this.usernameInput = page.locator('input[name="username"]');
    this.bioTextarea = page.locator('textarea[name="bio"]');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async goto() {
    await this.page.goto('/settings');
    await this.updateSettingsButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async updateBio(bio: string) {
    await this.bioTextarea.clear();
    await this.bioTextarea.fill(bio);
    await this.updateSettingsButton.click();
  }
}