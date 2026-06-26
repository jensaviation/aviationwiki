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

  function svgToDataUri(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getVisualKey(aircraftClass) {
    const map = {
      "Commercial Jet": "airliner",
      "Regional Turboprop": "turboprop",
      "Business Jet": "bizjet",
      "General Aviation": "lightplane",
      Fighter: "fighter",
      "Military Transport": "transport",
      Trainer: "trainer",
      ISR: "isr",
      Amphibian: "amphibian",
      Experimental: "future"
    };

    return map[aircraftClass] || "future";
  }

  function getVisualPalette(timeline) {
    const palettes = {
      Foundational: { line: "#2c687f", accent: "#dff9fb", fill: "#fbfeff" },
      "Jet Age": { line: "#35596d", accent: "#dceef6", fill: "#f8fbfd" },
      "Digital Age": { line: "#2e7f99", accent: "#9fe8f6", fill: "#f5fbfd" },
      "Next Horizon": { line: "#2b7485", accent: "#dff9fb", fill: "#f3fbff" }
    };

    return palettes[timeline] || palettes["Digital Age"];
  }

  function getVisualShape(key) {
    const shapes = {
      airliner: '<path d="M58 212 L304 194 L390 202 L430 212 L390 222 L304 230 L58 212 Z"/><path d="M190 204 L280 128 L308 204"/><path d="M268 220 L326 280"/><path d="M92 212 L66 192"/><circle cx="360" cy="208" r="4"/><circle cx="344" cy="206" r="4"/><circle cx="328" cy="204" r="4"/>',
      turboprop: '<path d="M70 214 L296 198 L356 206 L388 214 L356 222 L296 230 L70 214 Z"/><path d="M176 204 L250 142 L276 204"/><path d="M250 218 L296 264"/><circle cx="124" cy="206" r="18"/><path d="M108 206 H140 M124 190 V222"/><circle cx="330" cy="210" r="18"/><path d="M314 210 H346 M330 194 V226"/>',
      bizjet: '<path d="M72 214 L286 202 L364 208 L392 214 L364 220 L286 226 L72 214 Z"/><path d="M182 206 L246 146 L270 204"/><path d="M258 220 L302 264"/><path d="M96 214 L74 198"/><circle cx="336" cy="210" r="4"/><circle cx="322" cy="208" r="4"/>',
      lightplane: '<path d="M92 220 L228 220 L258 202 L354 202 L388 214 L354 226 L258 226 L228 248 L92 248 Z"/><path d="M210 202 L246 132 L282 202"/><circle cx="150" cy="250" r="18"/><circle cx="312" cy="250" r="18"/>',
      fighter: '<path d="M56 214 L244 202 L374 174 L334 206 L404 214 L334 222 L374 254 L244 226 L56 214 Z"/><path d="M180 206 L254 126 L262 204"/><path d="M194 220 L254 296 L236 224"/>',
      transport: '<path d="M64 220 L306 204 L404 212 L438 220 L404 228 L306 236 L64 220 Z"/><path d="M168 212 L262 122 L296 210"/><path d="M254 228 L316 298"/><path d="M146 220 L126 190"/><circle cx="150" cy="254" r="16"/><circle cx="334" cy="254" r="16"/>',
      trainer: '<path d="M76 214 L264 202 L344 208 L372 214 L344 220 L264 226 L76 214 Z"/><path d="M160 206 L228 146 L252 204"/><path d="M248 220 L298 270"/><circle cx="316" cy="210" r="5"/>',
      isr: '<path d="M62 214 L288 198 L366 206 L398 214 L366 222 L288 230 L62 214 Z"/><path d="M180 204 L252 136 L278 204"/><path d="M246 220 L298 276"/><rect x="124" y="164" width="92" height="24" rx="12"/><path d="M328 200 L358 154"/>',
      amphibian: '<path d="M86 226 L238 226 L280 198 L362 198 L396 212 L362 226 L302 226 L274 252 L118 252 Z"/><path d="M206 198 L246 138 L286 198"/><path d="M144 252 L126 282 M288 252 L304 282"/>',
      future: '<path d="M88 214 L188 166 L304 160 L384 190 L414 214 L384 238 L304 268 L188 262 L88 214 Z"/><path d="M188 166 L228 120 L304 120 L340 156"/><path d="M188 262 L224 308 L304 308 L340 272"/>'
    };

    return shapes[key] || shapes.future;
  }

  function buildAircraftIllustration(currentAircraft, currentManufacturer) {
    const palette = getVisualPalette(currentAircraft.timeline);
    const visualKey = getVisualKey(currentAircraft.class);
    const manufacturerName = currentManufacturer ? currentManufacturer.name : currentAircraft.manufacturerName || "Unknown";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" role="img" aria-label="${currentAircraft.name}">
        <rect width="520" height="360" rx="28" fill="${palette.fill}"/>
        <rect x="20" y="20" width="480" height="320" rx="20" fill="none" stroke="${palette.accent}" stroke-width="2"/>
        <path d="M38 92 H482" stroke="${palette.accent}" stroke-width="2" stroke-dasharray="8 10"/>
        <path d="M38 274 H482" stroke="${palette.accent}" stroke-width="2" stroke-dasharray="8 10"/>
        <g fill="none" stroke="${palette.line}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${getVisualShape(visualKey)}
        </g>
        <text x="38" y="58" fill="${palette.line}" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="28" letter-spacing="3">${currentAircraft.name}</text>
        <text x="38" y="314" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="18">${manufacturerName}</text>
        <text x="272" y="314" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="18">${currentAircraft.timeline}</text>
      </svg>
    `;

    return svgToDataUri(svg);
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
          <figure class="aircraft-visual-panel">
            <img
              class="aircraft-visual-image"
              src="${buildAircraftIllustration(aircraft, manufacturer)}"
              alt="Stylized technical illustration of ${aircraft.name}"
            >
            <figcaption class="aircraft-visual-caption">
              ${manufacturer ? manufacturer.name : aircraft.manufacturerName || "Unknown manufacturer"} | ${aircraft.class} | ${aircraft.timeline}
            </figcaption>
          </figure>

          <article class="detail-panel">
            <h3>Clean Room Overview</h3>
            <p>
              This visual plate gives each aircraft page a quick technical identity:
              role, era, manufacturer context, and a silhouette-style reference that
              keeps the site self-contained without depending on outside image hosting.
            </p>
            <div class="tag-row">
              <span class="tag">${aircraft.type}</span>
              <span class="tag">${aircraft.programState}</span>
              <span class="tag">${manufacturer ? manufacturer.country : aircraft.manufacturerCountry || "Unknown origin"}</span>
            </div>
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
            <p>These grouped fields give each aircraft page a more encyclopedia-style technical profile.</p>
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
