import { BasePage } from "pages/basePage";
import type { Page, Locator } from '@playwright/test';

export class InsightsPage extends BasePage {
    public readonly url: string;
    
    constructor(page: Page) {
    super(page)
    this.url = 'insights'
}
}