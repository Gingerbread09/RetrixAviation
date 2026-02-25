(() => {
  const menu = document.getElementById("menu");
  const plane = document.getElementById("plane");
  const route = document.querySelector(".route");

  // optional: only if you have the mobile hamburger
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");

  function movePlaneTo(el){
    if(!el || !plane || !route) return;

    const elRect = el.getBoundingClientRect();
    const routeRect = route.getBoundingClientRect();

    const x = (elRect.left + elRect.width / 2) - routeRect.left;

    // tweak this if plane isn't centered under the label
    const offset = 10;

    plane.style.setProperty("--x", `${Math.max(8, x - offset)}px`);
  }

  // Move plane for BOTH <a.link> and <button.link>
  menu?.addEventListener("click", (e) => {
    const target = e.target.closest(".link");
    if(!target) return;

    const isDropdownBtn = target.classList.contains("dd__btn");

    // Move plane no matter what
    movePlaneTo(target);

    // Only set active state for real nav LINKS (pages/sections)
    if(target.tagName === "A"){
      menu.querySelectorAll("a.link").forEach(a => a.classList.remove("is-active"));
      target.classList.add("is-active");

      // close mobile nav if present
      nav?.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    }

    // If it was a dropdown toggle button, don't navigate / jump
    if(isDropdownBtn) e.preventDefault();
  });

  // Position plane under the active link on load
  window.addEventListener("load", () => {
    const active = menu?.querySelector("a.link.is-active") || menu?.querySelector("a.link");
    if(active) movePlaneTo(active);
  });

  // keep it aligned when resizing
  window.addEventListener("resize", () => {
    const active = menu?.querySelector("a.link.is-active");
    if(active) movePlaneTo(active);
  });

  // mobile burger toggle (optional)
  burger?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });

})();
