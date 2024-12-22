import type { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  public url!: string;
  
  constructor(page: Page) {
    this.page = page;
  }

  public async open(page: Page) {
    await page.goto(this.url);
  }
}