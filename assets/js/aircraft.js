document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const site = window.AviationSite;
  const root = document.getElementById("aircraft-detail-root");

  if (!root || !data) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const aircraft = data.getAircraftById(params.get("id"));

  function timelineClassName(timeline) {
    return `timeline-${timeline.toLowerCase().replace(/\s+/g, "-")}`;
  }

  function initRevealAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  }

  function renderBulletList(items, className = "bullet-list") {
    if (!items || items.length === 0) {
      return "<p>Additional details can be expanded here as the wiki grows.</p>";
    }

    return `
      <ul class="${className}">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  function renderSpecGroup(title, specObject) {
    if (!specObject || Object.keys(specObject).length === 0) {
      return "";
    }

    return `
      <article class="aircraft-card">
        <h3>${title}</h3>
        <ul class="detail-list">
          ${Object.entries(specObject)
            .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
            .join("")}
        </ul>
      </article>
    `;
  }

  function specValue(specs, group, key, fallback = "Varies by model") {
    return specs && specs[group] && specs[group][key] ? specs[group][key] : fallback;
  }

  function renderNotFound() {
    if (site) {
      site.setMetadata({
        title: "Aircraft Not Found",
        description: "This aircraft entry could not be found. Browse the aircraft explorer to choose a valid profile.",
        path: "aircraft.html",
        noIndex: true
      });
    }
    root.innerHTML = `
      <section class="message-card reveal">
        <p class="eyebrow">Aircraft Missing</p>
        <h2>This Aircraft Entry Was Not Found</h2>
        <p>Open an aircraft page from one of the manufacturer cards to load a valid entry.</p>
        <a class="button button-primary" href="index.html">Back To The Explorer</a>
      </section>
    `;

    initRevealAnimations();
  }

  if (!aircraft) {
    renderNotFound();
    return;
  }

  const manufacturer = data.getManufacturerById(aircraft.manufacturerId);
  const detail = aircraft.detail || {};
  const specs = detail.specs || {};
  const manufacturerLabel = manufacturer ? manufacturer.name.split(" / ")[0] : aircraft.manufacturerName || "";
  const fullAircraftName = manufacturerLabel && !aircraft.name.toLowerCase().startsWith(manufacturerLabel.toLowerCase())
    ? `${manufacturerLabel} ${aircraft.name}`
    : aircraft.name;
  const relatedAircraft = manufacturer
    ? manufacturer.aircraft
        .filter((item) => item.id !== aircraft.id)
        .sort((left, right) => {
          const leftSameFamily = left.familyName && left.familyName === aircraft.familyName ? 0 : 1;
          const rightSameFamily = right.familyName && right.familyName === aircraft.familyName ? 0 : 1;
          return leftSameFamily - rightSameFamily;
        })
        .slice(0, 3)
    : [];

  const pagePath = `aircraft.html?id=${encodeURIComponent(aircraft.id)}`;
  const pageDescription = `${fullAircraftName} dimensions, wingspan, role, engines, first flight, related variants, history, and authoritative source references.`;

  if (site) {
    site.setMetadata({ title: `${fullAircraftName}: Dimensions & Facts`, description: pageDescription, path: pagePath, type: "article" });
    site.setStructuredData("aircraft-schema", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${fullAircraftName} aircraft profile`,
      description: pageDescription,
      mainEntityOfPage: site.absoluteUrl(pagePath),
      citation: aircraft.source ? aircraft.source.url : undefined,
      about: {
        "@type": "Thing",
        name: fullAircraftName,
        description: aircraft.overview,
        manufacturer: manufacturer ? { "@type": "Organization", name: manufacturer.name } : undefined
      },
      breadcrumb: site.breadcrumbSchema([
        { name: "Home", path: "index.html" },
        { name: manufacturer ? manufacturer.name : "Manufacturer", path: manufacturer ? `manufacturer.html?id=${manufacturer.id}` : "index.html" },
        { name: aircraft.name, path: pagePath }
      ])
    });
  }

  root.innerHTML = `
    <section class="detail-hero">
      ${site ? site.breadcrumbMarkup([
        { name: "Home", path: "index.html" },
        { name: manufacturer ? manufacturer.name : "Manufacturer", path: manufacturer ? `manufacturer.html?id=${manufacturer.id}` : "index.html" },
        { name: aircraft.name, path: pagePath }
      ]) : ""}
      <div class="detail-hero-panel reveal">
        <p class="eyebrow">Aircraft Dossier</p>
        <div class="detail-header">
          <div class="detail-copy">
            <div class="meta-row">
              <span class="timeline-chip ${timelineClassName(aircraft.timeline)}">${aircraft.timeline}</span>
              <span class="program-state">${aircraft.programState}</span>
              <a class="meta-chip" href="type.html?id=${encodeURIComponent(aircraft.class)}">${aircraft.class}</a>
            </div>
            <h1>${fullAircraftName}</h1>
            <p>${detail.overview || aircraft.overview}</p>
          </div>

          <div class="timeline-legend">
            <span class="badge">${manufacturer ? manufacturer.name : "Manufacturer"}</span>
            <span class="meta-chip">${aircraft.type}</span>
          </div>
        </div>

        <section class="technical-specifications-prominent" aria-labelledby="technical-specifications-heading">
          <div class="spec-section-heading">
            <p class="eyebrow">At a glance</p>
            <h2 id="technical-specifications-heading">Technical Specifications</h2>
            <p>Dimensions are specific to this aircraft or the named representative variant. Family and concept values are labelled clearly.</p>
          </div>

          <dl class="quick-spec-grid" aria-label="${aircraft.name} quick specifications">
            <div><dt>Length</dt><dd>${specValue(specs, "dimensions", "Length")}</dd></div>
            <div><dt>Wingspan</dt><dd>${specValue(specs, "dimensions", "Wingspan")}</dd></div>
            <div><dt>Height</dt><dd>${specValue(specs, "dimensions", "Height")}</dd></div>
            <div><dt>Range</dt><dd>${specValue(specs, "performance", "Range", "Mission dependent")}</dd></div>
            <div><dt>Capacity / payload</dt><dd>${specValue(specs, "capacity", "Passengers", specValue(specs, "capacity", "Payload", "Mission dependent"))}</dd></div>
            <div><dt>Maximum takeoff weight</dt><dd>${specValue(specs, "weights", "MTOW", "Varies by model")}</dd></div>
          </dl>

          <div class="aircraft-grid full-specification-grid">
            ${renderSpecGroup("Dimensions", specs.dimensions)}
            ${renderSpecGroup("Powerplant", specs.powerplant)}
            ${renderSpecGroup("Performance", specs.performance)}
            ${renderSpecGroup("Weights", specs.weights)}
            ${renderSpecGroup("Capacity", specs.capacity)}
          </div>
        </section>

        <div class="detail-grid">
          <article class="detail-panel">
            <h3>First Flight</h3>
            <p>${aircraft.firstFlight}</p>
          </article>
          <article class="detail-panel">
            <h3>Program State</h3>
            <p>${aircraft.programState}</p>
          </article>
          <article class="detail-panel">
            <h3>Manufacturer</h3>
            <p>${manufacturer ? manufacturer.name : aircraft.manufacturerName || "Unknown"}</p>
          </article>
        </div>

        <div class="aircraft-hero-grid">
          <article class="detail-panel">
            <h3>Program Snapshot</h3>
            <p>${detail.design || detail.overview || aircraft.overview}</p>
            <div class="tag-row">
              <span class="tag">${aircraft.type}</span>
              <span class="tag">${aircraft.programState}</span>
              <span class="tag">${manufacturer ? manufacturer.country : aircraft.manufacturerCountry || "Unknown origin"}</span>
            </div>
          </article>

          <article class="detail-panel">
            <h3>Why This Aircraft Matters</h3>
            <p>${detail.service || data.classDescriptions[aircraft.class] || "This aircraft fits a specialized role within the aviation landscape."}</p>
          </article>
        </div>

        <div class="hero-actions">
          ${manufacturer ? `<a class="button button-primary" href="manufacturer.html?id=${manufacturer.id}">Open Manufacturer</a>` : ""}
          <a class="button button-secondary" href="index.html">Back To Explorer</a>
        </div>
      </div>
    </section>

    <section class="detail-section-shell detail-section">
      <div class="detail-layout">
        <aside class="detail-sidebar">
          <article class="detail-panel reveal">
            <h3>Technical Snapshot</h3>
            <div class="tag-row">
              <span class="tag">${aircraft.class}</span>
              <span class="tag">${aircraft.timeline}</span>
              <span class="tag">${manufacturer ? manufacturer.country : aircraft.manufacturerCountry || "Unknown origin"}</span>
            </div>
            <p>${data.classDescriptions[aircraft.class] || "This aircraft fits a specialized role within the aviation landscape."}</p>
          </article>

          <article class="detail-panel reveal">
            <h3>Program Facts</h3>
            ${renderBulletList(detail.facts, "detail-list")}
          </article>

          <article class="detail-panel reveal">
            <h3>Operators / Usage</h3>
            ${renderBulletList(detail.notableOperators, "detail-list")}
          </article>

          <article class="detail-panel reveal source-note">
            <h3>Primary Source</h3>
            <p>Specifications may vary by variant and configuration. Check the current manufacturer material for exact planning data.</p>
            ${aircraft.source ? `<a class="detail-link" href="${aircraft.source.url}" target="_blank" rel="noopener noreferrer">${aircraft.source.name} <span aria-hidden="true">↗</span></a>` : ""}
            <a class="mini-link" href="sources.html">How this wiki uses sources</a>
          </article>
        </aside>

        <div class="detail-main">
          <article class="detail-panel reveal">
            <h3>Overview</h3>
            <p>${detail.overview || aircraft.overview}</p>
          </article>

          <article class="detail-panel reveal">
            <h3>Design And Development</h3>
            <p>${detail.design || "Design notes can be expanded further here."}</p>
          </article>

          <article class="detail-panel reveal">
            <h3>Operations And Legacy</h3>
            <p>${detail.service || "Operational history can be expanded further here."}</p>
          </article>

          <section class="detail-panel reveal">
            <h3>Variants And Family Notes</h3>
            ${renderBulletList(detail.variants)}
          </section>

          <section class="detail-panel reveal">
            <h3>More From ${manufacturer ? manufacturer.name : "This Manufacturer"}</h3>
            <div class="related-grid">
              ${
                relatedAircraft.length > 0
                  ? relatedAircraft
                      .map(
                        (item) => `
                          <article class="related-card">
                            <span class="timeline-chip ${timelineClassName(item.timeline)}">${item.timeline}</span>
                            <h3>${item.name}</h3>
                            <p>${item.overview}</p>
                            <div class="card-actions">
                              <a class="detail-link" href="aircraft.html?id=${item.id}">Open Aircraft</a>
                            </div>
                          </article>
                        `
                      )
                      .join("")
                  : `
                    <article class="related-card">
                      <h3>No additional aircraft linked yet</h3>
                      <p>More programs from this manufacturer can be added here as the wiki grows.</p>
                    </article>
                  `
              }
            </div>
          </section>
        </div>
      </div>
    </section>
  `;

  initRevealAnimations();
});
