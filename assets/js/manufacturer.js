document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const site = window.AviationSite;
  const root = document.getElementById("manufacturer-detail-root");
  const params = new URLSearchParams(window.location.search);
  const manufacturer = data.getManufacturerById(params.get("id"));

  function initRevealAnimations() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  function renderNotFound() {
    if (site) {
      site.setMetadata({ title: "Manufacturer Not Found", description: "This aircraft manufacturer profile could not be found.", path: "manufacturer.html", noIndex: true });
    }
    root.innerHTML = `
      <section class="message-card reveal">
        <p class="eyebrow">Manufacturer Missing</p>
        <h1>This Manufacturer Was Not Found</h1>
        <p>Pick a manufacturer from the explorer to open a valid detail page.</p>
        <a class="button button-primary" href="index.html">Back To The Explorer</a>
      </section>
    `;
    initRevealAnimations();
  }

  if (!manufacturer) {
    renderNotFound();
    return;
  }

  const families = data.getAircraftFamilies(manufacturer);
  const pagePath = `manufacturer.html?id=${encodeURIComponent(manufacturer.id)}`;
  const pageDescription = `Explore every ${manufacturer.name} aircraft family and choose a specific model to see dimensions, performance, engines, capacity, and sources.`;
  const relatedManufacturers = data.manufacturers
    .filter((item) => item.id !== manufacturer.id && item.category === manufacturer.category)
    .slice(0, 3);

  if (site) {
    site.setMetadata({ title: `${manufacturer.name} Aircraft Families & Models`, description: pageDescription, path: pagePath });
    site.setStructuredData("manufacturer-schema", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${manufacturer.name} aircraft families and models`,
      description: pageDescription,
      url: site.absoluteUrl(pagePath),
      breadcrumb: site.breadcrumbSchema([{ name: "Home", path: "index.html" }, { name: manufacturer.name, path: pagePath }]),
      about: {
        "@type": "Organization",
        name: manufacturer.name,
        foundingDate: manufacturer.founded,
        areaServed: manufacturer.country,
        url: manufacturer.source ? manufacturer.source.url : undefined
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: manufacturer.aircraft.length,
        itemListElement: manufacturer.aircraft.map((aircraft, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: aircraft.name,
          url: site.absoluteUrl(`aircraft.html?id=${aircraft.id}`)
        }))
      }
    });
  }

  function quickSpec(aircraft, label) {
    const value = aircraft.detail?.specs?.dimensions?.[label];
    return value && !/not yet verified|varies by|program[- ]dependent|model[- ]specific|not listed|unknown/i.test(String(value)) ? value : "";
  }

  function renderDimensionSpecs(aircraft, className) {
    const labels = aircraft.class === "Helicopter"
      ? ["Length", "Main rotor diameter", "Rotor diameter", "Height"]
      : ["Length", "Wingspan", "Height"];
    const values = labels.map((label) => ({ label, value: quickSpec(aircraft, label) })).filter((item) => item.value);
    return values.length
      ? `<dl class="${className}" aria-label="${aircraft.name} dimensions">${values.map((item) => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join("")}</dl>`
      : "";
  }

  function renderVariantCard(aircraft) {
    return `
      <article class="family-variant-card">
        <div class="family-variant-heading">
          <div>
            <span class="program-state">${aircraft.programState}</span>
            <h3>${aircraft.name}</h3>
          </div>
          <span class="meta-chip">First flight ${aircraft.firstFlight}</span>
        </div>
        <p class="variant-type">${aircraft.type}</p>
        ${renderDimensionSpecs(aircraft, "variant-quick-specs")}
        <p>${aircraft.overview}</p>
        <div class="card-actions">
          <a class="button button-primary button-compact" href="aircraft.html?id=${aircraft.id}">View ${aircraft.name} specifications</a>
          <a class="detail-link" href="type.html?id=${encodeURIComponent(aircraft.class)}">${aircraft.class}</a>
        </div>
      </article>
    `;
  }

  function renderFamily(family) {
    if (family.aircraft.length === 1) {
      const aircraft = family.aircraft[0];
      return `
        <article class="aircraft-family family-direct-card reveal" id="family-${family.id}">
          <a class="family-direct-link" href="aircraft.html?id=${aircraft.id}" aria-label="View ${aircraft.name} specifications">
            <span class="family-summary-copy">
              <span class="family-kicker">Aircraft</span>
              <strong>${aircraft.name}</strong>
              <span>${aircraft.type}</span>
            </span>
            ${renderDimensionSpecs(aircraft, "direct-quick-specs")}
            <span class="family-direct-action">View aircraft <span aria-hidden="true">→</span></span>
          </a>
        </article>
      `;
    }

    const modelLabel = `${family.aircraft.length} model${family.aircraft.length === 1 ? "" : "s"}`;
    return `
      <details class="aircraft-family reveal" id="family-${family.id}">
        <summary class="family-summary">
          <span class="family-summary-copy">
            <span class="family-kicker">Aircraft family</span>
            <strong>${family.name}</strong>
            <span>${family.description}</span>
          </span>
          <span class="family-summary-meta">
            <span class="family-count">${modelLabel}</span>
            <span class="family-toggle" aria-hidden="true"></span>
          </span>
        </summary>
        <div class="family-content">
          <div class="family-content-heading">
            <div>
              <p class="eyebrow">Choose A Model</p>
              <h2>${family.name}</h2>
            </div>
            <div class="tag-row">
              ${family.classes.map((item) => `<span class="tag">${item}</span>`).join("")}
            </div>
          </div>
          <div class="family-variants-grid">
            ${family.aircraft.map(renderVariantCard).join("")}
          </div>
        </div>
      </details>
    `;
  }

  root.innerHTML = `
    <section class="detail-hero manufacturer-hero">
      ${site ? site.breadcrumbMarkup([{ name: "Home", path: "index.html" }, { name: manufacturer.name, path: pagePath }]) : ""}
      <div class="detail-hero-panel reveal">
        <div class="detail-header">
          <div class="detail-copy">
            <p class="eyebrow">Manufacturer Guide</p>
            <div class="meta-row">
              <span class="badge">${manufacturer.category}</span>
              <span class="status-chip">${manufacturer.status}</span>
            </div>
            <h1>${manufacturer.name} Aircraft</h1>
            <p>${manufacturer.summary}</p>
          </div>
          <div class="manufacturer-stat-card" aria-label="Catalogue size">
            <strong>${families.length}</strong>
            <span>aircraft groups</span>
            <small>${manufacturer.aircraft.length} individual model${manufacturer.aircraft.length === 1 ? "" : "s"}</small>
          </div>
        </div>

        <div class="detail-grid manufacturer-facts">
          <article class="detail-panel"><h2>Country or region</h2><p>${manufacturer.country}</p></article>
          <article class="detail-panel"><h2>Founded</h2><p>${manufacturer.founded}</p></article>
          <article class="detail-panel"><h2>Aircraft focus</h2><p>${manufacturer.aircraftFocus.join(" · ")}</p></article>
        </div>

        <div class="hero-actions">
          <a class="button button-primary" href="#aircraft-families">Browse aircraft families</a>
          ${manufacturer.source ? `<a class="button button-secondary" href="${manufacturer.source.url}" target="_blank" rel="noopener noreferrer">Official ${manufacturer.name} source <span aria-hidden="true">↗</span></a>` : ""}
        </div>
      </div>
    </section>

    <section class="detail-section-shell detail-section manufacturer-catalog" id="aircraft-families">
      <div class="catalog-intro reveal">
        <div>
          <p class="eyebrow">All Aircraft In One Place</p>
          <h2>${manufacturer.name} aircraft families and models</h2>
          <p>Open a multi-model family to choose a variant, or select a single aircraft directly. Dimensions are visible before you open the full technical page.</p>
        </div>
        <nav class="family-jump-list" aria-label="Jump to an aircraft family">
          ${families.map((family) => `<a href="#family-${family.id}">${family.aircraft.length === 1 ? family.aircraft[0].name : family.name}</a>`).join("")}
        </nav>
      </div>

      <div class="family-list">
        ${families.map(renderFamily).join("")}
      </div>
    </section>

    <section class="detail-section-shell detail-section">
      <div class="detail-panel reveal related-manufacturers-panel">
        <div>
          <p class="eyebrow">Keep Exploring</p>
          <h2>Related manufacturers</h2>
          <p>Compare aircraft from other manufacturers in the same broad category.</p>
        </div>
        <div class="related-grid">
          ${relatedManufacturers.map((item) => `
            <article class="related-card">
              <span class="badge">${item.category}</span>
              <h3>${item.name}</h3>
              <p>${item.summary}</p>
              <div class="card-actions"><a class="detail-link" href="manufacturer.html?id=${item.id}">Explore ${item.name}</a></div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  initRevealAnimations();
});
