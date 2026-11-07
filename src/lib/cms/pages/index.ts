import type { PageDef } from "../schema";
import { homePage } from "./home";
import { aboutPage } from "./about";
import { coursesPage, livestockPage } from "./courses";
import { consultingPage } from "./consulting";
import { breedPage } from "./breed";
import { entrepreneurshipPage } from "./entrepreneurship";
import { libraryPage } from "./library";
import { landscapePage } from "./landscape";
import { faqPage } from "./faq";
import { policiesPage } from "./policies";
import { contactPage } from "./contact";

/** Every admin-editable page, in the order shown in the admin. */
export const CMS_PAGES: PageDef[] = [
  homePage,
  aboutPage,
  coursesPage,
  livestockPage,
  consultingPage,
  breedPage,
  entrepreneurshipPage,
  libraryPage,
  landscapePage,
  faqPage,
  policiesPage,
  contactPage,
];

export function findCmsPage(key: string) {
  return CMS_PAGES.find((p) => p.key === key);
}
