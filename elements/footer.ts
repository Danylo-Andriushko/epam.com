import { Page, Locator } from '@playwright/test';
import { BasePage } from 'pages/basePage';

export class Footer extends BasePage{
    public readonly footerContainer: Locator;
    constructor(page: Page) {
        super(page);
        this.footerContainer = page.locator('footer .footer-container')
    }

}