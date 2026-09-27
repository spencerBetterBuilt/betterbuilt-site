document.documentElement.classList.remove("no-js");

// Header border on scroll
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Full-screen menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
  }
  if (menu) menu.setAttribute("aria-hidden", String(!open));
}
if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
}

// Marquee: the markup holds one copy of each list (so crawlers read it once);
// clone it three more times so the -50% loop is seamless
document.querySelectorAll(".marquee-track").forEach((track) => {
  const items = [...track.children];
  for (let i = 0; i < 3; i++) {
    items.forEach((el) => {
      const copy = el.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
  }
});

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item, _, all) => {
  const q = item.querySelector(".faq-q");
  q.addEventListener("click", () => {
    const open = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((f) => {
      f.classList.remove("active");
      f.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });
    if (!open) {
      item.classList.add("active");
      q.setAttribute("aria-expanded", "true");
    }
  });
});

// Pillars: tap to open on touch devices
document.querySelectorAll(".pillar").forEach((p) => {
  p.addEventListener("click", () => {
    p.parentElement.querySelectorAll(".pillar").forEach((o) => o !== p && o.classList.remove("is-open"));
    p.classList.toggle("is-open");
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// Floating CTA: hide while the contact section is on screen
const floatCta = document.querySelector(".float-cta");
const contact = document.getElementById("contact");
if (floatCta && contact && "IntersectionObserver" in window) {
  new IntersectionObserver(
    ([e]) => floatCta.classList.toggle("is-hidden", e.isIntersecting),
    { threshold: 0.05 }
  ).observe(contact);
}
