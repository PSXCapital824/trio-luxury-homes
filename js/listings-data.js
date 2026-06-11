/**
 * TRIO LUXURY HOMES — LISTINGS DATA
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all property listings.
 * Edit this file only — changes automatically reflect on both
 * the home page (Available Homes) and the Current Listings page.
 *
 * status options: "available" | "under-contract" | "sold"
 * tag (optional): "Custom Build" — shows as a secondary badge
 * ─────────────────────────────────────────────────────────────
 */

const TRIO_LISTINGS = [
  {
    address:  "15152 Hopewell Road",
    meta:     "Alpharetta &nbsp;·&nbsp; 2.1 Acres &nbsp;·&nbsp; Spring 2027",
    status:   "available",
    image:    "images/portfolio/home1.jpg",
    url:      "listing-15152-hopewell.html",
    cta:      "View Listing →",
    tag:      null
  },
  {
    address:  "14750 Hopewell Road",
    meta:     "Alpharetta &nbsp;·&nbsp; 1.4 Acres &nbsp;·&nbsp; Summer 2027",
    status:   "available",
    image:    "images/portfolio/coming-soon.jpg",
    url:      null,
    cta:      "Coming Soon",
    tag:      null
  },
  {
    address:  "14756 Hopewell Road",
    meta:     "Alpharetta &nbsp;·&nbsp; 1.5 Acres &nbsp;·&nbsp; Summer 2027",
    status:   "available",
    image:    "images/portfolio/coming-soon.jpg",
    url:      null,
    cta:      "Coming Soon",
    tag:      null
  },
  {
    address:  "Milton Estate",
    meta:     "Milton &nbsp;·&nbsp; 3.5 Acres &nbsp;·&nbsp; Completed 2024",
    status:   "sold",
    image:    "images/portfolio/home4.jpg",
    url:      "contact.html",
    cta:      "Learn More →",
    tag:      "Custom Build"
  },
  {
    address:  "Buckhead Residence",
    meta:     "Atlanta &nbsp;·&nbsp; 1.2 Acres &nbsp;·&nbsp; Completed 2023",
    status:   "sold",
    image:    "images/portfolio/home5.jpg",
    url:      "contact.html",
    cta:      "Learn More →",
    tag:      null
  },
  {
    address:  "Sandy Springs Estate",
    meta:     "Sandy Springs &nbsp;·&nbsp; 2.8 Acres &nbsp;·&nbsp; Completed 2023",
    status:   "sold",
    image:    "images/portfolio/home6.jpg",
    url:      "contact.html",
    cta:      "Learn More →",
    tag:      "Custom Build"
  }
];

/* ── Badge config ───────────────────────────────────────────── */
const BADGE = {
  "available":       { cls: "badge-available", label: "Available" },
  "under-contract":  { cls: "badge-contract",  label: "Under Contract" },
  "sold":            { cls: "badge-sold",       label: "Sold" }
};

/**
 * renderListings(containerId, mode)
 *
 * containerId — id of the <div> to populate
 * mode        — "home"      : simple cards (used on index.html)
 *               "portfolio" : adds portfolio-item + data-category (used on portfolio.html)
 */
function renderListings(containerId, mode) {
  var container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = TRIO_LISTINGS.map(function(l) {
    var badge      = BADGE[l.status] || BADGE["available"];
    var category   = l.tag ? l.status + " " + l.tag.toLowerCase().replace(/\s+/g, "-") : l.status;
    var tagHTML    = l.tag ? '<span class="listing-type-tag">' + l.tag + '</span>' : "";
    var extraClass = mode === "portfolio" ? " portfolio-item" : "";
    var dataAttr   = mode === "portfolio" ? ' data-category="' + category + '"' : "";

    return [
      '<div class="home-gallery-card' + extraClass + '"' + dataAttr + '>',
      '  <img src="' + l.image + '" alt="' + l.address + '">',
      '  <span class="listing-badge ' + badge.cls + '">' + badge.label + '</span>',
      tagHTML,
      '  <div class="home-gallery-overlay">',
      '    <div class="home-gallery-address">' + l.address + '</div>',
      '    <div class="home-gallery-meta">' + l.meta + '</div>',
      l.url ? '    <a href="' + l.url + '" class="home-gallery-cta">' + l.cta + '</a>' : '    <span class="home-gallery-cta" style="opacity:0.4; cursor:default; pointer-events:none;">' + l.cta + '</span>',
      '  </div>',
      '</div>'
    ].join("\n");
  }).join("\n");
}
