const closeButton = document.querySelector(".nav-close");
const openButton = document.querySelector(".nav-open");
const nav = document.querySelector(".nav");

// Function to open the navigation menu
function openNav() {
  nav.classList.add("navigation-open");
  document.body.classList.add("nav-opened");
  openButton.setAttribute("aria-expanded", "true");
  nav.setAttribute("aria-hidden", "false");
}

// Function to close the navigation menu
function closeNav() {
  nav.classList.remove("navigation-open");
  document.body.classList.remove("nav-opened");
  openButton.setAttribute("aria-expanded", "false"); // Set aria-expanded to false
  nav.setAttribute("aria-hidden", "true"); // Set aria-hidden to true
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
