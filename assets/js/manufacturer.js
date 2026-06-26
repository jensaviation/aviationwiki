document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const root = document.getElementById("manufacturer-detail-root");
  const params = new URLSearchParams(window.location.search);
  const manufacturer = data.getManufacturerById(params.get("id"));

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
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  }

  function renderNotFound() {
    root.innerHTML = `
      <section class="message-card reveal">
        <p class="eyebrow">Manufacturer Missing</p>
        <h2>This Manufacturer Was Not Found</h2>
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

  document.title = `${manufacturer.name} | The Aviation Wiki`;

  const timelineGroups = data.groupAircraftByTimeline(manufacturer.aircraft);
  const relatedManufacturers = data.manufacturers
    .filter(
      (item) => item.id !== manufacturer.id && item.category === manufacturer.category
    )
    .slice(0, 3);

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-panel reveal">
        <p class="eyebrow">Manufacturer Dossier</p>
        <div class="detail-header">
          <div class="detail-copy">
            <div class="meta-row">
              <span class="badge">${manufacturer.category}</span>
              <span class="status-chip">${manufacturer.status}</span>
            </div>
            <h1>${manufacturer.name}</h1>
            <p>${manufacturer.summary}</p>
          </div>

          <div class="timeline-legend">
            ${data.timelineOrder
              .map(
                (timeline) => `
                  <span class="timeline-chip ${timelineClassName(timeline)}">${timeline}</span>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="detail-grid">
          <article class="detail-panel">
            <h3>Country</h3>
            <p>${manufacturer.country}</p>
          </article>
          <article class="detail-panel">
            <h3>Founded</h3>
            <p>${manufacturer.founded}</p>
          </article>
          <article class="detail-panel">
            <h3>Featured Programs</h3>
            <p>${manufacturer.aircraft.length} aircraft in this overview</p>
          </article>
        </div>

        <div class="tag-row">
          ${manufacturer.aircraftFocus.map((focus) => `<span class="tag">${focus}</span>`).join("")}
        </div>

        <div class="hero-actions">
          <a class="button button-primary" href="index.html">Back To Explorer</a>
          <a class="button button-secondary" href="history.html">Open History Timeline</a>
        </div>
      </div>
    </section>

    <section class="detail-section-shell detail-section">
      <div class="detail-layout">
        <aside class="detail-sidebar">
          <article class="detail-panel reveal">
            <h3>Profile</h3>
            <p>${data.categoryDescriptions[manufacturer.category]}</p>
          </article>

          <article class="detail-panel reveal">
            <h3>Aircraft Classes</h3>
            <div class="tag-row">
              ${[...new Set(manufacturer.aircraft.map((aircraft) => aircraft.class))]
                .map((item) => `<span class="tag">${item}</span>`)
                .join("")}
            </div>
          </article>

          <article class="detail-panel reveal">
            <h3>Timeline Mix</h3>
            <div class="timeline-stack">
              ${timelineGroups
                .map(
                  (group) => `
                    <div class="timeline-cluster">
                      <div class="timeline-heading">
                        <h4>${group.timeline}</h4>
                        <span class="timeline-chip ${timelineClassName(group.timeline)}">${group.aircraft.length}</span>
                      </div>
                      <p>${group.description}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
        </aside>

        <div class="detail-main">
          <article class="detail-panel reveal">
            <h3>Signature Aircraft Timeline</h3>
            <p>
              This lineup groups the featured aircraft by era so you can read the manufacturer's
              design evolution from legacy programs into current and future directions.
            </p>
          </article>

          ${timelineGroups
            .map(
              (group) => `
                <section class="detail-panel reveal">
                  <div class="timeline-heading">
                    <h3>${group.timeline}</h3>
                    <span class="timeline-chip ${timelineClassName(group.timeline)}">${group.aircraft.length} program${group.aircraft.length === 1 ? "" : "s"}</span>
                  </div>
                  <p>${group.description}</p>

                  <div class="aircraft-grid">
                    ${group.aircraft
                      .map(
                        (aircraft) => `
                          <article class="aircraft-card">
                            <div class="aircraft-card-top">
                              <span class="program-state">${aircraft.programState}</span>
                              <span class="meta-chip">${aircraft.firstFlight}</span>
                            </div>
                            <h3>${aircraft.name}</h3>
                            <div class="meta-row">
                              <span class="meta-chip">${aircraft.type}</span>
                              <span class="meta-chip">${aircraft.class}</span>
                            </div>
                            <p>${aircraft.overview}</p>
                            <div class="card-actions">
                              <a class="detail-link" href="aircraft.html?id=${aircraft.id}">Aircraft Page</a>
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                </section>
              `
            )
            .join("")}

          <section class="detail-panel reveal">
            <h3>Related Manufacturers</h3>
            <p>Explore nearby manufacturers in the same category for a broader comparison.</p>
            <div class="related-grid">
              ${relatedManufacturers
                .map(
                  (item) => `
                    <article class="related-card">
                      <span class="badge">${item.category}</span>
                      <h3>${item.name}</h3>
                      <p>${item.summary}</p>
                      <div class="card-actions">
                        <a class="detail-link" href="manufacturer.html?id=${item.id}">Open Manufacturer</a>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `;

  initRevealAnimations();
});
