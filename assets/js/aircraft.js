document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const root = document.getElementById("aircraft-detail-root");
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
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  }

  function renderNotFound() {
    root.innerHTML = `
      <section class="message-card reveal">
        <p class="eyebrow">Aircraft Missing</p>
        <h2>This Aircraft Entry Was Not Found</h2>
        <p>Return to the explorer and open an aircraft from one of the manufacturer cards.</p>
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
  const relatedAircraft = manufacturer.aircraft
    .filter((item) => item.id !== aircraft.id)
    .slice(0, 3);

  document.title = `${aircraft.name} | The Aviation Wiki`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-panel reveal">
        <p class="eyebrow">Aircraft Profile</p>
        <div class="detail-header">
          <div class="detail-copy">
            <div class="meta-row">
              <span class="timeline-chip ${timelineClassName(aircraft.timeline)}">${aircraft.timeline}</span>
              <span class="program-state">${aircraft.programState}</span>
            </div>
            <h1>${aircraft.name}</h1>
            <p>${aircraft.overview}</p>
          </div>

          <div class="timeline-legend">
            <span class="badge">${aircraft.class}</span>
            <span class="meta-chip">${aircraft.type}</span>
          </div>
        </div>

        <div class="detail-grid">
          <article class="detail-panel">
            <h3>Manufacturer</h3>
            <p>${manufacturer.name}</p>
          </article>
          <article class="detail-panel">
            <h3>First Flight</h3>
            <p>${aircraft.firstFlight}</p>
          </article>
          <article class="detail-panel">
            <h3>Program State</h3>
            <p>${aircraft.programState}</p>
          </article>
        </div>

        <div class="hero-actions">
          <a class="button button-primary" href="manufacturer.html?id=${manufacturer.id}">Open Manufacturer</a>
          <a class="button button-secondary" href="index.html">Back To Explorer</a>
        </div>
      </div>
    </section>

    <section class="detail-section-shell detail-section">
      <div class="detail-layout">
        <aside class="detail-sidebar">
          <article class="detail-panel reveal">
            <h3>Aircraft Class</h3>
            <p>${data.classDescriptions[aircraft.class] || "This aircraft fits a specialized role within the aviation landscape."}</p>
          </article>

          <article class="detail-panel reveal">
            <h3>Manufacturer Context</h3>
            <p>${manufacturer.summary}</p>
            <div class="tag-row">
              ${manufacturer.aircraftFocus.map((focus) => `<span class="tag">${focus}</span>`).join("")}
            </div>
          </article>

          <article class="detail-panel reveal">
            <h3>Timeline Band</h3>
            <p>${data.timelineDescriptions[aircraft.timeline]}</p>
          </article>
        </aside>

        <div class="detail-main">
          <article class="detail-panel reveal">
            <h3>Why This Aircraft Matters</h3>
            <p>
              ${aircraft.name} sits inside the ${manufacturer.name} story as a
              ${aircraft.type.toLowerCase()} shaped by the ${aircraft.timeline.toLowerCase()}.
              It reflects how the manufacturer approaches performance, mission design, and market needs.
            </p>
          </article>

          <article class="detail-panel reveal">
            <h3>Quick Readout</h3>
            <div class="aircraft-grid">
              <article class="aircraft-card">
                <h3>Role</h3>
                <p>${aircraft.type}</p>
              </article>
              <article class="aircraft-card">
                <h3>Mission Family</h3>
                <p>${aircraft.class}</p>
              </article>
              <article class="aircraft-card">
                <h3>Maker</h3>
                <p>${manufacturer.name}</p>
              </article>
              <article class="aircraft-card">
                <h3>Era Signal</h3>
                <p>${aircraft.timeline}</p>
              </article>
            </div>
          </article>

          <section class="detail-panel reveal">
            <h3>More From ${manufacturer.name}</h3>
            <p>Use these links to continue along the same manufacturer's lineup.</p>
            <div class="related-grid">
              ${relatedAircraft
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
                .join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `;

  initRevealAnimations();
});
