const closeButton = document.querySelector(".nav-close");
const openButton = document.querySelector(".nav-open");
const nav = document.querySelector(".nav");

// Function to open the navigation menu
function openNav() {
  nav.classList.add("navigation-open");
  nav.classList.remove("visibility-hidden");
  document.body.classList.add("nav-opened");
  openButton.setAttribute("aria-expanded", "true");
  nav.setAttribute("aria-hidden", "false");

  // Focus the first focusable element inside the nav
  nav.querySelector("a, button").focus();
}

// Function to close the navigation menu
function closeNav() {
  nav.classList.remove("navigation-open");
  nav.classList.add("visibility-hidden");
  document.body.classList.remove("nav-opened");
  openButton.setAttribute("aria-expanded", "false");
  nav.setAttribute("aria-hidden", "true");
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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeNav();
  }
});
