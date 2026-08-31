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

    const topbar = document.querySelector(".topbar");
    const topnav = document.querySelector(".topnav");

    if (topbar && topnav) {
      topbar.classList.add("topbar-redesign");

      const searchLink = document.createElement("a");
      searchLink.className = "topbar-search";
      searchLink.href = "index.html#explorer";
      searchLink.setAttribute("aria-label", "Search aircraft, manufacturers, aircraft types, and pages");
      searchLink.setAttribute("aria-keyshortcuts", "/");
      searchLink.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-4-4"></path>
        </svg>
        <span>Search</span>
        <kbd>/</kbd>
      `;
      topnav.appendChild(searchLink);

      let lastScrollPosition = window.scrollY;
      let accumulatedScroll = 0;
      let pointerNearTop = false;
      let scrollFrame = null;

      function showTopbar() {
        topbar.classList.remove("topbar-is-hidden");
      }

      function hideTopbar() {
        if (!topbar.contains(document.activeElement)) {
          topbar.classList.add("topbar-is-hidden");
        }
      }

      function openSearch(event) {
        const searchInput = document.getElementById("search-input");
        const explorer = document.getElementById("explorer");

        if (!searchInput || !explorer) return;

        if (event) event.preventDefault();
        showTopbar();
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        explorer.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        window.setTimeout(() => searchInput.focus({ preventScroll: true }), reduceMotion ? 0 : 420);
      }

      searchLink.addEventListener("click", openSearch);

      window.addEventListener(
        "scroll",
        () => {
          if (scrollFrame) return;
          scrollFrame = window.requestAnimationFrame(() => {
            const currentScrollPosition = Math.max(window.scrollY, 0);
            const distance = currentScrollPosition - lastScrollPosition;

            if ((distance > 0 && accumulatedScroll < 0) || (distance < 0 && accumulatedScroll > 0)) {
              accumulatedScroll = 0;
            }
            accumulatedScroll += distance;

            if (currentScrollPosition < 72 || pointerNearTop) {
              showTopbar();
              accumulatedScroll = 0;
            } else if (accumulatedScroll > 18) {
              hideTopbar();
              accumulatedScroll = 0;
            } else if (accumulatedScroll < -10) {
              showTopbar();
              accumulatedScroll = 0;
            }

            lastScrollPosition = currentScrollPosition;
            scrollFrame = null;
          });
        },
        { passive: true }
      );

      document.addEventListener(
        "pointermove",
        (event) => {
          pointerNearTop = event.clientY <= 26;
          if (pointerNearTop) {
            showTopbar();
          }
        },
        { passive: true }
      );

      topbar.addEventListener("focusin", showTopbar);
      topbar.addEventListener("pointerenter", showTopbar);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") showTopbar();

        const target = event.target;
        const isTyping = target instanceof HTMLElement && (
          target.matches("input, textarea, select") || target.isContentEditable
        );

        if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping) {
          const searchInput = document.getElementById("search-input");
          if (searchInput) {
            openSearch(event);
          } else {
            event.preventDefault();
            window.location.href = "index.html#explorer";
          }
        }
      });
    }
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
