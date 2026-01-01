let navBtn = document.querySelector(".header__hamburger");
let nav = document.querySelector(".header__nav");
let body = document.querySelector("body");
function handleNav(){
    nav.classList.toggle("nav-expanded");
}

navBtn.addEventListener("click", handleNav);