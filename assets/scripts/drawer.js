//Toggles the footer drawer
function toggleDrawer() {
    let slideUp = document.querySelector("footer"),
        chevronUp = document.querySelector(".bi-chevron-up"),
        chevronDown = document.querySelector(".bi-chevron-down");

    slideUp.classList.toggle("mySlideUp");
    chevronUp.classList.toggle("hide");
    chevronDown.classList.toggle("hide");
}