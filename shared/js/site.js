/* ==========================================================================
   SHARED POOL — site behaviour
   The design picker, the light/dark toggle, and the stored green tuning.
   Adding a variant means adding one line to VARIANTS below; every page's
   dropdown picks it up automatically.
   ========================================================================== */
(function () {
  var VARIANTS = [
    { id: "field-notebook", name: "Field Notebook" },
    { id: "playroom", name: "Playroom" }
  ];

  var root = document.documentElement;
  var variant = root.getAttribute("data-variant") || VARIANTS[0].id;
  var THEME_KEY = "pop:" + variant + ":theme";
  var TOKEN_KEY = "pop:" + variant + ":green";

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

  function currentTheme() {
    var saved = stored(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* Each variant stores its own tuning, so tuning one never disturbs another. */
  function applyGreen() {
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

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.querySelector("[data-picker]");
    if (mount) buildPicker(mount);

    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
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
  });
})();
