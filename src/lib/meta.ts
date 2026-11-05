export const meta = (title: string, description: string, pathname = "/") => ({
  meta: [
    { title: `${title} | Solala سلالة` },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { property: "og:title", content: `${title} | Solala سلالة` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Solala سلالة" },
    { property: "og:locale", content: "ar_EG" },
    { property: "og:url", content: `https://solalaa.com${pathname}` },
    { property: "og:image", content: "https://solalaa.com/solala-logo.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${title} | Solala سلالة` },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "https://solalaa.com/solala-logo.png" },
  ],
  links: [{ rel: "canonical", href: `https://solalaa.com${pathname}` }],
});
