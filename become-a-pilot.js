(() => {
    const STORAGE_KEY = "pilotStepsDone_v1";
  
    const cards = Array.from(document.querySelectorAll(".stepCard"));
    const fill = document.getElementById("progressFill");
    const txt = document.getElementById("progressText");
    const resetBtn = document.getElementById("resetSteps");
  
    if (!cards.length) return;
  
    const getState = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
      catch { return {}; }
    };
  
    const setState = (state) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };
  
    const updateProgress = () => {
      const done = cards.filter(c => c.classList.contains("isDone")).length;
      const total = cards.length;
      const pct = total ? Math.round((done / total) * 100) : 0;
  
      if (fill) fill.style.width = `${pct}%`;
      if (txt) txt.textContent = `${done}/${total} completed`;
    };
  
    const applyState = () => {
      const state = getState();
      cards.forEach(card => {
        const step = card.getAttribute("data-step");
        const box = card.querySelector(".stepBox");
        const isDone = !!state[step];
  
        card.classList.toggle("isDone", isDone);
        if (box) box.checked = isDone;
      });
      updateProgress();
    };
  
    const closeAllExcept = (keepCard) => {
      cards.forEach(card => {
        if (card !== keepCard) {
          const details = card.querySelector("details");
          if (details) details.open = false;
        }
      });
    };
  
    const openNext = (currentCard) => {
      const idx = cards.indexOf(currentCard);
      const next = cards[idx + 1] || cards[0];
      const details = next.querySelector("details");
      if (details) {
        details.open = true;
        next.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
  
    // checkbox change
    cards.forEach(card => {
      const step = card.getAttribute("data-step");
      const box = card.querySelector(".stepBox");
      const details = card.querySelector("details");
  
      box?.addEventListener("change", (e) => {
        const state = getState();
        state[step] = e.target.checked;
        setState(state);
        card.classList.toggle("isDone", e.target.checked);
        updateProgress();
      });
  
      // action buttons
      card.querySelectorAll("[data-action]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
  
          const action = btn.getAttribute("data-action");
  
          if (action === "openOnly") {
            if (details) details.open = true;
            closeAllExcept(card);
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
  
          if (action === "next") {
            openNext(card);
          }
        });
      });
    });
  
    // reset
    resetBtn?.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      applyState();
      // also close all
      cards.forEach(c => {
        const d = c.querySelector("details");
        if (d) d.open = false;
      });
    });
  
    // initialize
    applyState();
  })();
  const steps = document.querySelectorAll(".stepCard");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let completed = 0;

steps.forEach(step => {
  const checkbox = step.querySelector(".stepCheck");

  step.addEventListener("click", e => {
    if(e.target.tagName !== "INPUT"){
      step.classList.toggle("active");
    }
  });

  checkbox.addEventListener("change", () => {
    if(checkbox.checked){
      step.classList.add("done");
    } else {
      step.classList.remove("done");
    }
    updateProgress();
  });
});

function updateProgress(){
  const total = steps.length;
  completed = document.querySelectorAll(".stepCheck:checked").length;
  const percent = (completed/total)*100;
  progressFill.style.width = percent + "%";
  progressText.textContent = `${completed}/13 Completed`;
}
