import { BasePage } from "pages/basePage";
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchPage extends BasePage {
    // public readonly url: string;
    public readonly pageTitle: Locator
    
    constructor(page: Page) {
    super(page)
        // this.url = 'about'
        this.pageTitle = page.getByRole('heading', { name: 'results for "Data science"' });;
    }
    
    async validateSearchResults(searchData: string) {
        const textResult = await this.pageTitle.textContent();
        await expect(this.page).toHaveURL(/.*search.*/i);
        expect(textResult).toContain(searchData)
    }

}