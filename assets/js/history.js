document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const overviewGrid = document.getElementById("history-overview-grid");
  const historyEvents = document.getElementById("history-events");
  const futureGrid = document.getElementById("future-grid");
  const progressFill = document.getElementById("history-progress-fill");
  const heroYear = document.getElementById("history-hero-year");
  const heroCaption = document.querySelector(".history-hero-caption");
  const trackSection = document.getElementById("history-track");

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
        title: "Experimental Flight",
        count: "1783-1903",
        text: "Aviation starts with balloons, gliders, and the first repeatable ideas about lift and control."
      },
      {
        title: "Industrial Expansion",
        count: "1914-1939",
        text: "Aircraft become tools of transport, war, and engineering prestige with rapidly improving structures and engines."
      },
      {
        title: "Jet And Digital Power",
        count: "1940s-2000s",
        text: "Supersonic research, jetliners, fly-by-wire systems, and composite materials redefine what aircraft can do."
      },
      {
        title: "Future Energy Shift",
        count: "2010s+",
        text: "Autonomy, cleaner propulsion, and new layouts push aviation into another foundational redesign cycle."
      }
    ];

    overviewGrid.innerHTML = cards
      .map(
        (card) => `
          <article class="overview-card reveal">
            <span class="badge">${card.count}</span>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </article>
        `
      )
      .join("");
  }

  function renderTimeline() {
    historyEvents.innerHTML = data.historyMilestones
      .map(
        (milestone) => `
          <article class="history-item reveal" data-year="${milestone.year}" data-caption="${milestone.highlight}">
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
