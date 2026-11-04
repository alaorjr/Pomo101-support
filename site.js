const captions = {
  foco: "Foco · 25 min por padrão",
  pausa: "Pausa · 5 min por padrão",
  longa: "Pausa longa · 15 min por padrão",
  timer: "Timer · funciona sem conta",
  historico: "Histórico · sessões neste iPhone",
  ajustes: "Ajustes · preferências neste iPhone",
};

for (const preview of document.querySelectorAll("[data-preview]")) {
  const controls = preview.querySelector(".preview-controls");
  const buttons = [...controls.querySelectorAll("button")];
  const caption = preview.querySelector("figcaption");

  controls.addEventListener("click", (event) => {
    const selected = event.target.closest("button");
    if (!selected) return;

    for (const button of buttons) {
      const active = button === selected;
      const screen = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-pressed", String(active));
      screen.classList.toggle("is-current", active);
      screen.setAttribute("aria-hidden", String(!active));
      if (active) caption.textContent = captions[screen.id];
    }
  });

  controls.hidden = false;
}

if ("IntersectionObserver" in window && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      const parts = [...target.querySelectorAll("[data-reveal]:not([hidden])")];
      parts.forEach((part, index) => {
        part.style.setProperty("--reveal-delay", `${index * 70}ms`);
        part.classList.add("reveal");
      });
      observer.unobserve(target);
    }
  });

  for (const group of document.querySelectorAll(".hero, .preview, .article section, .reference, .site-footer")) {
    observer.observe(group);
  }
}
