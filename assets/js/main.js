document.addEventListener("DOMContentLoaded", () => {
  const data = window.AviationData;
  const heroStats = document.getElementById("hero-stats");
  const overviewGrid = document.getElementById("overview-grid");
  const pulseGrid = document.getElementById("pulse-grid");
  const manufacturerGrid = document.getElementById("manufacturer-grid");
  const manufacturerJump = document.getElementById("manufacturer-jump");
  const categoryFilter = document.getElementById("category-filter");
  const aircraftTypeFilter = document.getElementById("aircraft-type-filter");
  const timelineFilterButtons = document.getElementById("timeline-filter-buttons");
  const searchInput = document.getElementById("search-input");
  const activeFilters = document.getElementById("active-filters");
  const resultsCount = document.getElementById("results-count");
  const searchExperience = document.getElementById("search-experience");
  const searchResultsTitle = document.getElementById("search-results-title");
  const searchResultsSummary = document.getElementById("search-results-summary");
  const searchResultsGrid = document.getElementById("search-results-grid");
  const searchCloseButton = document.getElementById("search-close-button");
  const explorer = document.getElementById("explorer");
  const homeHero = document.querySelector(".hero-home");

  if (explorer && homeHero) {
    homeHero.insertAdjacentElement("afterend", explorer);
  }

  const state = {
    query: "",
    category: "",
    aircraftClass: "",
    timeline: ""
  };

  let revealObserver = null;

  searchInput.setAttribute("aria-controls", "search-experience");
  searchInput.setAttribute("aria-expanded", "false");

  function timelineClassName(timeline) {
    return `timeline-${timeline.toLowerCase().replace(/\s+/g, "-")}`;
  }

  function initRevealAnimations() {
    if (revealObserver) {
      revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
  }

  function animateCount(element, endValue) {
    const duration = 900;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(endValue * progress);
      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function buildFilterHref(filters = {}, hash = "#explorer") {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const query = params.toString();
    return `index.html${query ? `?${query}` : ""}${hash}`;
  }

  function hydrateStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") || "";
    const aircraftClass = params.get("aircraftClass") || "";
    const timeline = params.get("timeline") || "";
    const query = (params.get("query") || "").trim();

    state.category = data.getUniqueCategories().includes(category) ? category : "";
    state.aircraftClass = data.getUniqueAircraftClasses().includes(aircraftClass) ? aircraftClass : "";
    state.timeline = data.timelineOrder.includes(timeline) ? timeline : "";
    state.query = query;

    searchInput.value = state.query;
    categoryFilter.value = state.category;
    aircraftTypeFilter.value = state.aircraftClass;
  }

  function syncUrlWithState() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    if (state.query) {
      params.set("query", state.query);
    }

    if (state.category) {
      params.set("category", state.category);
    }

    if (state.aircraftClass) {
      params.set("aircraftClass", state.aircraftClass);
    }

    if (state.timeline) {
      params.set("timeline", state.timeline);
    }

    url.search = params.toString();
    window.history.replaceState({}, "", url);
  }

  function renderHeroStats() {
    const stats = [
      {
        label: "Manufacturers",
        value: data.manufacturers.length,
        note: "Global fixed-wing makers",
        href: "#manufacturer-overview",
        hint: "Open manufacturer overview"
      },
      {
        label: "Aircraft Programs",
        value: data.allAircraft.length,
        note: "Linked to their detail pages",
        href: "#manufacturer-overview",
        hint: "See linked aircraft cards"
      },
      {
        label: "Manufacturer Types",
        value: data.getUniqueCategories().length,
        note: "Commercial to amphibious",
        href: "#category-overview",
        hint: "Jump to category overview"
      },
      {
        label: "Timeline Bands",
        value: data.timelineOrder.length,
        note: "From foundational to future",
        href: "#timeline-overview",
        hint: "Browse timeline overview"
      }
    ];

    heroStats.innerHTML = stats
      .map(
        (stat) => `
          <a class="stat-card card-link reveal" href="${stat.href}">
            <span class="stat-label">${stat.label}</span>
            <span class="stat-value" data-count="${stat.value}">0</span>
            <div class="stat-note">${stat.note}</div>
            <span class="card-link-hint">${stat.hint}</span>
          </a>
        `
      )
      .join("");

    heroStats.querySelectorAll("[data-count]").forEach((element) => {
      animateCount(element, Number(element.getAttribute("data-count")));
    });
  }

  function renderOverview() {
    overviewGrid.innerHTML = data.timelineOrder
      .map((timeline) => {
        const count = data.allAircraft.filter((aircraft) => aircraft.timeline === timeline).length;

        return `
          <a class="overview-card card-link reveal" href="${buildFilterHref({ timeline }, "#explorer")}">
            <span class="timeline-chip ${timelineClassName(timeline)}">${timeline}</span>
            <strong class="count">${count}</strong>
            <h3>${timeline}</h3>
            <p>${data.timelineDescriptions[timeline]}</p>
            <span class="card-link-hint">Open ${timeline} overview</span>
          </a>
        `;
      })
      .join("");
  }

  function renderPulseCards() {
    pulseGrid.innerHTML = data.getUniqueCategories()
      .map((category) => {
        const count = data.manufacturers.filter((manufacturer) => manufacturer.category === category).length;

        return `
          <a class="pulse-card card-link reveal" href="${buildFilterHref({ category }, "#explorer")}">
            <span class="badge">${category}</span>
            <strong>${count}</strong>
            <p>${data.categoryDescriptions[category]}</p>
            <span class="card-link-hint">Open filtered overview</span>
          </a>
        `;
      })
      .join("");
  }

  function populateFilters() {
    data.getUniqueCategories().forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    data.getUniqueAircraftClasses().forEach((aircraftClass) => {
      const option = document.createElement("option");
      option.value = aircraftClass;
      option.textContent = aircraftClass;
      aircraftTypeFilter.appendChild(option);
    });

    data.getUniqueCategories().forEach((category) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;

      data.manufacturers
        .filter((manufacturer) => manufacturer.category === category)
        .forEach((manufacturer) => {
          const option = document.createElement("option");
          option.value = manufacturer.id;
          option.textContent = manufacturer.name;
          optgroup.appendChild(option);
        });

      manufacturerJump.appendChild(optgroup);
    });

    timelineFilterButtons.innerHTML = `
      <button class="timeline-filter-button is-active" data-timeline="" type="button">All Eras</button>
      ${data.timelineOrder
        .map(
          (timeline) => `
            <button class="timeline-filter-button" data-timeline="${timeline}" type="button">
              ${timeline}
            </button>
          `
        )
        .join("")}
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeSearch(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function matchScore(primaryText, secondaryText, query) {
    const primary = normalizeSearch(primaryText);
    const secondary = normalizeSearch(secondaryText);

    if (primary === query) return 0;
    if (primary.startsWith(query)) return 1;
    if (primary.includes(query)) return 2;
    if (secondary.startsWith(query)) return 3;
    if (secondary.includes(query)) return 4;
    return Number.POSITIVE_INFINITY;
  }

  const searchablePages = [
    { name: "Manufacturer Explorer", href: "index.html#manufacturer-overview", summary: "Browse every aircraft manufacturer and its model catalogue.", keywords: "manufacturers makers brands atlas explorer" },
    { name: "Aircraft Types", href: "types.html", summary: "Explore commercial jets, fighters, trainers, turboprops, and more.", keywords: "aircraft types classes categories" },
    { name: "Aviation History", href: "history.html", summary: "Follow aviation from early flight to future aircraft concepts.", keywords: "history timeline eras milestones" },
    { name: "Sources", href: "sources.html", summary: "Review official sources and the research approach behind the wiki.", keywords: "sources references citations research" },
    { name: "Support", href: "support.html", summary: "Report a correction, broken link, or missing aircraft.", keywords: "support contact correction report missing aircraft" }
  ];

  function getSearchResults(query) {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return [];

    const aircraftResults = data.allAircraft
      .map((aircraft) => ({
        kind: "aircraft",
        item: aircraft,
        score: matchScore(
          aircraft.name,
          `${aircraft.manufacturerName} ${aircraft.type} ${aircraft.class} ${aircraft.overview}`,
          normalizedQuery
        )
      }))
      .filter((result) => Number.isFinite(result.score));

    const manufacturerResults = data.manufacturers
      .map((manufacturer) => ({
        kind: "manufacturer",
        item: manufacturer,
        score: matchScore(
          manufacturer.name,
          `${manufacturer.country} ${manufacturer.category} ${manufacturer.aircraftFocus.join(" ")}`,
          normalizedQuery
        ) + 0.5
      }))
      .filter((result) => Number.isFinite(result.score));

    const typeResults = data.getUniqueAircraftClasses()
      .map((aircraftClass) => ({
        kind: "type",
        item: {
          name: aircraftClass,
          href: `type.html?id=${encodeURIComponent(aircraftClass)}`,
          summary: data.classDescriptions[aircraftClass] || "Explore aircraft in this category.",
          count: data.allAircraft.filter((aircraft) => aircraft.class === aircraftClass).length
        },
        score: matchScore(
          aircraftClass,
          data.classDescriptions[aircraftClass] || "",
          normalizedQuery
        ) + 0.25
      }))
      .filter((result) => Number.isFinite(result.score));

    const pageResults = searchablePages
      .map((page) => ({
        kind: "page",
        item: page,
        score: matchScore(page.name, `${page.summary} ${page.keywords}`, normalizedQuery) + 0.35
      }))
      .filter((result) => Number.isFinite(result.score));

    return [...aircraftResults, ...typeResults, ...pageResults, ...manufacturerResults]
      .sort((left, right) => left.score - right.score || left.item.name.localeCompare(right.item.name))
      .slice(0, 8);
  }

  function aircraftDimension(aircraft, label) {
    return aircraft.detail?.specs?.dimensions?.[label] || "Not listed";
  }

  function renderSearchResult(result, index) {
    if (result.kind === "page" || result.kind === "type") {
      const item = result.item;
      const isType = result.kind === "type";
      return `
        <a class="search-result-card search-result-navigation" href="${item.href}" style="--result-index: ${index}">
          <span class="search-result-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="search-result-kind">${isType ? "Aircraft type" : "Website page"}</span>
          <strong>${item.name}</strong>
          <span class="search-result-maker">${item.summary}${isType ? ` · ${item.count} aircraft` : ""}</span>
          <span class="search-result-action">Open ${isType ? "aircraft type" : "page"} <span aria-hidden="true">→</span></span>
        </a>
      `;
    }

    if (result.kind === "manufacturer") {
      const manufacturer = result.item;
      return `
        <a class="search-result-card search-result-manufacturer" href="manufacturer.html?id=${manufacturer.id}" style="--result-index: ${index}">
          <span class="search-result-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="search-result-kind">Manufacturer</span>
          <strong>${manufacturer.name}</strong>
          <span class="search-result-maker">${manufacturer.country} · ${manufacturer.aircraft.length} aircraft</span>
          <span class="search-result-action">Open manufacturer <span aria-hidden="true">→</span></span>
        </a>
      `;
    }

    const aircraft = result.item;
    return `
      <a class="search-result-card" href="aircraft.html?id=${aircraft.id}" style="--result-index: ${index}">
        <span class="search-result-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="search-result-kind">${aircraft.class}</span>
        <strong>${aircraft.name}</strong>
        <span class="search-result-maker">${aircraft.manufacturerName} · ${aircraft.type}</span>
        <span class="search-result-dimensions">
          <span><small>Length</small>${aircraftDimension(aircraft, "Length")}</span>
          <span><small>Wingspan</small>${aircraftDimension(aircraft, "Wingspan")}</span>
        </span>
        <span class="search-result-action">Open aircraft <span aria-hidden="true">→</span></span>
      </a>
    `;
  }

  function renderSearchExperience() {
    const query = state.query.trim();
    const hasQuery = query.length > 0;

    searchExperience.hidden = !hasQuery;
    searchInput.setAttribute("aria-expanded", hasQuery ? "true" : "false");
    searchExperience.classList.toggle("is-active", hasQuery);

    if (!hasQuery) {
      searchResultsGrid.innerHTML = "";
      return;
    }

    const matches = getSearchResults(query);
    const safeQuery = escapeHtml(query);
    searchResultsTitle.innerHTML = matches.length
      ? `Flight matches for <span>“${safeQuery}”</span>`
      : `No flight match for <span>“${safeQuery}”</span>`;
    searchResultsSummary.textContent = matches.length
      ? `${matches.length} direct result${matches.length === 1 ? "" : "s"} found. Select one to open its page.`
      : "Try a model number, aircraft family, manufacturer, or aircraft type.";

    searchExperience.classList.toggle("has-no-results", matches.length === 0);
    searchResultsGrid.innerHTML = matches.length
      ? matches.map(renderSearchResult).join("")
      : `
        <div class="search-empty-state">
          <span class="search-empty-code">NO SIGNAL</span>
          <strong>Nothing is matching that flight path yet.</strong>
          <p>Try “737”, “A340-600”, “fighter”, “Airbus”, or “regional jet”.</p>
        </div>
      `;
  }

  function getDisplayedAircraft(manufacturer) {
    return manufacturer.aircraft.filter((aircraft) => {
      const timelineMatch = !state.timeline || aircraft.timeline === state.timeline;
      const classMatch = !state.aircraftClass || aircraft.class === state.aircraftClass;
      return timelineMatch && classMatch;
    });
  }

  function getFilteredManufacturers() {
    return data.manufacturers.filter((manufacturer) => {
      const categoryMatch = !state.category || manufacturer.category === state.category;
      if (!categoryMatch) {
        return false;
      }

      return getDisplayedAircraft(manufacturer).length > 0;
    });
  }

  function renderActiveFilters() {
    const pills = [];

    if (state.category) {
      pills.push(`<span class="tag">Manufacturer type: ${state.category}</span>`);
    }

    if (state.aircraftClass) {
      pills.push(`<span class="tag">Aircraft class: ${state.aircraftClass}</span>`);
    }

    if (state.timeline) {
      pills.push(`<span class="tag">Timeline: ${state.timeline}</span>`);
    }

    if (pills.length > 0) {
      pills.push('<button class="clear-filter" id="clear-filters" type="button">Clear filters</button>');
    }

    activeFilters.innerHTML = pills.join("");

    const clearFiltersButton = document.getElementById("clear-filters");
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", () => {
        state.query = "";
        state.category = "";
        state.aircraftClass = "";
        state.timeline = "";
        searchInput.value = "";
        categoryFilter.value = "";
        aircraftTypeFilter.value = "";
        updateTimelineButtons();
        render();
      });
    }
  }

  function updateTimelineButtons() {
    timelineFilterButtons.querySelectorAll("[data-timeline]").forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-timeline") === state.timeline);
      if (!state.timeline && button.getAttribute("data-timeline") === "") {
        button.classList.add("is-active");
      }
    });
  }

  function renderManufacturers() {
    const filteredManufacturers = getFilteredManufacturers();
    resultsCount.textContent = filteredManufacturers.length.toLocaleString();

    if (filteredManufacturers.length === 0) {
      manufacturerGrid.innerHTML = `
        <article class="message-card reveal">
          <p class="eyebrow">No Matches</p>
          <h2>Try A Broader Flight Path</h2>
          <p>No manufacturers match the current combination of search terms and filters.</p>
        </article>
      `;
      return;
    }

    manufacturerGrid.innerHTML = filteredManufacturers
      .map((manufacturer) => {
        const displayedAircraft = getDisplayedAircraft(manufacturer);
        const timelineGroups = data.groupAircraftByTimeline(displayedAircraft)
          .map(
            (group) => `
              <section class="timeline-cluster">
                <div class="timeline-heading">
                  <h4>${group.timeline}</h4>
                  <span class="timeline-chip ${timelineClassName(group.timeline)}">${group.aircraft.length} program${group.aircraft.length === 1 ? "" : "s"}</span>
                </div>
                <p class="card-copy">${group.description}</p>
                <div class="aircraft-links">
                  ${group.aircraft
                    .map(
                      (aircraft) => `
                        <a class="aircraft-pill" href="aircraft.html?id=${aircraft.id}">
                          ${aircraft.name}
                          <span>${aircraft.firstFlight}</span>
                        </a>
                      `
                    )
                    .join("")}
                </div>
              </section>
            `
          )
          .join("");

        return `
          <article class="manufacturer-card reveal" id="manufacturer-${manufacturer.id}">
            <div class="card-top">
              <span class="badge">${manufacturer.category}</span>
              <span class="status-chip">${manufacturer.status}</span>
            </div>

            <div class="meta-row">
              <span class="meta-chip">${manufacturer.country}</span>
              <span class="meta-chip">Founded ${manufacturer.founded}</span>
              <span class="meta-chip">${manufacturer.aircraft.length} featured aircraft</span>
            </div>

            <div class="detail-title-row">
              <h3>${manufacturer.name}</h3>
            </div>

            <p>${manufacturer.summary}</p>

            <div class="tag-row">
              ${manufacturer.aircraftFocus.map((focus) => `<span class="tag">${focus}</span>`).join("")}
            </div>

            <div class="timeline-clusters">
              ${timelineGroups}
            </div>

            <div class="card-actions">
              <a class="detail-link" href="manufacturer.html?id=${manufacturer.id}">Manufacturer Page</a>
              <a class="mini-link" href="history.html">
                Aviation History
                <span>See the wider timeline</span>
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function render() {
    syncUrlWithState();
    renderSearchExperience();
    renderActiveFilters();
    updateTimelineButtons();
    renderManufacturers();
    initRevealAnimations();
  }

  manufacturerJump.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value) {
      window.location.href = `manufacturer.html?id=${value}`;
    }
  });

  categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  aircraftTypeFilter.addEventListener("change", (event) => {
    state.aircraftClass = event.target.value;
    render();
  });

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    syncUrlWithState();
    renderSearchExperience();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.query) {
      state.query = "";
      searchInput.value = "";
      syncUrlWithState();
      renderSearchExperience();
    }
  });

  searchCloseButton.addEventListener("click", () => {
    state.query = "";
    searchInput.value = "";
    syncUrlWithState();
    renderSearchExperience();
    searchInput.focus();
  });

  timelineFilterButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-timeline]");
    if (!button) {
      return;
    }

    state.timeline = button.getAttribute("data-timeline") || "";
    render();
  });

  renderHeroStats();
  renderOverview();
  renderPulseCards();
  populateFilters();
  hydrateStateFromUrl();
  render();
});
