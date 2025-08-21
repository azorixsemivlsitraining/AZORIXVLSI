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
      // Check if script already exists
      if (document.querySelector('script[src*="googletagmanager"]')) {
        return;
      }

      // Add gtag script
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-SDSTEJ6P1M";
      document.head.appendChild(gtagScript);

      // Add gtag configuration
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
    // Set document title
    document.title = title;

    // Set or update meta tags
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

    // Set canonical link
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", canonical);
    }

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);

    // Open Graph tags
    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:image", ogImage, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:site_name", "AZORIX TECH-SEMI VLSI INSTITUTE", true);

    if (canonical) {
      setMetaTag("og:url", canonical, true);
    }

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", twitterTitle || ogTitle || title);
    setMetaTag(
      "twitter:description",
      twitterDescription || ogDescription || description,
    );
    setMetaTag("twitter:image", twitterImage || ogImage);

    // Additional SEO meta tags
    setMetaTag("robots", "index, follow");
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("author", "AZORIX TECH-SEMI VLSI INSTITUTE");
    setMetaTag("language", "en");
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
