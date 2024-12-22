import { test as base } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { Header } from "../elements/header";
import { ServicesPage } from "pages/servicesPage";
import { InsightsPage } from "pages/insightsPage";
import { IndustriesPage } from "pages/industriesPage";
import { CareersPage } from "pages/cereersPage";
import { AboutPage } from "pages/aboutPage";
import { SearchPage } from "pages/searchPage";
import { Footer } from "elements/footer";

type Pages = {
  mainPage: MainPage;
  servicesPage: ServicesPage;
  insightsPage: InsightsPage;
  industriesPage: IndustriesPage;
  careersPage: CareersPage;
  aboutPage: AboutPage;
  searchPage: SearchPage;
};

type Elements = {
  header: Header;
  footer: Footer;
};


export const test = base.extend<Pages & Elements>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  servicesPage: async ({ page }, use) => {
    await use(new ServicesPage(page));
  },

  insightsPage: async ({ page }, use) => {
    await use(new InsightsPage(page));
  },

  industriesPage: async ({ page }, use) => {
    await use(new IndustriesPage(page));
  },

   careersPage: async ({ page }, use) => {
    await use(new CareersPage(page));
  },
   
   aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
   
   searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
   
   footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
});