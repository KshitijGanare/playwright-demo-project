import { test as base, expect, request } from '@playwright/test';
import { PageObjectManager } from '../pageFactory/Common/PageObjects';

type MyFixtures = {                     // Why? - This is TypeScript type definition.We are telling typescript that inside this fixture exists
    pageObject: PageObjectManager;
};

export const test = base.extend<MyFixtures>({

    pageObject: async ({ page }, use) => {

        const pageObject = new PageObjectManager(page);

        await use(pageObject);

    }

});

export { expect, request };   



/* exported expect so that test can import expect from same file 

If no export{expect} then when importing 

import { test } from '../fixtures/customFixture';
import { expect } from '@playwright/test';

*/


/*
HOW to use custom fixture or other fixtures?
Explanation: After creating custom fixture:
export const test = base.extend<MyFixtures>()

you should import:
test
expect

from:
customFixture.ts

NOT from:
@playwright/test

because your custom: test  contains EXTRA fixtures.

*/