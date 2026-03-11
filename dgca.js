(() => {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];

  /* ========== Tabs ========== */
  const tabs = $$(".tab");
  const panels = $$(".tabPanel");

  function setTab(tabName) {
    tabs.forEach((t) => {
      const isActive = t.dataset.tab === tabName;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((p) => {
      p.classList.toggle("is-active", p.dataset.panel === tabName);
    });
  }

  tabs.forEach((t) => {
    t.addEventListener("click", () => setTab(t.dataset.tab));
  });

  /* ========== Toast ========== */
  const toast = $("#toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1200);
  }

  $$("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(`${btn.dataset.toast}`));
  });

  /* ========== Scroll reveal ========== */
  const revealEls = $$("[data-reveal]");
  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add("is-revealed");
        ioReveal.unobserve(ent.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach((el) => ioReveal.observe(el));

  /* ========== In-view animation helper ========== */
  const parallaxBoxes = $$("[data-parallax]");
  const ioPar = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.25 });

  parallaxBoxes.forEach((el) => ioPar.observe(el));
})();

/* =========================
   DGCA PARALLAX
   ========================= */
(() => {
  const boxes = document.querySelectorAll("[data-parallax]");
  if (!boxes.length) return;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let ticking = false;

  function updateParallax() {
    ticking = false;
    const vh = window.innerHeight || 1;

    boxes.forEach((box) => {
      const bgImg = box.querySelector(".reqCard__bg img, .batchCard__bg img");
      if (!bgImg) return;

      const rect = box.getBoundingClientRect();
      const raw = (vh - rect.top) / (vh + rect.height);
      const p = clamp(raw, 0, 1);

      const y = -30 + (p * 60);
      const scale = 1.02 + (p * 0.01);

      bgImg.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax);
  window.addEventListener("load", updateParallax);

  updateParallax();
})();