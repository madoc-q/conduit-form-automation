import { test } from '@playwright/test';

test('debug register page', async ({ page }) => {
  // Go to the page
  await page.goto('https://realworld-demo.netlify.app/#/register');
  
  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Wait 2 seconds for any dynamic content
  await page.waitForTimeout(2000);
  
  // Take a full page screenshot
  await page.screenshot({ path: 'debug-full-page.png', fullPage: true });
  
  // Log all buttons on the page
  const buttons = await page.locator('button').allTextContents();
  console.log('All buttons on page:', buttons);
  
  // Log all input elements
  const inputs = await page.locator('input').all();
  console.log(`Total inputs found: ${inputs.length}`);
  
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    const placeholder = await input.getAttribute('placeholder');
    console.log(`Input: type="${type}" placeholder="${placeholder}"`);
  }
  
  // Check if form exists
  const forms = await page.locator('form').count();
  console.log(`Forms found: ${forms}`);
  
  // Try to find button by text
  const signUpButton = page.getByRole('button', { name: /sign up/i });
  const isVisible = await signUpButton.isVisible();
  console.log(`Sign Up button visible: ${isVisible}`);
  
  if (!isVisible) {
    console.log('Sign Up button not found. Looking for any button with "Sign" text...');
    const signButtons = await page.locator('button:has-text("Sign")').allTextContents();
    console.log('Buttons with "Sign":', signButtons);
  }
});