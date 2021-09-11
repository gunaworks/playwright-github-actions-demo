import { test, expect } from '@playwright/test';
import {SignupPage} from "../pages/signup-page";

test('User sign up test', async ({ page }) => {
    let signupPage = new SignupPage(page);
    await signupPage.goto('/projects');
    await signupPage.signup();
});