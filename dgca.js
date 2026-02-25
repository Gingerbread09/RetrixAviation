(() => {
    const $ = (q, root=document) => root.querySelector(q);
    const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  
    /* ========== Burger menu ========== */
    const burger = $("#burger");
    const nav = $("#nav");
    const menu = $("#menu");
  
    if (burger && nav) {
      burger.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
      });
    }
  
    /* ========== Mobile dropdown toggle for Pilot Training ========== */
    const pilotDD = $("#pilotDD");
    const pilotDDbtn = $("#pilotDDbtn");
    if (pilotDD && pilotDDbtn) {
      pilotDDbtn.addEventListener("click", (e) => {
        // allow click-to-open on mobile
        const isMobile = window.matchMedia("(max-width: 980px)").matches;
        if (!isMobile) return;
        e.preventDefault();
        const open = pilotDD.classList.toggle("is-open");
        pilotDDbtn.setAttribute("aria-expanded", String(open));
      });
    }
  
    /* ========== Tabs ========== */
    const tabs = $$(".tab");
    const panels = $$(".tabPanel");
  
    function setTab(tabName) {
      tabs.forEach(t => {
        const isActive = t.dataset.tab === tabName;
        t.classList.toggle("is-active", isActive);
        t.setAttribute("aria-selected", String(isActive));
      });
  
      panels.forEach(p => {
        p.classList.toggle("is-active", p.dataset.panel === tabName);
      });
    }
  
    tabs.forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));
  
    /* ========== Toast (subject clicks) ========== */
    const toast = $("#toast");
    let toastTimer = null;
  
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("is-on");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1200);
    }
  
    $$("[data-toast]").forEach(btn => {
      btn.addEventListener("click", () => showToast(`Added: ${btn.dataset.toast}`));
    });
  
    /* ========== Scroll reveal (clean) ========== */
    const revealEls = $$("[data-reveal]");
    const ioReveal = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add("is-revealed");
          ioReveal.unobserve(ent.target);
        }
      });
    }, { threshold: 0.14 });
  
    revealEls.forEach(el => ioReveal.observe(el));
  
    /* ========== Big box “image slides in within the box” (parallax-ish) ========== */
    const parallaxBoxes = $$("[data-parallax]");
    const ioPar = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.25 });
  
    parallaxBoxes.forEach(el => ioPar.observe(el));
  
    /* ========== Animated counters in Course Overview ========== */
    const counterEls = $$(".statNum[data-count]");
    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (!ent.isIntersecting) return;
  
        const el = ent.target;
        const target = parseFloat(el.dataset.count || "0");
        const isDecimal = String(el.dataset.count).includes(".");
        const duration = 900;
        const start = performance.now();
        const from = 0;
  
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = from + (target - from) * eased;
  
          el.textContent = isDecimal ? val.toFixed(1) : Math.round(val).toString();
          if (t < 1) requestAnimationFrame(tick);
        }
  
        requestAnimationFrame(tick);
        ioCount.unobserve(el);
      });
    }, { threshold: 0.5 });
  
    counterEls.forEach(el => ioCount.observe(el));
  
    /* ========== Route plane moves on scroll (nice touch) ========== */
    const routePlane = $("#plane");
    function moveRoutePlane() {
      if (!routePlane) return;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(1, Math.max(0, scrollTop / max));
  
      // keep it feeling controlled (not zooming across the world)
      const x = 18 + p * (window.innerWidth * 0.55);
      routePlane.style.setProperty("--x", `${x}px`);
    }
    window.addEventListener("scroll", moveRoutePlane, { passive: true });
    moveRoutePlane();
  })();
  