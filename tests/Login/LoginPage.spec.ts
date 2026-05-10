import {expect, test, request} from '../../fixtures/customFixture';
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@00"};


test.beforeEach(async ({ page, pageObject }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await pageObject.loginPage.loginApplication(
        "testmanmails@gmail.com",
        "Test@123"
    );

});


test.beforeAll( async() => {
     
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad
    }
    ); // 200, 201

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();

  const token = loginResponseJson.token;

})



test("Verify login with username and password", async({page, pageObject}) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await pageObject.loginPage.loginApplication("testmanmails@gmail.com", "Test@123");
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");     
})

test("Verify redirection to orders page after login", async({page, pageObject}) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await pageObject.loginPage.loginApplication("testmanmails@gmail.com", "Test@123");
    await pageObject.dashBoardPage.clickOnOrdersLink();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/myorders");
})




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