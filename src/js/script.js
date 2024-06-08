document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector(".nav-close");
  const openButton = document.querySelector(".nav-open");
  const nav = document.querySelector(".nav");
  const largeScreen = 64;

  // Check if it's mobile view
  if (window.matchMedia(`(max-width: ${largeScreen}rem)`).matches) {
    // Disable focus for each focusable child when the page loads
    nav.querySelectorAll("a, button").forEach(function (el) {
      el.setAttribute("tabindex", "-1");
    });
  }

  // Function to open the navigation menu
  function openNav() {
    nav.classList.add("navigation-open");
    document.body.classList.add("nav-opened");
    openButton.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");

    // Enable focus for each focusable child
    nav.querySelectorAll("a, button").forEach(function (item) {
      item.removeAttribute("tabindex");
    });

    // Focus the first focusable element inside the nav
    nav.querySelector("a, button").focus();

    // Add keydown event listener to trap focus inside nav
    nav.addEventListener("keydown", trapFocusInsideNav);
  }

  // Function to close the navigation menu
  function closeNav() {
    nav.classList.remove("navigation-open");
    document.body.classList.remove("nav-opened");
    openButton.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");

    // Disable focus for each focusable child
    nav.querySelectorAll("a, button").forEach(function (item) {
      item.setAttribute("tabindex", "-1");
    });

    // Focus back on the hamburger icon
    openButton.focus();
  }

  // Function to trap focus inside nav
  function trapFocusInsideNav(event) {
    const focusableEls = nav.querySelectorAll("a, button");
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          /* shift + tab */
          lastFocusableEl.focus();
          event.preventDefault();
        }
      } else {
        /* tab */
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          event.preventDefault();
        }
      }
    }

    // Close nav when escape is pressed
    if (event.key === "Escape") {
      closeNav();
    }
  }

  closeButton.addEventListener("click", closeNav);

  openButton.addEventListener("click", (event) => {
    openNav();
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    const isClickInsideNav = nav.contains(event.target);
    const isNavOpen = nav.classList.contains("navigation-open");

    if (!isClickInsideNav && isNavOpen) {
      closeNav();
    }
  });
});
