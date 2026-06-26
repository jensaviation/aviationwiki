document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const overviewGrid = document.getElementById("history-overview-grid");
  const historyEvents = document.getElementById("history-events");
  const futureGrid = document.getElementById("future-grid");
  const progressFill = document.getElementById("history-progress-fill");
  const heroYear = document.getElementById("history-hero-year");
  const heroCaption = document.querySelector(".history-hero-caption");
  const heroVisual = document.getElementById("history-hero-visual");
  const trackSection = document.getElementById("history-track");

  function svgToDataUri(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function visualPalette(key) {
    const palettes = {
      balloon: { line: "#2a6f8c", accent: "#8ed9ea", fill: "#f7fbfd" },
      glider: { line: "#386e7f", accent: "#dff9fb", fill: "#fbfeff" },
      biplane: { line: "#29556b", accent: "#9fe8f6", fill: "#f8fcff" },
      monoplane: { line: "#43677a", accent: "#d9eff7", fill: "#fbfdff" },
      airliner: { line: "#28485d", accent: "#b7e5f1", fill: "#f8fcfe" },
      jet: { line: "#25495f", accent: "#9fe8f6", fill: "#f7fbfd" },
      digital: { line: "#2d6675", accent: "#dff9fb", fill: "#fbfeff" },
      future: { line: "#2d7080", accent: "#dff9fb", fill: "#f4fbff" }
    };

    return palettes[key] || palettes.future;
  }

  function visualShape(key) {
    const shapes = {
      balloon: '<circle cx="145" cy="110" r="52"/><path d="M145 162 L122 214 L168 214 Z"/><path d="M122 214 L114 254 L176 254 L168 214"/><path d="M130 254 L130 288 M160 254 L160 288"/><path d="M118 288 L172 288"/>',
      glider: '<path d="M62 196 L286 162 L366 182 L286 200 L62 196 Z"/><path d="M182 170 L214 106 L240 168"/><path d="M196 196 L228 252"/>',
      biplane: '<path d="M72 198 L302 186 L352 198 L302 210 L72 198 Z"/><path d="M126 154 L246 146 L292 156 L246 166 L126 154 Z"/><path d="M148 210 L148 154 M188 208 L188 152 M228 206 L228 150"/><circle cx="106" cy="198" r="16"/><path d="M304 186 L336 142"/>',
      monoplane: '<path d="M74 204 L314 188 L354 202 L314 216 L74 204 Z"/><path d="M176 192 L238 126 L262 190"/><path d="M284 194 L322 148"/>',
      airliner: '<path d="M56 214 L286 196 L366 204 L396 214 L366 224 L286 232 L56 214 Z"/><path d="M176 206 L258 134 L284 206"/><path d="M248 220 L304 270"/><path d="M94 214 L68 194"/><circle cx="344" cy="210" r="4"/><circle cx="328" cy="208" r="4"/><circle cx="312" cy="206" r="4"/>',
      jet: '<path d="M56 214 L246 202 L362 176 L324 206 L392 214 L324 222 L362 252 L246 226 L56 214 Z"/><path d="M176 206 L250 128 L258 204"/><path d="M190 220 L248 292 L232 224"/>',
      digital: '<path d="M50 214 L278 198 L356 206 L390 214 L356 222 L278 230 L50 214 Z"/><path d="M160 208 L250 128 L284 204"/><path d="M230 222 L292 278"/><rect x="88" y="162" width="78" height="20" rx="10"/><path d="M320 202 L350 154"/>',
      future: '<path d="M84 212 L178 164 L290 158 L366 188 L392 214 L366 240 L290 270 L178 264 L84 216 Z"/><path d="M178 164 L214 118 L286 118 L320 154"/><path d="M178 264 L212 310 L288 310 L320 272"/>'
    };

    return shapes[key] || shapes.future;
  }

  function buildHistoryCardVisual(milestone) {
    const palette = visualPalette(milestone.visual);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 320" role="img" aria-label="${milestone.title}">
        <rect width="430" height="320" rx="24" fill="${palette.fill}"/>
        <rect x="18" y="18" width="394" height="284" rx="18" fill="none" stroke="${palette.accent}" stroke-width="2"/>
        <path d="M32 74 H398" stroke="${palette.accent}" stroke-width="2" stroke-dasharray="8 10"/>
        <path d="M32 258 H398" stroke="${palette.accent}" stroke-width="2" stroke-dasharray="8 10"/>
        <g fill="none" stroke="${palette.line}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape(milestone.visual)}
        </g>
        <text x="36" y="54" fill="${palette.line}" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="28" letter-spacing="3">${milestone.year}</text>
      </svg>
    `;

    return svgToDataUri(svg);
  }

  function buildHistoryHeroVisual() {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" role="img" aria-label="Aviation history illustration">
        <rect width="820" height="460" rx="34" fill="#fbfeff"/>
        <rect x="28" y="28" width="764" height="404" rx="24" fill="none" stroke="#dff9fb" stroke-width="2"/>
        <path d="M90 350 H730" stroke="#8ed9ea" stroke-width="4" stroke-dasharray="12 16"/>
        <circle cx="120" cy="350" r="8" fill="#2e7f99"/>
        <circle cx="270" cy="350" r="8" fill="#2e7f99"/>
        <circle cx="420" cy="350" r="8" fill="#2e7f99"/>
        <circle cx="570" cy="350" r="8" fill="#2e7f99"/>
        <circle cx="720" cy="350" r="8" fill="#2e7f99"/>
        <g transform="translate(42 30)" fill="none" stroke="#2a6f8c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape("balloon")}
        </g>
        <g transform="translate(190 18)" fill="none" stroke="#29556b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape("biplane")}
        </g>
        <g transform="translate(344 10)" fill="none" stroke="#28485d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape("airliner")}
        </g>
        <g transform="translate(500 8)" fill="none" stroke="#25495f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape("jet")}
        </g>
        <g transform="translate(640 0)" fill="none" stroke="#2d7080" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          ${visualShape("future")}
        </g>
        <text x="96" y="388" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="20">Origins</text>
        <text x="226" y="388" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="20">Control</text>
        <text x="370" y="388" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="20">Airlines</text>
        <text x="538" y="388" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="20">Jets</text>
        <text x="682" y="388" fill="#627687" font-family="Bahnschrift, Trebuchet MS, sans-serif" font-size="20">Future</text>
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

  function renderOverview() {
    const cards = [
      {
        title: "Lighter-Than-Air Origins",
        count: "1783-1903",
        text: "Balloons, gliders, and controlled lift experiments create the first workable flight language.",
        target: "montgolfier-balloon"
      },
      {
        title: "Control Becomes Practical",
        count: "1903-1919",
        text: "Powered flight spreads quickly as control systems, airframes, and early routes become dependable.",
        target: "wright-flyer"
      },
      {
        title: "Airlines Take Shape",
        count: "1920s-1930s",
        text: "Civil aviation becomes a system with scheduled service, better cabins, and stronger commercial logic.",
        target: "dc3-service"
      },
      {
        title: "Jet Speed Resets The Map",
        count: "1939-1970s",
        text: "Jet propulsion, sound-barrier research, and long-haul airliners redefine distance and performance.",
        target: "heinkel-he178"
      },
      {
        title: "Digital Flight Decks",
        count: "1980s-2000s",
        text: "Fly-by-wire, composites, and software-led systems move aircraft into a deeply digital era.",
        target: "airbus-a320"
      },
      {
        title: "Cleaner Future Paths",
        count: "2010s+",
        text: "Hydrogen, electric regional aircraft, SAF, and autonomy reshape how the next generation may fly.",
        target: "sustainable-transition"
      }
    ];

    overviewGrid.innerHTML = cards
      .map(
        (card) => `
          <a class="overview-card card-link reveal" href="#${card.target}">
            <span class="badge">${card.count}</span>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
            <span class="card-link-hint">Jump to this era</span>
          </a>
        `
      )
      .join("");
  }

  function renderTimeline() {
    historyEvents.innerHTML = data.historyMilestones
      .map(
        (milestone) => `
          <article
            class="history-item reveal"
            id="${milestone.id}"
            data-year="${milestone.year}"
            data-caption="${milestone.highlight}"
          >
            <div class="history-card-shell">
              <article class="history-card">
                <figure class="history-card-media">
                  <img
                    class="history-card-image"
                    src="${buildHistoryCardVisual(milestone)}"
                    alt="Stylized illustration for ${milestone.title}"
                  >
                </figure>
                <div class="history-card-top">
                  <span class="badge">${milestone.era}</span>
                  <span class="meta-chip">${milestone.year}</span>
                </div>
                <h3>${milestone.title}</h3>
                <p>${milestone.summary}</p>
                <p class="card-copy">${milestone.highlight}</p>
              </article>
            </div>

            <div class="history-node">
              <span class="node-dot"></span>
              <span class="large-year">${milestone.year}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderFutureCards() {
    futureGrid.innerHTML = data.futureSignals
      .map(
        (signal) => `
          <article class="future-card reveal">
            <span class="badge">${signal.tag}</span>
            <h3>${signal.title}</h3>
            <p>${signal.summary}</p>
            <strong>Next Horizon</strong>
          </article>
        `
      )
      .join("");
  }

  function updateProgress() {
    const rect = trackSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const total = rect.height + viewportHeight * 0.35;
    const progressed = Math.min(Math.max(viewportHeight * 0.55 - rect.top, 0), total);
    const percent = total > 0 ? (progressed / total) * 100 : 0;
    progressFill.style.height = `${Math.max(0, Math.min(percent, 100))}%`;
  }

  function initTimelineObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroYear.textContent = entry.target.getAttribute("data-year");
            heroCaption.textContent = entry.target.getAttribute("data-caption");
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -30% 0px"
      }
    );

    document.querySelectorAll(".history-item").forEach((item) => observer.observe(item));
  }

  heroVisual.src = buildHistoryHeroVisual();
  renderOverview();
  renderTimeline();
  renderFutureCards();
  initRevealAnimations();
  initTimelineObserver();
  updateProgress();

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
});
