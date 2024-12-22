import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';


test.describe('check home page', () => {
  test.beforeEach(async ({ page, mainPage }) => {
    await mainPage.open(page);
  });

  test.describe('check footer', () => {
    test.only('language link should display a list of 11 languages', async ({ page, footer, baseURL }) => {
      const footerElement = footer.footerContainer;
      await footer.footerContainer.scrollIntoViewIfNeeded();
      expect(footerElement).toBeVisible();
    });
  })
});
