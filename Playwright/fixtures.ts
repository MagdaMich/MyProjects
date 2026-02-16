import { test as base, Page, expect } from '@playwright/test';

type AdFixtures = {
  pageWithAdHandler: Page;
};

export const test = base.extend<AdFixtures>({
  pageWithAdHandler: async ({ page }, use) => {
    
    const dismissAds = async () => {
  try {
    const popupButton = page.locator("//p [text()='Consent']");
    const closeButton = page.locator("button[aria-label='Close'], .close-btn").first();

    if (await popupButton.count() > 0) {
      await popupButton.click({ timeout: 1000 }).catch(() => {});
    }

    if (await closeButton.count() > 0) {
      await closeButton.click({ timeout: 1000 }).catch(() => {});
    }
  } catch (e) {
  }
};
    await dismissAds();

    const adInterval = setInterval(dismissAds, 1000);

    page.on('framenavigated', () => dismissAds());

    await use(page);

    clearInterval(adInterval);
  },
});

export { expect };
