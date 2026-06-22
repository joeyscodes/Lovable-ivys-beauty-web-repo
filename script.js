/* ============================================================
   Ivy's Beauty Secret — shared interactions
   - sticky navbar styling on scroll
   - mobile drawer menu
   - scroll reveal animations
   - ambient sparkle field (falling petals + gold glitter)
   - lucide icons
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Lucide icons ---- */
  if (window.lucide) window.lucide.createIcons();

  /* ---- Sticky navbar ---- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile drawer ---- */
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".drawer-overlay");
  const setDrawer = (open) => {
    if (!drawer || !overlay) return;
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  openBtn && openBtn.addEventListener("click", () => setDrawer(true));
  closeBtn && closeBtn.addEventListener("click", () => setDrawer(false));
  overlay && overlay.addEventListener("click", () => setDrawer(false));
  document.querySelectorAll(".drawer-links a").forEach((a) =>
    a.addEventListener("click", () => setDrawer(false))
  );

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute("data-delay") || 0;
            setTimeout(() => el.classList.add("visible"), Number(delay));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Ambient sparkle field ---- */
  buildSparkleField(14, 26);
});

function buildSparkleField(petals, glitters) {
  const field = document.querySelector(".sparkle-field");
  if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < petals; i++) {
    const left = Math.round((i * 89 + 7) % 100);
    const size = 10 + ((i * 7) % 14);
    const delay = (i * 1.9) % 16;
    const duration = 13 + ((i * 5) % 12);
    const sway = (i % 2 === 0 ? 1 : -1) * (24 + ((i * 11) % 60));
    const spin = 180 + ((i * 53) % 360);
    const opacity = 0.55 + ((i * 13) % 30) / 100;

    const el = document.createElement("span");
    el.className = "petal";
    el.style.left = left + "%";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.animationDelay = delay + "s";
    el.style.animationDuration = duration + "s";
    el.style.setProperty("--o", opacity);
    el.style.setProperty("--sway", sway + "px");
    el.style.setProperty("--spin", spin + "deg");
    field.appendChild(el);
  }

  for (let i = 0; i < glitters; i++) {
    const left = Math.round((i * 67 + 23) % 100);
    const top = (i * 53 + 11) % 100;
    const size = 7 + ((i * 5) % 9);
    const delay = (i * 1.1) % 9;
    const duration = 3.5 + ((i * 7) % 40) / 10;

    const el = document.createElement("span");
    el.className = "glitter";
    el.style.left = left + "%";
    el.style.top = top + "%";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.animationDelay = delay + "s";
    el.style.animationDuration = duration + "s";
    el.style.setProperty("--gx", (((i * 23) % 24) - 12) + "px");
    el.style.setProperty("--gy", (((i * 17) % 30) - 15) + "px");
    field.appendChild(el);
  }
}
