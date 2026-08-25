/* A local, reversible editor for testing Contact form options in the browser. */
(function () {
  var KEY = "pop:scratch:contact-reasons";
  var MOTIF_KEY = "pop:scratch:hero-motif";
  var TYPE_KEY = "pop:scratch:hero-type";
  var TITLE_KEY = "pop:scratch:hero-title";
  var SUBHEADING_KEY = "pop:scratch:hero-subheading";
  var DEFAULTS = ["I’m interested in learning more", "I’d like to explore a partnership or trial", "I met your team at an event", "Other"];

  function getOptions() {
    try {
      var stored = JSON.parse(localStorage.getItem(KEY) || "null");
      return Array.isArray(stored) && stored.length ? stored : DEFAULTS;
    } catch (e) { return DEFAULTS; }
  }

  function render(options) {
    document.querySelectorAll("[data-contact-reasons]").forEach(function (select) {
      select.textContent = "";
      options.forEach(function (text) {
        var option = document.createElement("option");
        option.textContent = text;
        option.value = text;
        select.appendChild(option);
      });
    });
  }

  function buildMotifPicker(mount) {
    var motifs = [
      { id: "blocks", name: "Blocks" },
      { id: "orbit", name: "Orbit" },
      { id: "playmat", name: "Playmat" },
      { id: "meadow", name: "Meadow shapes" },
      { id: "arch", name: "Rainbow arch" },
      { id: "carousel", name: "Image carousel" },
      { id: "quiet", name: "Quiet" }
    ];
    var current;
    try { current = localStorage.getItem(MOTIF_KEY) || "blocks"; } catch (e) { current = "blocks"; }
    if (!motifs.some(function (motif) { return motif.id === current; })) current = "blocks";
    document.documentElement.setAttribute("data-hero-motif", current);

    var label = document.createElement("label");
    label.className = "picker__label";
    label.htmlFor = "hero-motif-picker";
    label.textContent = "Motif";
    var select = document.createElement("select");
    select.className = "picker__select";
    select.id = "hero-motif-picker";
    motifs.forEach(function (motif) {
      var option = document.createElement("option");
      option.value = motif.id;
      option.textContent = motif.name;
      option.selected = motif.id === current;
      select.appendChild(option);
    });
    select.addEventListener("change", function () {
      document.documentElement.setAttribute("data-hero-motif", select.value);
      try { localStorage.setItem(MOTIF_KEY, select.value); } catch (e) {}
    });
    mount.appendChild(label);
    mount.appendChild(select);
  }

  function buildTypePicker(mount) {
    var types = [{ id: "underline", name: "Power underline" }, { id: "pill", name: "Play pill" }, { id: "both", name: "Underline + pill" }, { id: "plain", name: "Plain" }];
    var current;
    try { current = localStorage.getItem(TYPE_KEY) || "underline"; } catch (e) { current = "underline"; }
    document.documentElement.setAttribute("data-hero-text-style", current);
    var label = document.createElement("label");
    label.className = "picker__label";
    label.htmlFor = "hero-type-picker";
    label.textContent = "Type";
    var select = document.createElement("select");
    select.className = "picker__select";
    select.id = "hero-type-picker";
    types.forEach(function (type) {
      var option = document.createElement("option");
      option.value = type.id;
      option.textContent = type.name;
      option.selected = type.id === current;
      select.appendChild(option);
    });
    select.addEventListener("change", function () {
      document.documentElement.setAttribute("data-hero-text-style", select.value);
      try { localStorage.setItem(TYPE_KEY, select.value); } catch (e) {}
    });
    mount.appendChild(label);
    mount.appendChild(select);
  }

  function buildHeroCopyEditor() {
    var title = document.querySelector("[data-hero-title]");
    var subheading = document.querySelector("[data-hero-subheading]");
    var titleEditor = document.querySelector("[data-hero-title-editor]");
    var subheadingEditor = document.querySelector("[data-hero-subheading-editor]");
    if (!title || !subheading || !titleEditor || !subheadingEditor) return;
    function renderTitle(value) {
      title.textContent = "";
      if (value.trim() === "Power of Play") {
        title.innerHTML = '<span class="hero__power">Power</span> of <em>Play</em>';
      } else { title.textContent = value; }
    }
    try {
      var savedTitle = localStorage.getItem(TITLE_KEY);
      var savedSubheading = localStorage.getItem(SUBHEADING_KEY);
      if (savedTitle) { titleEditor.value = savedTitle; renderTitle(savedTitle); }
      if (savedSubheading) { subheadingEditor.value = savedSubheading; subheading.textContent = savedSubheading; }
    } catch (e) {}
    titleEditor.addEventListener("input", function () {
      renderTitle(titleEditor.value);
      try { localStorage.setItem(TITLE_KEY, titleEditor.value); } catch (e) {}
    });
    subheadingEditor.addEventListener("input", function () {
      subheading.textContent = subheadingEditor.value;
      try { localStorage.setItem(SUBHEADING_KEY, subheadingEditor.value); } catch (e) {}
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var motifMount = document.querySelector("[data-hero-motif-picker]");
    if (motifMount) buildMotifPicker(motifMount);
    var typeMount = document.querySelector("[data-hero-type-picker]");
    if (typeMount) buildTypePicker(typeMount);
    buildHeroCopyEditor();
    var options = getOptions();
    render(options);
    var editor = document.querySelector("[data-contact-reasons-editor]");
    var reset = document.querySelector("[data-contact-reasons-reset]");
    if (!editor) return;
    editor.value = options.join("\n");
    editor.addEventListener("input", function () {
      var next = editor.value.split("\n").map(function (item) { return item.trim(); }).filter(Boolean);
      if (!next.length) return;
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
      render(next);
    });
    if (reset) reset.addEventListener("click", function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      editor.value = DEFAULTS.join("\n");
      render(DEFAULTS);
    });
  });
})();
