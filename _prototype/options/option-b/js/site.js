/* Shared site behaviour for Option B. Storage keys are namespaced to this
   option so tuning one direction never disturbs another. */
(function () {
  var THEME_KEY = "pop:b:theme";
  var TOKEN_KEY = "pop:b:green";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function stored(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    var saved = stored(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyGreen() {
    var raw = stored(TOKEN_KEY);
    if (!raw) return;
    try {
      var t = JSON.parse(raw);
      if (t.h != null) root.style.setProperty("--green-h", String(t.h));
      if (t.c != null) root.style.setProperty("--green-c", String(t.c));
    } catch (e) {
      /* A corrupt entry just falls back to the file defaults. */
    }
  }

  /* Run before first paint to avoid a flash of the wrong theme. */
  applyTheme(stored(THEME_KEY));
  applyGreen();

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    var label = btn.querySelector("[data-theme-label]");

    function sync() {
      var now = currentTheme();
      var next = now === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
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
