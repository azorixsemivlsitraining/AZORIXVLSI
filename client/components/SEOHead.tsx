import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function SEOHead({
  title = "AZORIX TECH-SEMI VLSI INSTITUTE - Premier VLSI Training Institute",
  description = "Leading VLSI training institute offering comprehensive courses in Design Verification, Verilog, SystemVerilog, UVM, RTL Design, and Physical Design with 100% placement assistance.",
  canonical,
  keywords = "VLSI training, Design Verification, Verilog, SystemVerilog, UVM, RTL Design, Physical Design, VLSI courses, semiconductor training",
  ogTitle,
  ogDescription,
  ogImage = "/placeholder.svg",
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SEOHeadProps) {
  useEffect(() => {
    // Add Google Analytics script
    const addGoogleAnalytics = () => {
      if (document.querySelector('script[src*="googletagmanager"]')) return;
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-SDSTEJ6P1M";
      document.head.appendChild(gtagScript);
      const configScript = document.createElement("script");
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SDSTEJ6P1M');
      `;
      document.head.appendChild(configScript);
    };

    addGoogleAnalytics();
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", canonical);
    }

    setMetaTag("description", description);
    setMetaTag("keywords", keywords);

    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:image", ogImage, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:site_name", "AZORIX TECH-SEMI VLSI INSTITUTE", true);
    if (canonical) setMetaTag("og:url", canonical, true);

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", twitterTitle || ogTitle || title);
    setMetaTag(
      "twitter:description",
      twitterDescription || ogDescription || description,
    );
    setMetaTag("twitter:image", twitterImage || ogImage);

    setMetaTag("robots", "index, follow");
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("author", "AZORIX TECH-SEMI VLSI INSTITUTE");
    setMetaTag("language", "en");

    // Ensure favicon is consistently set (helps when navigating SPA routes)
    const ensureIcon = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel as any;
        document.head.appendChild(link);
      }
      if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    };
    ensureIcon("icon", "/favicon.ico");
    ensureIcon("apple-touch-icon", "/favicon.ico");

    // Inject JSON-LD Organization/EducationalOrganization with correct phone
    const ldId = "ld-json-organization";
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = ldId;
    const siteUrl =
      canonical ||
      (typeof window !== "undefined" ? window.location.href : undefined);
    const org = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Azorix VLSI",
      url: siteUrl,
      logo: "/favicon.ico",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 9052653636",
          contactType: "customer support",
          areaServed: "IN",
        },
      ],
    };
    script.text = JSON.stringify(org);
    document.head.appendChild(script);
  }, [
    title,
    description,
    canonical,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);

  return null;
}
