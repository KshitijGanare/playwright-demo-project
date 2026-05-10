import {Page, Locator, expect, BrowserContext} from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }


    async loginApplication(email: string, password: string): Promise<void> {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
}

/*
   1. import Page, Locator, expect, BrowserContext
    Page - Used to import type, represents browser tab/page.
    Locator - represents web element


   2. Create class, used export to import class
    
   readonly - value cannot be assigned later


   3. Constructor Injection

   
*/