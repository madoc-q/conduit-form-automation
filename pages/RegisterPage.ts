import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: /sign up/i });
    this.errorAlert = page.locator('.error-messages');
  }

  async goto() {
    await this.page.goto('https://demo.realworld.show/register');
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async register(username: string, email: string, password: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }

  // FIXED: Fill invalid data to enable the button
  async submitEmptyForm() {
    await this.usernameInput.fill('');
    await this.emailInput.fill('invalid-email');
    await this.passwordInput.fill('123');
    await this.signUpButton.click();
  }

  async getErrorText(): Promise<string> {
    await this.errorAlert.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.errorAlert.innerText()).trim();
  }
}