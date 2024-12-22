import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';


test.describe('check home page', () => {
  test.beforeEach(async ({ page, mainPage }) => {
    await mainPage.open(page);
  });

  test.describe('check header', () => {
    test('the main page should have header element', async ({ header }) => {
      const headerElement = header.headerContainer;
      await expect(headerElement).toBeVisible();
    });
    test('the header logo should have name EPAM', async ({ header }) => {
      const headersLogoName = await header.logoButton.getAttribute('alt');
      expect(headersLogoName).toBe('EPAM');
    });

    test('the main navigation menu should contains appropriate menu items', async ({ header }) => {
      const expectedMenuItemsName = ['Services', 'Industries', 'Insights', 'About', 'Careers']
      const menuItemsName = await header.navigationMenuItemsName();
      expect(menuItemsName).toEqual(expectedMenuItemsName);
    });

    test('each main menu item should be clickable', async ({ header }) => {
      const eachItemIsClickable = await header.areNavigationMenuItemsIsClickable()
      expect(eachItemIsClickable).toBe(true)
    });

    test('each main menu item should navigate to the correct page',
      async ({ baseURL, page, header, servicesPage, insightsPage, aboutPage, careersPage }) => {
        await header.areEachItemMenuLeadToTheCorrectPage(
          page, baseURL, servicesPage.url, insightsPage.url, aboutPage.url, careersPage.url
        );
    });
    
    test('the hamburger navigation menu should contains appropriate menu items', async ({ page, header }) => {
      const expectedMenuItemsName = ['Services', 'Industries', 'Insights', 'About', 'Careers'];
      await header.hamburgerMenuButton.click();
      const menuItemsName = await header.navigationMenuItemsName();
      expect(menuItemsName).toEqual(expectedMenuItemsName);
    });

    test('each main hamburger menu item should be clickable', async ({ header }) => {
      await header.hamburgerMenuButton.click();
      const eachItemIsClickable = await header.areNavigationMenuItemsIsClickable();
      expect(eachItemIsClickable).toBe(true);
    });
    
     test('each hamburger menu item should navigate to the correct page',
       async ({ baseURL, page, header, servicesPage, insightsPage, aboutPage, careersPage }) => {
        await header.hamburgerMenuButton.click()
        await header.areEachItemMenuLeadToTheCorrectPage(
          page, baseURL, servicesPage.url, insightsPage.url, aboutPage.url, careersPage.url
        );
       });
    
    test('Validate search functionality', async ({ header, searchPage }) => {
        const searchData = 'Data science'
        await header.inputSearchData(searchData);
        await searchPage.validateSearchResults(searchData);
    });

    test('epam logo button should navigate to the home page from each pages', async ({ page, header, baseURL }) => {
      const menuItems = [
        header.servicesMainMenuItem,
        header.insightsMainMenuItem,
        header.aboutMainMenuItem,
        header.careersMainMenuItem
      ];

      for (const menuItem of menuItems) {
        await menuItem.click();
        await header.logoButton.click();
        expect(page.url()).toEqual(baseURL);
      }
    });

    test('theme switcher should change color mode', async ({ page, header, baseURL }) => {
      await header.checkThemeSwitcher(page)
    });

    test('language link should display a list of 11 languages', async ({ page, header, baseURL }) => {
      await header.languageButton.click();
      const currentLanguagesList = await header.languagesList.count();
      expect(currentLanguagesList).toBe(11);
    });
  })
});



