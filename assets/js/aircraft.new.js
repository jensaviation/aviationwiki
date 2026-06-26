document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
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

  function renderNotFound() {
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
  const relatedAircraft = manufacturer
    ? manufacturer.aircraft.filter((item) => item.id !== aircraft.id).slice(0, 3)
    : [];

  document.title = `${aircraft.name} | The Aviation Wiki`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-panel reveal">
        <p class="eyebrow">Aircraft Dossier</p>
        <div class="detail-header">
          <div class="detail-copy">
            <div class="meta-row">
              <span class="timeline-chip ${timelineClassName(aircraft.timeline)}">${aircraft.timeline}</span>
              <span class="program-state">${aircraft.programState}</span>
              <span class="meta-chip">${aircraft.class}</span>
            </div>
            <h1>${aircraft.name}</h1>
            <p>${detail.overview || aircraft.overview}</p>
          </div>

          <div class="timeline-legend">
            <span class="badge">${manufacturer ? manufacturer.name : "Manufacturer"}</span>
            <span class="meta-chip">${aircraft.type}</span>
          </div>
        </div>

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
            <h3>Technical Specifications</h3>
            <p>This section collects the aircraft's dimensions, weights, capacity, performance, and engine details in one place.</p>
            <div class="aircraft-grid">
              ${renderSpecGroup("Dimensions", specs.dimensions)}
              ${renderSpecGroup("Powerplant", specs.powerplant)}
              ${renderSpecGroup("Performance", specs.performance)}
              ${renderSpecGroup("Weights", specs.weights)}
              ${renderSpecGroup("Capacity", specs.capacity)}
            </div>
          </section>

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
