document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const data = window.AviationData;
  const site = window.AviationSite;
  if (!data) return;

  function typeHref(type) {
    return `type.html?id=${encodeURIComponent(type)}`;
  }

  function metric(specs, group, key, fallback) {
    return specs && specs[group] && specs[group][key] ? specs[group][key] : fallback;
  }

  function aircraftCard(aircraft) {
    const specs = aircraft.detail && aircraft.detail.specs ? aircraft.detail.specs : {};
    const capacity = metric(specs, "capacity", "Passengers", metric(specs, "capacity", "Payload", "Mission dependent"));
    return `
      <article class="aircraft-card aircraft-result-card">
        <div class="aircraft-card-top"><span class="program-state">${aircraft.programState}</span><span class="meta-chip">${aircraft.firstFlight}</span></div>
        <h3><a href="aircraft.html?id=${aircraft.id}">${aircraft.name}</a></h3>
        <p class="aircraft-maker">${aircraft.manufacturerName} · ${aircraft.type}</p>
        <dl class="mini-specs">
          <div><dt>Length</dt><dd>${metric(specs, "dimensions", "Length", "Varies by model")}</dd></div>
          <div><dt>Wingspan</dt><dd>${metric(specs, "dimensions", "Wingspan", "Varies by model")}</dd></div>
          <div><dt>Range</dt><dd>${metric(specs, "performance", "Range", "Mission dependent")}</dd></div>
          <div><dt>Capacity</dt><dd>${capacity}</dd></div>
        </dl>
        <a class="detail-link" href="aircraft.html?id=${aircraft.id}">Open full specifications <span aria-hidden="true">→</span></a>
      </article>`;
  }

  const grid = document.getElementById("aircraft-type-grid");
  if (grid) {
    grid.innerHTML = data.getUniqueAircraftClasses()
      .map((type) => {
        const aircraft = data.allAircraft.filter((item) => item.class === type);
        const examples = aircraft.slice(0, 3).map((item) => item.name).join(", ");
        return `
          <a class="type-card" href="${typeHref(type)}">
            <span class="type-count">${aircraft.length} aircraft</span>
            <h3>${type}</h3>
            <p>${data.classDescriptions[type]}</p>
            <span class="type-examples"><strong>Examples:</strong> ${examples}</span>
            <span class="card-link-hint">Explore ${type.toLowerCase()} aircraft →</span>
          </a>`;
      })
      .join("");

    if (site) {
      site.setStructuredData("type-list-schema", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Aircraft types",
        itemListElement: data.getUniqueAircraftClasses().map((type, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: type,
          url: site.absoluteUrl(typeHref(type))
        }))
      });
    }
  }

  const root = document.getElementById("type-detail-root");
  if (!root) return;

  const type = new URLSearchParams(window.location.search).get("id");
  const aircraft = data.allAircraft.filter((item) => item.class === type);
  if (!type || !data.classDescriptions[type] || aircraft.length === 0) {
    if (site) site.setMetadata({ title: "Aircraft Type Not Found", description: "This aircraft type could not be found.", path: "type.html", noIndex: true });
    root.innerHTML = `<section class="message-card"><p class="eyebrow">Unknown category</p><h1>That aircraft type was not found.</h1><p>Browse the complete list to choose a valid category.</p><a class="button button-primary" href="types.html">View aircraft types</a></section>`;
    return;
  }

  const description = `${type} aircraft explained with typical characteristics and ${aircraft.length} linked examples, including dimensions, range, capacity, and sources.`;
  if (site) {
    site.setMetadata({ title: `${type} Aircraft: Guide & Examples`, description, path: typeHref(type) });
    site.setStructuredData("type-page-schema", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${type} aircraft`,
      description,
      url: site.absoluteUrl(typeHref(type)),
      breadcrumb: site.breadcrumbSchema([
        { name: "Home", path: "index.html" },
        { name: "Aircraft Types", path: "types.html" },
        { name: type, path: typeHref(type) }
      ]),
      mainEntity: { "@type": "ItemList", numberOfItems: aircraft.length }
    });
  }

  root.innerHTML = `
    <section class="page-intro type-detail-intro">
      ${site ? site.breadcrumbMarkup([{ name: "Home", path: "index.html" }, { name: "Aircraft Types", path: "types.html" }, { name: type, path: typeHref(type) }]) : ""}
      <p class="eyebrow">Aircraft type guide</p>
      <h1>${type} aircraft</h1>
      <p class="hero-text">${data.classDescriptions[type]}</p>
      <div class="fact-bar"><div><span>Profiles</span><strong>${aircraft.length}</strong></div><div><span>Manufacturers</span><strong>${new Set(aircraft.map((item) => item.manufacturerName)).size}</strong></div><div><span>Earliest first flight</span><strong>${aircraft.map((item) => item.firstFlight).filter((value) => /^\d{4}$/.test(value)).sort()[0] || "Varies"}</strong></div></div>
    </section>
    <section class="detail-section">
      <div class="section-heading"><p class="eyebrow">Quick comparison</p><h2>Browse every ${type.toLowerCase()} profile</h2><p>Key figures appear directly on each card. Open a profile for engines, weight, variants, history, and sources.</p></div>
      <div class="aircraft-results-grid">${aircraft.map(aircraftCard).join("")}</div>
    </section>`;
});
