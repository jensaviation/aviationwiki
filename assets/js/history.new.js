document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const overviewGrid = document.getElementById("history-overview-grid");
  const historyEvents = document.getElementById("history-events");
  const futureGrid = document.getElementById("future-grid");
  const progressFill = document.getElementById("history-progress-fill");
  const heroYear = document.getElementById("history-hero-year");
  const heroCaption = document.querySelector(".history-hero-caption");
  const trackSection = document.getElementById("history-track");

  if (!data || !overviewGrid || !historyEvents || !futureGrid || !progressFill || !trackSection) {
    return;
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
    if (!heroYear || !heroCaption) {
      return;
    }

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

  renderOverview();
  renderTimeline();
  renderFutureCards();
  initRevealAnimations();
  initTimelineObserver();
  updateProgress();

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
});
