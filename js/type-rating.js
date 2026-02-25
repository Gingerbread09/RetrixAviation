// =========================
// TYPE RATING PAGE ONLY
// Spawn new aircraft from left (like your video)
// =========================
(() => {
  const stage = document.getElementById("aircraftStage");
  const note = document.getElementById("aircraftNote");
  const tabs = document.querySelectorAll(".airTab");

  if (!stage || !note || tabs.length === 0) return;

  const data = {
    airbus: {
      src: "assets/type-airbus.png",
      alt: "Airbus aircraft",
      note: "Airbus A320 family — one of the most common airline fleets."
    },
    boeing: {
      src: "assets/type-boeing.png",
      alt: "Boeing aircraft",
      note: "Boeing 737 family — widely used for short-to-medium haul routes."
    },
    atr: {
      src: "assets/type-atr.png",
      alt: "ATR aircraft",
      note: "ATR turboprops — popular for regional routes and short sectors."
    }
  };

  let currentKey = null;

  function setActive(key) {
    const next = data[key];
    if (!next || key === currentKey) return;
    currentKey = key;

    // tabs UI
    tabs.forEach((t) => {
      const on = t.dataset.aircraft === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });

    note.textContent = next.note;

    // old plane
    const oldImg = stage.querySelector("img.aircraftImg");

    // new plane (spawn)
    const img = document.createElement("img");
    img.className = "aircraftImg is-enter";
    img.src = next.src;
    img.alt = next.alt;
    img.loading = "eager";

    stage.appendChild(img);

    // animate old out + remove
    if (oldImg) {
      oldImg.classList.remove("is-enter");
      oldImg.classList.add("is-exit");

      oldImg.addEventListener(
        "animationend",
        () => oldImg.remove(),
        { once: true }
      );
    }

    // if for some reason animation doesn’t fire, keep stage clean
    img.addEventListener("animationend", () => {
      // after entering, just remove is-enter so it becomes “resting”
      img.classList.remove("is-enter");
    }, { once: true });
  }

  tabs.forEach((t) => {
    t.addEventListener("click", () => setActive(t.dataset.aircraft));
  });

  // init
  setActive("airbus");
})();
