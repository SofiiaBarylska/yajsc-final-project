import { Locator, Page } from "@playwright/test";

export class HeaderFragments {
    page: Page;
    navMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = page.getByTestId("nav-menu");
    }
}