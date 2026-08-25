/* ==========================================================================
   SHARED POOL — site behaviour
   The design picker, the light/dark toggle, and the stored green tuning.
   Adding a variant means adding one line to VARIANTS below; every page's
   dropdown picks it up automatically.
   ========================================================================== */
(function () {
  var VARIANTS = [
    { id: "playroom", name: "Playroom" },
    { id: "playwell", name: "Playwell" },
    { id: "potential", name: "Potential" }
  ];

  var root = document.documentElement;
  var variant = root.getAttribute("data-variant") || VARIANTS[0].id;
  var THEME_KEY = "pop:" + variant + ":theme";
  var TOKEN_KEY = "pop:" + variant + ":green";
  var PALETTE_KEY = "pop:" + variant + ":palette";
  var TEAM_LAYOUT_KEY = "pop:" + variant + ":team-layout";
  var PALETTES = [
    { id: "meadow", name: "Meadow" },
    { id: "studio", name: "Studio" },
    { id: "seaside", name: "Seaside" }
  ];
  /* About-page experiment registry. Add a treatment here; the control and
     layout hook both pick it up without changing the page markup. */
  var TEAM_LAYOUTS = [
    { id: "two", name: "Two across" },
    { id: "three", name: "Three across" },
    { id: "one", name: "One at a time" },
    { id: "feature", name: "Feature cards" }
  ];

  function stored(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function applyPalette(palette) {
    var valid = PALETTES.some(function (p) { return p.id === palette; });
    root.setAttribute("data-palette", valid ? palette : "meadow");
  }

  function applyTeamLayout(layout) {
    var valid = TEAM_LAYOUTS.some(function (item) { return item.id === layout; });
    root.setAttribute("data-team-layout", valid ? layout : "two");
  }

  function currentTheme() {
    var saved = stored(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* Each variant stores its own tuning, so tuning one never disturbs another. */
  function applyGreen() {
    if (stored(PALETTE_KEY)) return;
    var raw = stored(TOKEN_KEY);
    if (!raw) return;
    try {
      var t = JSON.parse(raw);
      if (t.h != null) root.style.setProperty("--green-h", String(t.h));
      if (t.c != null) root.style.setProperty("--green-c", String(t.c));
    } catch (e) {
      /* A corrupt entry falls back to the values in theme.css. */
    }
  }

  /* Run before first paint to avoid a flash of the wrong theme. */
  applyTheme(stored(THEME_KEY));
  applyPalette(stored(PALETTE_KEY));
  applyTeamLayout(stored(TEAM_LAYOUT_KEY));
  applyGreen();

  function buildPicker(mount) {
    /* The current page, so switching design keeps you on the same page. */
    var page = window.location.pathname.split("/").pop() || "index.html";

    var id = "design-picker";
    var label = document.createElement("label");
    label.className = "picker__label";
    label.setAttribute("for", id);
    label.textContent = "Design";

    var select = document.createElement("select");
    select.className = "picker__select";
    select.id = id;

    VARIANTS.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = "../" + v.id + "/" + page;
      opt.textContent = v.name;
      if (v.id === variant) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", function () {
      window.location.href = select.value;
    });

    mount.appendChild(label);
    mount.appendChild(select);
  }

  function buildPalettePicker(mount) {
    var id = "palette-picker";
    var label = document.createElement("label");
    label.className = "picker__label";
    label.setAttribute("for", id);
    label.textContent = "Palette";

    var select = document.createElement("select");
    select.className = "picker__select";
    select.id = id;
    var current = root.getAttribute("data-palette") || "meadow";

    PALETTES.forEach(function (palette) {
      var opt = document.createElement("option");
      opt.value = palette.id;
      opt.textContent = palette.name;
      opt.selected = palette.id === current;
      select.appendChild(opt);
    });

    select.addEventListener("change", function () {
      try { localStorage.setItem(PALETTE_KEY, select.value); } catch (e) {}
      root.style.removeProperty("--green-h");
      root.style.removeProperty("--green-c");
      applyPalette(select.value);
    });

    mount.appendChild(label);
    mount.appendChild(select);
  }

  function buildTeamLayoutPicker(mount) {
    var id = "team-layout-picker";
    var label = document.createElement("label");
    label.className = "picker__label";
    label.setAttribute("for", id);
    label.textContent = "Team layout";

    var select = document.createElement("select");
    select.className = "picker__select";
    select.id = id;
    var current = root.getAttribute("data-team-layout") || "two";

    TEAM_LAYOUTS.forEach(function (layout) {
      var opt = document.createElement("option");
      opt.value = layout.id;
      opt.textContent = layout.name;
      opt.selected = layout.id === current;
      select.appendChild(opt);
    });

    select.addEventListener("change", function () {
      try { localStorage.setItem(TEAM_LAYOUT_KEY, select.value); } catch (e) {}
      applyTeamLayout(select.value);
    });

    mount.appendChild(label);
    mount.appendChild(select);
  }

  function buildPartnerMarquee(mount) {
    var partners = [
      ["Innovation Factory", "innovation", "../../assets/partners/innovation-factory.png"],
      ["The Forge", "forge", "../../assets/partners/the-forge.png"],
      ["Entrepreneurs’ Organization", "eo", "../../assets/partners/entrepreneurs-organization-transparent.png"],
      ["Hamilton Health Sciences", "hamilton-health", "../../assets/partners/hamilton-health.webp"],
      ["Remarkable", "remarkable", "../../assets/partners/remarkable.png"]
    ];
    var section = document.createElement("section");
    section.className = "partners";
    section.setAttribute("aria-label", "Community partners");
    section.innerHTML = '<div class="wrap partners__inner"><p class="eyebrow partners__label">Built alongside</p><div class="partners__viewport"><div class="partners__track"></div></div></div>';
    var track = section.querySelector(".partners__track");

    [false, true].forEach(function (hidden) {
      var group = document.createElement("div");
      group.className = "partners__group";
      if (hidden) group.setAttribute("aria-hidden", "true");
      partners.forEach(function (partner) {
        var logo = document.createElement("span");
        logo.className = "partners__logo partners__logo--" + partner[1];
        var image = document.createElement("img");
        image.src = partner[2];
        image.alt = partner[0];
        image.decoding = "async";
        logo.appendChild(image);
        group.appendChild(logo);
      });
      track.appendChild(group);
    });
    mount.appendChild(section);
  }

  function initCoverCarousels() {
    document.querySelectorAll("[data-cover-carousel]").forEach(function (carousel) {
      var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-cover-slide]"));
      var previous = carousel.querySelector("[data-cover-prev]");
      var next = carousel.querySelector("[data-cover-next]");
      var count = carousel.querySelector("[data-cover-count]");
      var active = 0;
      var interval;

      if (slides.length < 2) return;

      function show(index) {
        active = (index + slides.length) % slides.length;
        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle("is-active", slideIndex === active);
          slide.setAttribute("aria-hidden", slideIndex === active ? "false" : "true");
        });
        if (count) count.textContent = String(active + 1) + " / " + String(slides.length);
      }

      function stop() {
        if (interval) window.clearInterval(interval);
        interval = null;
      }

      function start() {
        stop();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        interval = window.setInterval(function () { show(active + 1); }, 5500);
      }

      if (previous) previous.addEventListener("click", function () { show(active - 1); start(); });
      if (next) next.addEventListener("click", function () { show(active + 1); start(); });
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", function () { window.setTimeout(start, 0); });
      show(0);
      start();
    });
  }

  /* This project is currently in content-placeholder mode. Landing pages and
     navigation retain their English copy; supporting-page content is lorem.
     Keeping the rule in the shared bootstrap avoids fragile page-by-page
     find-and-replace work across every design direction. */
  function applyLoremIpsum() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    /* Every variant landing stays in English. Supporting pages retain only
       their navigation and interactive controls; the top-level variants page
       does not load this script. */
    var isHome = page === "index.html";
    if (isHome) return;

    /* Supporting pages retain their English header and any interactive
       carousel controls, including the wordmark, navigation links, picker,
       theme control, and slide count. */
    function keepNavigationCopy(element) {
      return Boolean(element.closest("header, [data-cover-carousel]"));
    }
    var phrases = [
      "Lorem ipsum dolor sit amet.",
      "Consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt.",
      "Ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam."
    ];
    var index = 0;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var parent = node.parentElement;
        if (!parent || parent.closest("script, style, svg")) return NodeFilter.FILTER_REJECT;
        if (keepNavigationCopy(parent) || parent.closest("[data-keep-copy]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      node.nodeValue = phrases[index % phrases.length];
      index += 1;
    });

    document.querySelectorAll("[placeholder]").forEach(function (element) {
      if (keepNavigationCopy(element) || element.closest("[data-keep-copy]")) return;
      element.setAttribute("placeholder", phrases[index++ % phrases.length]);
    });
    document.querySelectorAll('input[type="text"][value], input[type="email"][value]').forEach(function (element) {
      if (keepNavigationCopy(element) || element.closest("[data-keep-copy]")) return;
      element.value = phrases[index++ % phrases.length];
    });
    document.querySelectorAll("img[alt]").forEach(function (image) {
      if (keepNavigationCopy(image) || image.closest("[data-keep-copy]")) return;
      image.alt = phrases[index++ % phrases.length];
    });
    document.title = "Lorem ipsum dolor sit amet";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.querySelector("[data-picker]");
    if (mount) buildPicker(mount);

    var paletteMount = document.querySelector("[data-palette-picker]");
    if (paletteMount) buildPalettePicker(paletteMount);

    var teamLayoutMount = document.querySelector("[data-team-layout-picker]");
    if (teamLayoutMount) buildTeamLayoutPicker(teamLayoutMount);

    var partnerMarqueeMount = document.querySelector("[data-partner-marquee]");
    if (partnerMarqueeMount) buildPartnerMarquee(partnerMarqueeMount);

    initCoverCarousels();

    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) {
      window.requestAnimationFrame(applyLoremIpsum);
      return;
    }
    var label = btn.querySelector("[data-theme-label]");

    function sync() {
      var now = currentTheme();
      btn.setAttribute("aria-label", "Switch to " + (now === "dark" ? "light" : "dark") + " mode");
      if (label) label.textContent = now === "dark" ? "Dark" : "Light";
    }

    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      applyTheme(next);
      sync();
    });

    sync();
    window.requestAnimationFrame(applyLoremIpsum);
  });
})();
