/* =========================
   NAV ROUTE PLANE (hover)
   ========================= */
   (() => {
    const menu  = document.getElementById("menu");
    const plane = document.getElementById("plane");
    const route = document.querySelector(".route");
  
    const burger = document.querySelector(".burger");
    const nav    = document.querySelector(".nav");
  
    if (!menu || !plane || !route) return;
  
    function movePlaneTo(el) {
      if (!el) return;
  
      const elRect = el.getBoundingClientRect();
      const routeRect = route.getBoundingClientRect();
  
      const x = (elRect.left + elRect.width / 2) - routeRect.left;
      const offset = 10;
  
      plane.style.setProperty("--x", `${Math.max(8, x - offset)}px`);
    }
  
    function handleMove(e) {
      const target = e.target.closest("a.link, button.link, .dd__menu a, .dd__btn");
      if (!target) return;
      movePlaneTo(target);
    }
  
    // hover/focus moves plane (desktop)
    menu.addEventListener("pointerover", handleMove);
    menu.addEventListener("focusin", handleMove);
  
    // initial placement
    function initPlane() {
      const active =
        menu.querySelector("a.link.is-active") ||
        menu.querySelector("a.link") ||
        menu.querySelector("button.link");
  
      if (active) movePlaneTo(active);
    }
    window.addEventListener("load", initPlane);
    window.addEventListener("resize", initPlane);
  
    // burger toggle
    burger?.addEventListener("click", () => {
      const open = nav?.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
  
    // close mobile menu on link click
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav?.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    });
  })();
  
  /* =========================
     DROPDOWN (click toggle)
     Fixes "dropdown hiding" + works on mobile
     ========================= */
  (() => {
    const dropdowns = document.querySelectorAll(".dd");
    if (!dropdowns.length) return;
  
    dropdowns.forEach(dd => {
      const btn = dd.querySelector(".dd__btn");
      const menu = dd.querySelector(".dd__menu");
      if (!btn || !menu) return;
  
      btn.addEventListener("click", (e) => {
        e.preventDefault();
  
        // close others
        dropdowns.forEach(x => {
          if (x !== dd) {
            x.classList.remove("is-open");
            const b = x.querySelector(".dd__btn");
            b?.setAttribute("aria-expanded", "false");
          }
        });
  
        const open = dd.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  
    // click outside closes
    document.addEventListener("click", (e) => {
      const inside = e.target.closest(".dd");
      if (inside) return;
  
      dropdowns.forEach(dd => {
        dd.classList.remove("is-open");
        const btn = dd.querySelector(".dd__btn");
        btn?.setAttribute("aria-expanded", "false");
      });
    });
  })();
  
  /* =========================
     HERO TAKEOFF (scroll plane)
     ========================= */
  (() => {
    const section = document.querySelector(".heroTakeoff");
    const plane   = document.getElementById("heroPlane");
    if (!section || !plane) return;
  
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    let ticking = false;
  
    function update() {
      ticking = false;
  
      const rect = section.getBoundingClientRect();
      const h = rect.height;
  
      const p = clamp((-rect.top) / h, 0, 1);
  
      const translateY = -p * 260;
      const scale      = 1 + p * 0.28;
      const rotate     = -p * 6;
      const fade       = 1 - p * 0.12;
  
      plane.style.transform =
        `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;
      plane.style.opacity = String(fade);
    }
  
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
  
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
  })();
  
  /* =========================
     HERO CLOUD PARALLAX (both layers)
     ========================= */
  (() => {
    const hero = document.querySelector(".heroTakeoff");
    const far = document.querySelector(".heroCloud--far");
    const near = document.querySelector(".heroCloud--near");
    if (!hero || !far || !near) return;
  
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    let ticking = false;
  
    function update(){
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const p = clamp((-rect.top) / rect.height, 0, 1);
  
      far.style.transform  = `translate3d(0, ${p * 10}px, 0)`;
      near.style.transform = `translate3d(0, ${p * 18}px, 0)`;
    }
  
    window.addEventListener("scroll", () => {
      if(!ticking){
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive:true });
  
    window.addEventListener("load", update);
    window.addEventListener("resize", update);
  })();
  /* =========================
   ABOUT CIRCLE PLANE (scroll)
   ========================= */
(() => {
  const section = document.querySelector(".aboutCircle");
  const plane = document.getElementById("aboutCirclePlane");
  if (!section || !plane) return;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let ticking = false;

  function update(){
    ticking = false;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // progress 0..1 across section visibility
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = clamp(raw, 0, 1);

    // move right as you scroll
    // start: tucked into circle (-120)
    // end: out to the right (+320)
    const x = -120 + p * 440;

    // tiny lift so it feels like "takeoff"
    const y = 0 + p * -18;

    // small rotate to feel dynamic
    const r = (-2 + p * 6).toFixed(2) + "deg";

    // small scale so it “approaches”
    const s = (1 + p * 0.06).toFixed(3);

    plane.style.setProperty("--x", `${x}px`);
    plane.style.setProperty("--y", `${y}px`);
    plane.style.setProperty("--r", r);
    plane.style.setProperty("--s", s);
  }

  function onScroll(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
})();

(() => {
  const section = document.querySelector(".aboutCircle");
  const plane = document.getElementById("aboutCirclePlane");
  const orb = document.querySelector(".aboutCircle__orb");
  if (!section || !plane || !orb) return;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let ticking = false;

  function update() {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress 0 -> 1 while scrolling through the section
    const raw = (vh * 0.65 - rect.top) / (rect.height * 0.85);
    const p = clamp(raw, 0, 1);

    // How far plane travels OUT of the circle to the right
    // Use orb width so it scales nicely across devices
    const orbRect = orb.getBoundingClientRect();

    // Start inside the orb, end to the right of it
    const travelX = orbRect.width * 0.85;   // tweak: 0.75 - 1.05
    const liftY = orbRect.height * 0.08;    // tiny up drift
    const scale = 1 + p * 0.06;             // subtle growth, not obnoxious

    // Desktop: plane anchored at left 12%, Mobile: plane anchored at 50% (CSS handles centering)
    // So we only animate the "exit" movement here.
    const x = p * travelX;
    const y = (-p * liftY);

    // Keep the correct base translate for desktop vs mobile
    const isMobileLayout = window.matchMedia("(max-width: 1024px)").matches;

    if (isMobileLayout) {
      plane.style.transform =
        `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
    } else {
      plane.style.transform =
        `translate3d(${x}px, calc(-50% + ${y}px), 0) scale(${scale})`;
    }

    // optional tiny fade so it feels like it’s “leaving”
    plane.style.opacity = String(1 - p * 0.12);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
})();

/* =========================
   COURSES MARQUEE v3 (BUTTERY SMOOTH, TRANSFORM-BASED)
   Paste at very end of app.js
   ========================= */
   document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.getElementById("courseViewport");
    const track = document.getElementById("courseTrack");
    const leftBtn = document.querySelector(".railBtn--left");
    const rightBtn = document.querySelector(".railBtn--right");
  
    if (!viewport || !track) return;
  
    // Reduced motion respect
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  
    // Stop any previous course rail (if you pasted older versions)
    if (window.__RETRIX_COURSES_STOP__) window.__RETRIX_COURSES_STOP__();
  
    // Ensure viewport is not being scrolled by other code
    viewport.scrollLeft = 0;
  
    // ------- CONFIG -------
    const SPEED_PX_PER_SEC = 140; // bump to 160/180 for faster
    const GAP_FALLBACK = 16;
  
    let raf = null;
    let last = 0;
    let x = 0; // current translateX (negative = moving left)
    let loopWidth = 0;
    let pausedUntil = 0;
  
    const pause = (ms = 1200) => (pausedUntil = Date.now() + ms);
    const paused = () => Date.now() < pausedUntil;
  
    // Read actual gap from CSS (flex/grid gap)
    function getGapPx() {
      const s = getComputedStyle(track);
      const g = parseFloat(s.gap || s.columnGap || "0");
      return Number.isFinite(g) && g > 0 ? g : GAP_FALLBACK;
    }
  
    // Duplicate content once for seamless loop
    function ensureClone() {
      if (track.dataset.cloned === "1") return;
      track.insertAdjacentHTML("beforeend", track.innerHTML);
      track.dataset.cloned = "1";
    }
  
    // Measure width of the ORIGINAL set (half of children after clone)
    function measureLoopWidth() {
      const kids = Array.from(track.children);
      if (!kids.length) return 0;
  
      const half = Math.floor(kids.length / 2);
      const gap = getGapPx();
  
      let w = 0;
      for (let i = 0; i < half; i++) {
        w += kids[i].getBoundingClientRect().width;
        if (i !== half - 1) w += gap;
      }
      return w;
    }
  
    function apply() {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  
    // Smooth tween for arrow clicks (no scrollBy bugs)
    function tweenTo(targetX, ms = 520) {
      pause(ms + 500);
      const startX = x;
      const diff = targetX - startX;
      const start = performance.now();
  
      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  
      function step(now) {
        const t = Math.min(1, (now - start) / ms);
        x = startX + diff * easeOutCubic(t);
        normalize(); // keep it in loop range
        apply();
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  
    function normalize() {
      if (!loopWidth) return;
      // Keep x in [-loopWidth, 0)
      while (x <= -loopWidth) x += loopWidth;
      while (x > 0) x -= loopWidth;
    }
  
    function cardStepPx() {
      const first = track.querySelector(".courseCard");
      if (!first) return 320;
      return first.getBoundingClientRect().width + getGapPx();
    }
  
    // Main animation loop (GPU smooth)
    function tick(ts) {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
  
      if (!paused()) {
        x -= SPEED_PX_PER_SEC * dt; // move left
        normalize();
        apply();
      }
  
      raf = requestAnimationFrame(tick);
    }
  
    // Interactions pause it (prevents fighting)
    viewport.addEventListener("mouseenter", () => pause(999999));
    viewport.addEventListener("mouseleave", () => pause(700));
    viewport.addEventListener("touchstart", () => pause(999999), { passive: true });
    viewport.addEventListener("touchend", () => pause(1200), { passive: true });
  
    // Arrows: move by one card smoothly
    leftBtn?.addEventListener("click", () => {
      const step = cardStepPx();
      tweenTo(x + step, 520); // move right visually
    });
    rightBtn?.addEventListener("click", () => {
      const step = cardStepPx();
      tweenTo(x - step, 520); // move left visually
    });
  
    // Init
    function start() {
      ensureClone();
      loopWidth = measureLoopWidth();
      normalize();
      apply();
  
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
  
    window.addEventListener("resize", () => {
      pause(600);
      last = 0;
      loopWidth = measureLoopWidth();
      normalize();
      apply();
    });
  
    start();
  
    // expose stop hook
    window.__RETRIX_COURSES_STOP__ = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };
  });