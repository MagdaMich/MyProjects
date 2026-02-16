import { test as base, Page, expect } from '@playwright/test';

type AdFixtures = {
  pageWithAdHandler: Page;
};

export const test = base.extend<AdFixtures>({
  pageWithAdHandler: async ({ page }, use) => {
    
    const dismissAds = async () => {
      try {
        // TWOJA DZIAŁAJĄCA LOGIKA - wstawiona bezpośrednio tutaj
        // Uwaga: używamy dokładnego selektora, który u Ciebie działał
        const popupButton = page.locator("//p [text()='Consent']");
        
        if (await popupButton.isVisible({ timeout: 1000 }).catch(() => false)) {
          await popupButton.click().catch(() => {});
        }

        // Dodatkowo: generic close button dla innych reklam (opcjonalnie)
        const closeButton = page.locator("button[aria-label='Close'], .close-btn").first();
        if (await closeButton.isVisible({ timeout: 500 }).catch(() => false)) {
          await closeButton.click().catch(() => {});
        }
      } catch (e) {
        // Ignoruj błędy tła
      }
    };

    // 1. Spróbuj zamknąć od razu
    await dismissAds();

    // 2. Ustaw interwał, ale skróć go do 1 sekundy, żeby szybciej reagował
    const adInterval = setInterval(dismissAds, 1000);

    // 3. Reaguj na nawigację
    page.on('framenavigated', () => dismissAds());

    await use(page);

    clearInterval(adInterval);
  },
});

export { expect };
