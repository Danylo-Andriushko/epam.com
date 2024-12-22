import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from 'pages/basePage';
import { pagesUrl } from 'urls/urls';

export class Header extends BasePage{
    public readonly headerContainer: Locator;
    public readonly logoButton: Locator;
    public readonly mainMenuItems: Locator;
    public readonly servicesMainMenuItem: Locator;
    public readonly industriesMainMenuItem: Locator;
    public readonly insightsMainMenuItem: Locator;
    public readonly aboutMainMenuItem: Locator;
    public readonly careersMainMenuItem: Locator;
    public readonly hamburgerMenu: Locator;
    public readonly hamburgerMenuButton: Locator;
    public readonly servicesHamburgerMenuItem: Locator;
    public readonly insightsHamburgerMenuItem: Locator;
    public readonly industriesHamburgerMenuItem: Locator;
    public readonly aboutHamburgerMenuItem: Locator;
    public readonly careersHamburgerMenuItem: Locator;
    public readonly searchButton: Locator;
    public readonly inputField: Locator;
    public readonly findButton: Locator;
    public readonly hamburgerMenuItems: Locator
    public readonly themeSwitcher: Locator
    public readonly languageButton: Locator
    public readonly languagesList: Locator
  
    protected readonly page: Page;

  constructor(page: Page) {
      super(page);
        this.page = page;
        this.headerContainer = page.locator('header .header__inner');
        this.logoButton = page.getByRole('link', { name: 'EPAM EPAM' });
        this.mainMenuItems = page.locator('nav.top-navigation-ui-23[aria-label="Main navigation"] a.top-navigation__item-link.js-op');
        this.servicesMainMenuItem = page.locator('li').filter({ hasText: 'Services Expand: Services' }).getByRole('link');
        this.insightsMainMenuItem = page.locator('li').filter({ hasText: 'Insights Expand: Insights' }).getByRole('link');
        this.aboutMainMenuItem = page.locator('li').filter({ hasText: 'About Expand: About About' }).getByRole('link');
        this.careersMainMenuItem = page.locator('li').filter({ hasText: 'Careers Expand: Careers' }).getByRole('link');
      
      // this.hamburgerMenu = page.locator('.hamburger-menu__dropdown-section');
        this.hamburgerMenuItems = page.locator('a.hamburger-menu__link.first-level-link.gradient-text:first-of-type')
        this.hamburgerMenuButton = page.locator('button.hamburger-menu__button');
        this.servicesHamburgerMenuItem = page.locator('span').filter({ hasText: 'Services Services' }).getByRole('link');
        this.insightsHamburgerMenuItem = page.locator('span').filter({ hasText: 'Insights Insights' }).getByRole('link');  
        this.aboutHamburgerMenuItem = page.locator('span').filter({ hasText: 'About About' }).getByRole('link');
        this.careersHamburgerMenuItem = page.locator('span').filter({ hasText: 'Careers Careers' }).getByRole('link');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.inputField = page.locator('input#new_form_search');
        this.findButton = page.getByRole('button', { name: 'Find' });
        this.themeSwitcher = page.getByText('Dark Mode Light Mode').nth(1);
        this.languageButton = page.getByRole('button', {name: 'Global'});
        this.languagesList = page.locator('.location-selector__item');
      
  }

  async getMenuItemsText(menuItems: any) {
      const names = [];
      const itemCount = await menuItems.count();
    for (let i = 0; i < itemCount; i++) {
      const itemText = await menuItems.nth(i).innerText();
      names.push(itemText);
  }
      return names;
}
  
  async navigationMenuItemsName() {
    const ifHamburgerMenuIsOpened = await this.hamburgerMenuButton.getAttribute('aria-expanded');
    const menuItems = ifHamburgerMenuIsOpened === 'true' ? this.hamburgerMenuItems : this.mainMenuItems;
    return await this.getMenuItemsText(menuItems);
  }

async getAllNavigationClickableElement(menuItems: any) {
  const itemCount = await menuItems.count();
  for (let i = 0; i < itemCount; i++) {
    const element = menuItems.nth(i);
    const isClickable = await element.isEnabled();
    if (!isClickable) {
      return false;
    }
  }
    return true;
}

async areNavigationMenuItemsIsClickable() {
    const ifHamburgerMenuIsOpened = await this.hamburgerMenuButton.getAttribute('aria-expanded');
    const menuItems = ifHamburgerMenuIsOpened === 'true' ? this.hamburgerMenuItems : this.mainMenuItems;
    return await this.getAllNavigationClickableElement(menuItems);
}

  async openHamburgerMenu() {
    const hamburgerButton = this.hamburgerMenuButton;
    await hamburgerButton.click();
    await this.hamburgerMenuItems.first().waitFor({ state: 'visible' });
}

  async areEachItemMenuLeadToTheCorrectPage(
    page: Page,
    baseUrl: string,
    services: string,
    insights: string,
    about: string,
    careers: string) {
    const ifHamburgerMenuIsOpened = await this.hamburgerMenuButton.getAttribute('aria-expanded');
    if (ifHamburgerMenuIsOpened === 'true') {
       const hamburgerMenuItems = [
      { menu: this.servicesHamburgerMenuItem, expectedUrl: baseUrl + services },
      { menu: this.insightsHamburgerMenuItem, expectedUrl: baseUrl + insights },
      { menu: this.aboutHamburgerMenuItem, expectedUrl: baseUrl + about },
      { menu: this.careersHamburgerMenuItem, expectedUrl: baseUrl + careers }
    ];

      for (const { menu, expectedUrl } of hamburgerMenuItems) {
      const menuIsOpened = await this.hamburgerMenuButton.getAttribute('aria-expanded');
        if (menuIsOpened === 'true') {
          await menu.click();
        } else if (menuIsOpened === 'false') {
          await this.hamburgerMenuButton.click();
          await menu.click();
      }
      expect(page.url()).toEqual(expectedUrl);
    }
    }
    else {
      const mainMenuItems = [
      { menu: this.servicesMainMenuItem, expectedUrl: baseUrl + services },
      { menu: this.insightsMainMenuItem, expectedUrl: baseUrl + insights },
      { menu: this.aboutMainMenuItem, expectedUrl: baseUrl + about },
      { menu: this.careersMainMenuItem, expectedUrl: baseUrl + careers }
        ];
      for (const { menu, expectedUrl } of mainMenuItems) {
      await menu.click();
      expect(page.url()).toEqual(expectedUrl);
    }
    }
  }
  
  async inputSearchData(searchData: string) {
    await this.searchButton.click();
    await this.inputField.fill(searchData)
    await this.findButton.click();
  }

  async toggleAndCheckTheme(page: Page, mode: 'light' | 'dark') {
    await this.themeSwitcher.click();
    const modeClass = mode === 'light' ? '.fonts-loaded.light-mode' : '.fonts-loaded.dark-mode';
    const modeAttribute = await page.locator(modeClass).getAttribute('data-mode-switcher');
    expect(modeAttribute).toBe('true');
  }
  
  async checkThemeSwitcher(page: Page) {
    await this.toggleAndCheckTheme(page, 'light');
    await this.toggleAndCheckTheme(page, 'dark');
}

};