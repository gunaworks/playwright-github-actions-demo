import { test, expect } from '@playwright/test';

test('First sample test', async ({ page }) => {
    await page.goto('/projects');
    const title = page.locator('title');
    await expect(title).toContainText('Lokalise');
});