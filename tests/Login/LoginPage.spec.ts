import { expect, test, request } from '../../fixtures/customFixture';
import { APiUtils } from './utils/APiUtils';
const loginPayLoad = { userEmail: "testmanmails@gmail.com", userPassword: "Test@123" };  // JS object will be converted to json at runtime 
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let token: any;
let response: any;


// test.beforeEach(async ({ page, pageObject }) => {       // API Login using beforeEach() hook 

//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

//     await pageObject.loginPage.loginApplication(
//         "testmanmails@gmail.com", "Test@123"
//     );

// });



test.beforeAll(async () => {

        const apiContext = await request.newContext();                   // Created new request context
        const apiUtils = new APiUtils(apiContext, loginPayLoad);
        token = await apiUtils.getToken();
        response = await apiUtils.createOrder(orderPayLoad, token);
        console.log(token);

})




test("Verify login with username and password", async ({ page, pageObject }) => {

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await pageObject.loginPage.loginApplication("testmanmails@gmail.com", "Test@123");
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

})



test("Verify redirection to orders page after login", async ({ page, pageObject }) => {

        await page.addInitScript(value => {                      // JS Code, Not Playwright

                window.localStorage.setItem('token', value);     // Use JS Code to set token in Local Storage

        }, token);

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");    // Open the browser to set token
        await pageObject.dashBoardPage.clickOnOrdersLink();
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/myorders");

})


//create order is success
test('@API Place the order', async ({ page }) => {

        await page.addInitScript(value => {

                window.localStorage.setItem('token', value);

        }, response.token);

        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
                const rowOrderId = await rows.nth(i).locator("th").textContent();

                if (response.orderId.includes(rowOrderId)) {
                        await rows.nth(i).locator("button").first().click();
                        break;
                }
        }

        const orderIdDetails = await page.locator(".col-text").textContent();
        //await page.pause();
        expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});




/*

// Flow of test with fixture

Playwright test starts
        ↓
page fixture created
        ↓
custom fixture receives page
        ↓
PageObjectManager created
        ↓
LoginPage created
        ↓
Test receives pageObject fixture
        ↓
Test calls loginApplication()

*/