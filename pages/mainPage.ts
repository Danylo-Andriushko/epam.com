import type { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
    public readonly url: string;
    private readonly searchIcon: Locator;
    

    constructor(page: Page) {
        super(page);
        this.url = '/';
        this.searchIcon = this.page.locator('.search-icon.dark-icon.header-search__search-icon');
    }

    async clickSearchIcon() {
        await this.searchIcon.click();
    }
}