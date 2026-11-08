// Shared navigation. It works independently of optional maps and carousels.
(() => {
  const header = document.querySelector(".jj-classic-nav");
  if (!header) return;

  const toggle = header.querySelector(".toggle");
  const navigation = header.querySelector(".nav");
  const top = header.querySelector(".top");
  if (!toggle || !navigation) return;
  document.documentElement.classList.add("jj-js");
  header.classList.add("is-enhanced");

  const mobile = window.matchMedia("(max-width: 1000px)");
  const groups = [...navigation.querySelectorAll("details")];

  const closeGroups = () => groups.forEach((group) => { group.open = false; });
  const setMenuOpen = (open) => {
    if (!open) {
      // Move focus before hiding the panel, including after Escape or an outside click.
      if (mobile.matches && navigation.contains(document.activeElement)) toggle.focus();
      closeGroups();
    }
    navigation.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!navigation.classList.contains("open"));
  });

  groups.forEach((group) => {
    group.addEventListener("toggle", () => {
      if (group.open) groups.forEach((other) => { if (other !== group) other.open = false; });
    });
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenuOpen(false);
    else if (!event.target.closest("details")) closeGroups();
  });

  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) {
      if (mobile.matches) setMenuOpen(false);
      else closeGroups();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openGroup = groups.find((group) => group.open);
    if (openGroup) {
      closeGroups();
      openGroup.querySelector("summary")?.focus();
      event.preventDefault();
    } else if (navigation.classList.contains("open")) {
      setMenuOpen(false);
      toggle.focus();
      event.preventDefault();
    }
  });

  const normalizePath = (path) => path.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
  const currentPath = normalizePath(window.location.pathname);
  header.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.href, window.location.href);
    const current = url.origin === window.location.origin && normalizePath(url.pathname) === currentPath;
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  groups.forEach((group) => {
    group.querySelector("summary")?.classList.toggle("has-current-page", Boolean(group.querySelector('[aria-current="page"]')));
  });

  const updateHeaderHeight = () => {
    if (!top) return;
    const style = getComputedStyle(top);
    const rowItems = [...top.children].filter((child) => !mobile.matches || child !== navigation);
    const rowHeight = Math.max(0, ...rowItems.map((child) => child.getBoundingClientRect().height));
    const height = rowHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const root = document.documentElement;
    const currentHeight = parseFloat(getComputedStyle(root).getPropertyValue("--jj-header-height"));
    if (height > 0 && (!Number.isFinite(currentHeight) || Math.abs(height - currentHeight) > 0.5)) {
      root.style.setProperty("--jj-header-height", `${Math.ceil(height)}px`);
    }
  };

  mobile.addEventListener("change", () => {
    const focused = document.activeElement;
    setMenuOpen(false);
    // A hidden hamburger must not retain focus when returning to desktop.
    if (!mobile.matches && focused === toggle) header.querySelector(".brand")?.focus();
    updateHeaderHeight();
  });
  if (top && "ResizeObserver" in window) new ResizeObserver(updateHeaderHeight).observe(top);
  window.addEventListener("resize", updateHeaderHeight, { passive: true });
  updateHeaderHeight();
})();

//javascript for scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");

if (scrollBtn) {
  const updateScrollButton = () => scrollBtn.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", updateScrollButton, { passive: true });
  updateScrollButton();

  //javascript for scroll back to top on on click scroll-to-top button
  scrollBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// Start revealing content just before it reaches the viewport.
const revealAhead = 200;
window.addEventListener("scroll", reveal, { passive: true });
window.addEventListener("resize", reveal);
window.addEventListener("load", reveal, { once: true });
reveal();

function reveal() {
  const reveals = document.querySelectorAll(".reveal:not(.active)");
  const revealLimit = window.innerHeight + revealAhead;

  for (const element of reveals) {
    if (element.getBoundingClientRect().top < revealLimit) {
      element.classList.add("active");
    }
  }
}

function initParadoxWay() {
  if (document.querySelector(".testimonials-carousel") && typeof window.Swiper === "function") {
    var j2 = new Swiper(".testimonials-carousel .swiper-container", {
      preloadImages: false,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      mousewheel: false,
      centeredSlides: true,
      pagination: {
        el: ".tc-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".listing-carousel-button-next",
        prevEl: ".listing-carousel-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}

//   Init All ------------------
// Deferred Swiper loads after this script and before DOMContentLoaded.
if (document.readyState !== "complete") {
  document.addEventListener("DOMContentLoaded", initParadoxWay, { once: true });
} else {
  initParadoxWay();
}
