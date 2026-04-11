(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".nav-mobile");
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      const open = document.body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.body.classList.remove("menu-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
    });
  });

  var y = 0;
  window.addEventListener(
    "scroll",
    function () {
      const ny = window.scrollY || 0;
      if (header && Math.abs(ny - y) > 8) {
        if (ny > 48) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
        y = ny;
      }
    },
    { passive: true }
  );
})();
