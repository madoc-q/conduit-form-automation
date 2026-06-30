import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,           // Keep at 1 worker to execute actions cleanly on the single-page application
  reporter: [['html', { open: 'never' }]],
  use: {
    /* CRITICAL FIX: The live app domain location */
    baseURL: 'https://demo.realworld.show', 
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});