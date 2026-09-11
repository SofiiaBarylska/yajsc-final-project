import { expect, Locator, Page } from "@playwright/test";


export class CheckoutPage {
  page: Page;
  billingStepBtn: Locator;
  country: Locator;
  postalCode: Locator;
  houseNumber: Locator;
  state: Locator;
  paymentStepBtn: Locator;
  paymentSelector: Locator;
  creditCard: Locator;
  expirationDate: Locator;
  cvvCode: Locator;
  holderName: Locator;
  confirmBtn: Locator;
  loggedInMessage: Locator;
  successfulMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billingStepBtn = this.page.getByTestId("proceed-2");
    this.country = this.page.getByTestId("country");
    this.postalCode = this.page.getByTestId("postal_code");
    this.houseNumber = this.page.getByTestId("house_number");
    this.state = this.page.getByTestId("state");
    this.paymentStepBtn = this.page.getByTestId("proceed-3");
    this.paymentSelector = this.page.getByTestId("payment-method");
    this.creditCard = this.page.getByTestId("credit_card_number");
    this.expirationDate = this.page.getByTestId("expiration_date");
    this.cvvCode = this.page.getByTestId("cvv");
    this.holderName = this.page.getByTestId("card_holder_name");
    this.confirmBtn = this.page.getByTestId("finish");
    this.successfulMessage = this.page.getByTestId("payment-success-message");
    this.loggedInMessage = this.page.getByText(
      "Hello Jane Doe, you are already logged in. You can proceed to checkout.",
    );
  }
  async isUserLoggedIn(): Promise<boolean> {
    return await this.loggedInMessage.isVisible();
  }
  async goToBillingStep(): Promise<void> {
    await this.billingStepBtn.click();
  }
  async goToPaymentStep(): Promise<void> {
    await this.paymentStepBtn.click();
  }

  async choosePaymentMethod(): Promise<void> {
    await this.paymentSelector.selectOption({ label: "Credit Card" });
  }

  async fillBillingAddress(): Promise<void> {
    await this.country.selectOption({ label: "Ukraine" });
    await this.postalCode.fill("33000");
    await this.houseNumber.fill("10");
    await this.state.fill("Rivne");
  }
  async fillPaymentDetails(): Promise<void> {
    await this.creditCard.fill("1111-1111-1111-1111");

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 3);

    const month = String(expirationDate.getMonth() + 1).padStart(2, "0");
    const year = expirationDate.getFullYear();

    await this.expirationDate.fill(`${month}/${year}`);

    await this.cvvCode.fill("111");
    await this.holderName.fill("Jane Doe");
  }
  async confirmPayment(): Promise<void> {
    await this.confirmBtn.click();
  }

  async orderIsSuccessful(): Promise<void> {
    await expect(this.successfulMessage).toBeVisible();
    await expect(this.successfulMessage).toHaveText(
      "Payment was successful",
    );
  }
};