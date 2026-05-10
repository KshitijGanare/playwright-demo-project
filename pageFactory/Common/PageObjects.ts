import { Page } from "@playwright/test";
import { LoginPage } from "../LoginPage";
import { DashBoardPage } from "../DashboardPage";


export class PageObjectManager{

    readonly page : Page;
    readonly loginPage : LoginPage;
    readonly dashBoardPage : DashBoardPage;

    constructor(page : Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);

    }


}