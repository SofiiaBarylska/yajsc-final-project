import { Page } from "@playwright/test";
import { AccountPage } from "../account.page";
import { CartPage } from "../cart.page";
import { HomePage } from "../home.page";
import { LoginPage } from "../login.page";
import { ProductPage } from "../product.page";
import { CheckoutPage } from "../checkoutPage";


export class AllPages {
    page: Page;
    loginPage: LoginPage;
    accountPage: AccountPage;
    cartPage: CartPage;
    homePage: HomePage;
    productPage: ProductPage;
    checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.checkoutPage = new CheckoutPage(page); 
    }
}