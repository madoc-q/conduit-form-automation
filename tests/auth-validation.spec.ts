import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage';

test.describe('Form, Auth & Input Validation Suite', () => {
  const password = 'password123';

  function createUserCredentials() {
    const uniqueId = Date.now();
    return {
      username: `qauser${uniqueId}`,
      email: `qauser${uniqueId}@mail.com`,
    };
  }

  test('happy path login with valid credentials', async ({ page }) => {
    const { username, email } = createUserCredentials();
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);
    await expect(page.getByRole('link', { name: username })).toBeVisible();

    await page.goto('/settings');
    await page.getByRole('button', { name: 'Or click here to logout.' }).click();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();

    await loginPage.goto();
    await loginPage.login(email, password);
    await expect(page.getByRole('link', { name: username })).toBeVisible();
  });

  test('negative registration with blank form shows error banner', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.submitEmptyForm();
    const errorText = await registerPage.getErrorText();
    expect(errorText).toContain("can't be blank");
  });
  
  test('negative registration with duplicate email shows error banner', async ({ page }) => {
    const { username, email } = createUserCredentials();
    const registerPage = new RegisterPage(page);
  
    await registerPage.goto();
    await registerPage.register(username, email, password);
    await expect(page.getByRole('link', { name: username })).toBeVisible();
  
    await page.goto('/settings');
    await page.getByRole('button', { name: 'Or click here to logout.' }).click();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  
    await registerPage.goto();
    await registerPage.register(`${username}_dup`, email, password);
  
    const errorText = await registerPage.getErrorText();
    expect(errorText.toLowerCase()).toContain('already'); // FIXED
  });
  
  test('boundary registration with short password shows length error', async ({ page }) => {
    const { username, email } = createUserCredentials();
    const registerPage = new RegisterPage(page);
  
    await registerPage.goto();
    await registerPage.register(username, email, 'abc');
  
    const errorText = await registerPage.getErrorText();
    expect(errorText.toLowerCase()).toContain('minimum'); // FIXED
  });

  test('profile update and validation across settings and profile pages', async ({ page }) => {
    const { username, email } = createUserCredentials();
    const newBio = `Updated bio ${Date.now()}`;
    const registerPage = new RegisterPage(page);
    const settingsPage = new SettingsPage(page);
    const profilePage = new ProfilePage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);
    await expect(page.getByRole('link', { name: username })).toBeVisible();

    await settingsPage.goto();
    await settingsPage.updateBio(newBio);

    await expect(profilePage.usernameHeader).toHaveText(username);
    await expect(profilePage.bioText).toHaveText(newBio);
    expect(await profilePage.getBioText()).toBe(newBio);
  });
});