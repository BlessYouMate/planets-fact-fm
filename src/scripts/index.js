let navBtn = document.querySelector(".header__hamburger");
let nav = document.querySelector(".header__nav");
function handleNav(){
    nav.classList.toggle("nav-expanded");
}

navBtn.addEventListener("click", handleNav);