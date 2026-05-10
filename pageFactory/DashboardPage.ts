import {Page, Locator, expect, BrowserContext} from '@playwright/test';

export class DashBoardPage {

    readonly page: Page;
    readonly ordersLink : Locator;

    constructor(page: Page) {

        this.page = page;

        this.ordersLink = page.locator("//button[@routerlink='/dashboard/myorders']");
    
    }


    async clickOnOrdersLink(): Promise<void> {

        await this.ordersLink.click();

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