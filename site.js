/* =========================
   SHARED NAV ROUTE PLANE + BURGER
   ========================= */
   (() => {
    const menu = document.getElementById("menu");
    const plane = document.getElementById("plane");
    const route = document.querySelector(".route");
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
  
    if (!menu || !burger || !nav) return;
  
    function movePlaneTo(el) {
      if (!el || !plane || !route) return;
  
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
  
    menu.addEventListener("pointerover", handleMove);
    menu.addEventListener("focusin", handleMove);
  
    function initPlane() {
      const active =
        menu.querySelector("a.link.is-active") ||
        menu.querySelector("a.link") ||
        menu.querySelector("button.link");
  
      if (active) movePlaneTo(active);
    }
  
    window.addEventListener("load", initPlane);
    window.addEventListener("resize", initPlane);
  
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
  
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
  
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  })();
  
  /* =========================
     SHARED DROPDOWN
     ========================= */
  (() => {
    const dropdowns = document.querySelectorAll(".dd");
    if (!dropdowns.length) return;
  
    dropdowns.forEach((dd) => {
      const btn = dd.querySelector(".dd__btn");
      const menu = dd.querySelector(".dd__menu");
      if (!btn || !menu) return;
  
      btn.addEventListener("click", (e) => {
        const isMobile = window.matchMedia("(max-width: 980px)").matches;
        e.preventDefault();
  
        if (!isMobile) {
          const open = dd.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", String(open));
          return;
        }
  
        dropdowns.forEach((x) => {
          if (x !== dd) {
            x.classList.remove("is-open");
            x.querySelector(".dd__btn")?.setAttribute("aria-expanded", "false");
          }
        });
  
        const open = dd.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  
    document.addEventListener("click", (e) => {
      const inside = e.target.closest(".dd");
      if (inside) return;
  
      dropdowns.forEach((dd) => {
        dd.classList.remove("is-open");
        dd.querySelector(".dd__btn")?.setAttribute("aria-expanded", "false");
      });
    });
  })();