/* Components workbench for Option B: the two green dials, a live ramp, and a
   copy-out of the token block to paste back into css/tokens.css. */
(function () {
  var TOKEN_KEY = "pop:b:green";
  var root = document.documentElement;

  document.addEventListener("DOMContentLoaded", function () {
    var hue = document.querySelector("[data-dial='h']");
    var chroma = document.querySelector("[data-dial='c']");
    if (!hue || !chroma) return;

    var hueOut = document.querySelector("[data-dial-out='h']");
    var chromaOut = document.querySelector("[data-dial-out='c']");
    var resetBtn = document.querySelector("[data-dial-reset]");
    var copyBtn = document.querySelector("[data-dial-copy]");

    var defaults = {
      h: hue.getAttribute("data-default"),
      c: chroma.getAttribute("data-default")
    };

    function paint() {
      root.style.setProperty("--green-h", hue.value);
      root.style.setProperty("--green-c", chroma.value);
      if (hueOut) hueOut.textContent = hue.value;
      if (chromaOut) chromaOut.textContent = Number(chroma.value).toFixed(3);
    }

    function save() {
      try {
        localStorage.setItem(TOKEN_KEY, JSON.stringify({ h: hue.value, c: chroma.value }));
      } catch (e) {}
    }

    var saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(TOKEN_KEY) || "null");
    } catch (e) {}

    if (saved) {
      if (saved.h != null) hue.value = saved.h;
      if (saved.c != null) chroma.value = saved.c;
    }
    paint();

    hue.addEventListener("input", paint);
    chroma.addEventListener("input", paint);
    hue.addEventListener("change", save);
    chroma.addEventListener("change", save);

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        hue.value = defaults.h;
        chroma.value = defaults.c;
        paint();
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch (e) {}
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var block =
          ":root {\n  --green-h: " +
          hue.value +
          ";\n  --green-c: " +
          Number(chroma.value).toFixed(3) +
          ";\n}";
        var done = function (msg) {
          copyBtn.textContent = msg;
          setTimeout(function () {
            copyBtn.textContent = "Copy tokens";
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(block).then(
            function () {
              done("Copied");
            },
            function () {
              window.prompt("Copy this into css/tokens.css:", block);
            }
          );
        } else {
          window.prompt("Copy this into css/tokens.css:", block);
        }
      });
    }
  });
})();
