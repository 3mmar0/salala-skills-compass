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
  id: string | number;
  key: string;
  pageSlug?: string;
  type?: string;
  position?: number;
  title: string;
  subtitle: string;
  body: string;
  items: CmsSectionItem[];
  visible: boolean;
  updatedAt: string;
  content?: {
    title?: string;
    subtitle?: string;
    body?: string;
    items?: CmsSectionItem[];
    ctaLabel?: string;
    ctaHref?: string;
    image?: string;
  };
};

export type CmsPage = {
  id?: number;
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  published: boolean;
  updatedAt: string;
  sections?: CmsSection[];
};

export type CmsStore = {
  version: number;
  settings: SiteSettings;
  sections: CmsSection[];
  pages: CmsPage[];
};
