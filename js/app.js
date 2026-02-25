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
  
      const translateY = -p * 420;
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
   COURSES AUTO-SCROLL RAIL
   ========================= */
   (() => {
    const viewport = document.getElementById("courseViewport");
    const track = document.getElementById("courseTrack");
    if (!viewport || !track) return;
  
    const leftBtn = document.querySelector(".railBtn--left");
    const rightBtn = document.querySelector(".railBtn--right");
  
    // Respect reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    // Seamless loop: clone once
    const original = track.innerHTML;
    track.insertAdjacentHTML("beforeend", original);
  
    // Auto scroll state
    let x = 0;
    let rafId = null;
    let paused = false;
  
    // speed (px per frame-ish; tuned for smooth)
    const SPEED = 0.45;
  
    // measure half width (original content)
    const getHalfWidth = () => {
      // total width of half the children (first set)
      const children = [...track.children];
      const halfCount = children.length / 2;
      let w = 0;
      for (let i = 0; i < halfCount; i++) {
        w += children[i].getBoundingClientRect().width;
        if (i !== halfCount - 1) w += 16; // gap
      }
      return w;
    };
  
    let halfWidth = 0;
  
    function tick(){
      if (!paused && !reduceMotion) {
        x += SPEED;
        if (x >= halfWidth) x = 0;
        viewport.scrollLeft = x;
      }
      rafId = requestAnimationFrame(tick);
    }
  
    function start(){
      cancelAnimationFrame(rafId);
      halfWidth = getHalfWidth();
      rafId = requestAnimationFrame(tick);
    }
  
    function pause(){ paused = true; }
    function resume(){ paused = false; }
  
    // pause on hover / focus / touch
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", resume);
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", resume, { passive: true });
  
    // arrow buttons (manual bump)
    const scrollStep = () => {
      const card = track.querySelector(".courseCard");
      if (!card) return 320;
      return card.getBoundingClientRect().width + 16;
    };
  
    leftBtn?.addEventListener("click", () => {
      pause();
      viewport.scrollBy({ left: -scrollStep(), behavior: "smooth" });
      setTimeout(resume, 900);
    });
    rightBtn?.addEventListener("click", () => {
      pause();
      viewport.scrollBy({ left: scrollStep(), behavior: "smooth" });
      setTimeout(resume, 900);
    });
  
    // mobile tap open (hover replacement)
    const cards = track.querySelectorAll(".courseCard");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        if (window.matchMedia("(hover: hover)").matches) return;
        cards.forEach(c => { if (c !== card) c.classList.remove("is-open"); });
        card.classList.toggle("is-open");
      });
    });
  
    window.addEventListener("resize", start);
    window.addEventListener("load", start);
  
    start();
  })();
  
  (() => {
    const section = document.querySelector(".rating");
    const plane   = document.getElementById("ratingPlane");
    const model   = document.getElementById("ratingModel");
    const text    = document.getElementById("ratingText");
    const tabs    = document.querySelectorAll(".ratingTab");
  
    if (!section || !plane || !model || !text) return;
  
    const DATA = {
      airbus: {
        img: "assets/AIRBUS.png",
        model: "Airbus A320",
        text:
          "Airbus is one of the most preferred choices of travelers. Type rating training for this can unlock more airline-ready opportunities."
      },
      boeing: {
        img: "assets/BOEING.png",
        model: "Boeing 737",
        text:
          "Boeing type ratings are iconic for airline pathways. Train smarter with structured prep, cockpit flows, and scenario practice."
      },
      atr: {
        img: "assets/ATR.png",
        model: "ATR 72",
        text:
          "ATR ratings are strong for regional airline ops. Build confidence with practical procedures, decision-making, and consistency."
      }
    };
  
    // tab switching
    function setActive(key){
      const d = DATA[key];
      if (!d) return;
  
      tabs.forEach(t => {
        const active = t.dataset.aircraft === key;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
  
      // quick swap (no flicker)
      plane.style.opacity = "0";
      setTimeout(() => {
        plane.src = d.img;
        model.textContent = d.model;
        text.textContent = d.text;
        plane.style.opacity = "1";
      }, 120);
    }
  
    tabs.forEach(btn => {
      btn.addEventListener("click", () => setActive(btn.dataset.aircraft));
    });
  
    // scroll motion (plane slides out of circle + glides right)
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    let ticking = false;
  
    function animate(){
      ticking = false;
  
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
  
      // progress: 0 when section just enters, 1 when it passes
      const raw = (vh - r.top) / (vh + r.height);
      const p = clamp(raw, 0, 1);
  
      // plane motion: from left-ish inside circle -> moving right + slight lift
      const x = (-140 + p * 260);     // slide right
      const y = (18 - p * 40);        // slight lift
      const rot = (-2 + p * 3);       // tiny rotate
      const sc = (1.02 + p * 0.04);   // slight scale
      const op = clamp(p * 1.2, 0, 1);
  
      plane.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${sc})`;
      plane.style.opacity = String(op);
  
      // optional: nudge the copy for that premium parallax
      const copy = section.querySelector(".ratingCopy");
      if (copy){
        const copyY = (18 - p * 18);
        copy.style.transform = `translate3d(0, ${copyY}px, 0)`;
        copy.style.opacity = String(clamp(0.65 + p * 0.35, 0, 1));
      }
    }
  
    function onScroll(){
      if (!ticking){
        ticking = true;
        requestAnimationFrame(animate);
      }
    }
  
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", animate);
    window.addEventListener("load", animate);
  
    // set default
    setActive("airbus");
    animate();
  })();
  

  
/* =========================
   GW FOOTER PLANE (left → smooth drift)
   ========================= */
   (() => {
    const plane = document.getElementById("gwFooterPlane");
    const footer = document.getElementById("gwFooter");
    if (!plane || !footer) return;
  
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  
    let current = 0;
    let target = 0;
  
    function updateTarget(){
      const r = footer.getBoundingClientRect();
      const vh = window.innerHeight;
  
      const pRaw = (vh - r.top) / (vh + r.height);
      const p = clamp(pRaw, 0, 1);
  
      // smoothstep easing
      const eased = p * p * (3 - 2 * p);
  
      // only drift 1/4 screen
      target = window.innerWidth * 0.25 * eased;
    }
  
    function animate(){
      current += (target - current) * 0.06; // smaller = smoother
      plane.style.transform = `translate3d(${current}px, 0, 0)`;
      requestAnimationFrame(animate);
    }
  
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    window.addEventListener("load", updateTarget);
  
    updateTarget();
    animate();
  })();
/* =========================
   COURSES RAIL: arrows + auto-scroll + hover pause
   ========================= */
   (() => {
    const viewport = document.getElementById("courseViewport");
    const track = document.getElementById("courseTrack");
    if (!viewport || !track) return;
  
    const leftBtn = document.querySelector(".railBtn--left");
    const rightBtn = document.querySelector(".railBtn--right");
  
    // scroll by ~1 card
    function cardStep() {
      const first = track.querySelector(".courseCard");
      if (!first) return 320;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
      return first.getBoundingClientRect().width + gap;
    }
  
    function scrollByDir(dir) {
      viewport.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
    }
  
    leftBtn?.addEventListener("click", () => scrollByDir(-1));
    rightBtn?.addEventListener("click", () => scrollByDir(1));
  
    // Auto-scroll loop (stops on hover/touch/interaction)
    let paused = false;
    let rafId = null;
    const speed = 0.45; // px per frame-ish
  
    function tick() {
      if (!paused) {
        viewport.scrollLeft += speed;
  
        // loop back when nearing end
        const max = viewport.scrollWidth - viewport.clientWidth;
        if (viewport.scrollLeft >= max - 2) viewport.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(tick);
    }
  
    // pause on hover/focus/touch
    const pause = () => (paused = true);
    const play = () => (paused = false);
  
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", play);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", play);
  
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", () => setTimeout(play, 1200), { passive: true });
  
    // user scroll = pause briefly
    let userTimer = null;
    viewport.addEventListener("scroll", () => {
      paused = true;
      clearTimeout(userTimer);
      userTimer = setTimeout(() => (paused = false), 1200);
    }, { passive: true });
  
    // start
    cancelAnimationFrame(rafId);
    tick();
  })();
  // Type Rating aircraft switcher: spawn from left on every click
(() => {
  const img = document.getElementById("aircraftImg");
  const note = document.getElementById("aircraftNote");
  const tabs = document.querySelectorAll(".airTab");
  if (!img || !note || tabs.length === 0) return;

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

  function setActive(key){
    tabs.forEach(t => {
      const on = t.dataset.aircraft === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });

    const next = data[key];
    if (!next) return;

    // Change image + restart animation
    img.classList.remove("is-enter"); // reset
    // Force reflow so the animation restarts cleanly
    void img.offsetWidth;

    img.src = next.src;
    img.alt = next.alt;
    note.textContent = next.note;

    img.classList.add("is-enter");
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => setActive(t.dataset.aircraft));
  });
})();
(() => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuNwjkBe03YF3aCzDfahiN9tv5FQ-1c6kJT1wpWZ8W4oj1eCgSGF50TtFBSeHHEcQHjw/exec";

  const form = document.getElementById("brochureForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending… <span class="brochureBtn__dot">→</span>';

    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: new FormData(form) });
      await res.text();

      btn.innerHTML = 'Sent ✅ <span class="brochureBtn__dot">→</span>';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
      }, 2000);

    } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.innerHTML = original;
      alert("Something broke. Try again.");
    }
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuNwjkBe03YF3aCzDfahiN9tv5FQ-1c6kJT1wpWZ8W4oj1eCgSGF50TtFBSeHHEcQHjw/exec";

  const form = document.getElementById("brochureForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending… <span class="brochureBtn__dot">→</span>';

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new FormData(form),
      });

      // If Apps Script isn’t truly public, you’ll often get HTML back here.
      const text = await res.text();

      if (!res.ok) throw new Error(text || "Request failed");

      btn.innerHTML = 'Sent ✅ <span class="brochureBtn__dot">→</span>';
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
      }, 2000);

    } catch (err) {
      console.error("BROCHURE ERROR:", err);
      btn.disabled = false;
      btn.innerHTML = original;
      alert("Submission failed. Check console for details.");
    }
  });
});
