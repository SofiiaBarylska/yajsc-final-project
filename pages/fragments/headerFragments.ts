import { Locator, Page } from "@playwright/test";

export class HeaderFragments {
    page: Page;
    navMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = this.page.locator('[data-test="nav-menu"]');
    }
}