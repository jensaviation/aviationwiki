(function () {
  "use strict";

  const SITE_NAME = "The Aviation Wiki";
  const BASE_URL = "https://jensaviation.github.io/aviationwiki/";
  const DEFAULT_IMAGE = `${BASE_URL}assets/images/aviation-wiki-social.png`;

  function absoluteUrl(path = "") {
    return new URL(path.replace(/^\//, ""), BASE_URL).href;
  }

  function upsertMeta(selector, attributes) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      document.head.appendChild(node);
    }
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
  }

  function upsertLink(rel, href) {
    let node = document.head.querySelector(`link[rel="${rel}"]`);
    if (!node) {
      node = document.createElement("link");
      node.rel = rel;
      document.head.appendChild(node);
    }
    node.href = href;
  }

  function setStructuredData(id, value) {
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement("script");
      node.type = "application/ld+json";
      node.id = id;
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(value);
  }

  function setMetadata({ title, description, path = "", type = "website", image = DEFAULT_IMAGE, noIndex = false }) {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = absoluteUrl(path);
    document.title = fullTitle;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, follow" : "index, follow, max-image-preview:large"
    });
    upsertLink("canonical", url);
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: "The Aviation Wiki — aircraft facts, dimensions and history"
    });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  }

  function breadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path)
      }))
    };
  }

  function breadcrumbMarkup(items) {
    return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
      .map((item, index) => {
        const isLast = index === items.length - 1;
        return `<li>${isLast ? `<span aria-current="page">${item.name}</span>` : `<a href="${item.path}">${item.name}</a>`}</li>`;
      })
      .join("")}</ol></nav>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "skip-link";
      skipLink.href = "#main-content";
      skipLink.textContent = "Skip to main content";
      document.body.prepend(skipLink);
    }

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".topnav a").forEach((link) => {
      const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop() || "index.html";
      if (linkPage === currentPage) link.setAttribute("aria-current", "page");
    });
  });

  window.AviationSite = {
    SITE_NAME,
    BASE_URL,
    DEFAULT_IMAGE,
    absoluteUrl,
    setMetadata,
    setStructuredData,
    breadcrumbSchema,
    breadcrumbMarkup
  };
})();
