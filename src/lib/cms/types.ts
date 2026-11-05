export type SiteSettings = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  seoDescription: string;
};

export type CmsSectionItem = {
  id: string;
  title: string;
  description: string;
};

export type CmsSection = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  body: string;
  items: CmsSectionItem[];
  visible: boolean;
  updatedAt: string;
};

export type CmsPage = {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  published: boolean;
  updatedAt: string;
};

export type CmsStore = {
  version: number;
  settings: SiteSettings;
  sections: CmsSection[];
  pages: CmsPage[];
};
