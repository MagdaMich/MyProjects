import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}
  
  continueShopping = this.page.getByRole('button', {
    name: 'Continue Shopping',
  });
  messageAddLabel = this.page.locator('.modal-body .text-center:first-child');
  messageAddText: string = 'Your product has been added to cart.';
  vievCartLink = this.page.locator('.modal-body .text-center:nth-child(2)');
  popupButton = this.page.locator("//p [text()='Consent']");
  adCloseButton = this.page.locator("button[aria-label='Close'], .close-btn, [class*='close']").first();

  async dismissAd() {
    try {
      if (await this.popupButton.isVisible({ timeout: 2000 })) {
        await this.popupButton.click();
        return;
      }
    } catch (e) {
    }

    try {
      // Try generic close button
      if (await this.adCloseButton.isVisible({ timeout: 2000 })) {
        await this.adCloseButton.click();
      }
    } catch (e) {
      // Ad not found, continue
    }
  }
}

