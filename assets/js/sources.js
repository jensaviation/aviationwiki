document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const data = window.AviationData;
  const site = window.AviationSite;
  if (!data) return;

  const manufacturerRoot = document.getElementById("manufacturer-sources");
  const referenceRoot = document.getElementById("reference-sources");

  function sourceCard(source, label) {
    return `<article class="source-card"><span class="source-label">${label}</span><h3>${source.name}</h3><p>Use this primary reference for current product information and published aircraft characteristics.</p><a class="detail-link" href="${source.url}" target="_blank" rel="noopener noreferrer">Open official source <span aria-hidden="true">↗</span></a></article>`;
  }

  if (manufacturerRoot) {
    manufacturerRoot.innerHTML = data.manufacturers
      .filter((manufacturer) => manufacturer.source)
      .map((manufacturer) => sourceCard(manufacturer.source, manufacturer.name))
      .join("");
  }

  if (referenceRoot) {
    referenceRoot.innerHTML = data.referenceSources.map((source) => sourceCard(source, "Reference organization")).join("");
  }

  if (site) {
    site.setStructuredData("sources-page-schema", {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Aircraft Data Sources & Editorial Method",
      url: site.absoluteUrl("sources.html"),
      description: "Official sources and editorial method used by The Aviation Wiki."
    });
  }
});
