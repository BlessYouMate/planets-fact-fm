/*
* elements
*/

const elements = {
    navBtn: document.querySelector(".header__hamburger"),
    nav: document.querySelector(".header__nav"),
    body: document.querySelector("body"),
    img: document.querySelector(".main__planet-image"),
    geoImg: document.querySelector(".main__planet-geology-image"),
    name: document.querySelector(".planet-info__name"),
    desc: document.querySelector(".planet-info__desc"),
    source: document.querySelector(".planet-info__link"),
    stats: {
        rotation: document.querySelector(".rotation-value"),
        revolution: document.querySelector(".revolution-value"),
        radius: document.querySelector(".radius-value"),
        temp: document.querySelector(".temperature-value"),
    },
    tabs: document.querySelectorAll(".main__button"),
};

/*
* app state
*/

let appState = {
    data: [], // from JSON
    currentPlanet: "",
    currentView: "overview",
};

/*
* view config
*/

const viewConfig = {
    overview: {
        contentKey: "overview",
        imageKey: "planet",
        showGeology: false,
    },
    structure: {
        contentKey: "structure",
        imageKey: "internal",
        showGeology: false,
    },
    geology: {
        contentKey: "geology",
        imageKey: "planet",
        showGeology: true,
    },
}

/*
* colors
*/

const colors = {
    mercury: "hsl(194, 48%, 50%)",
    venus: "hsl(39, 88%, 73%)",
    earth: "hsl(238, 99%, 66%)",
    mars: "hsl(12, 100%, 64%)",
    jupiter: "hsl(27, 75%, 70%)",
    saturn: "hsl(40, 96%, 70%)",
    uranus: "hsl(168, 82%, 67%)",
    neptune: "hsl(222, 87%, 56%)",
}

/*
* functions
*/

function initApp(data){
    appState.data = data;
    handleHashChange();

    /*
    * events
    */
    window.addEventListener("hashchange", handleHashChange)
    

    elements.navBtn.addEventListener("click", toggleMobileNav);

    elements.tabs.forEach(btn => {
        btn.addEventListener("click", (e) => {
            setView(e.currentTarget.value);
        });
    });

}

function handleHashChange(){
    const hash = window.location.hash.slice(1).toLowerCase();
    const planetExists = appState.data.some(p => p.name.toLowerCase() === hash);
    appState.currentPlanet = planetExists ? hash : "mercury";

    appState.currentView = "overview";

    render();
}


function setView(newView){
    appState.currentView = newView;
    render();
}

function toggleMobileNav(){
    elements.nav.classList.toggle("nav-expanded");
    const isOpen = elements.nav.classList.contains("nav-expanded");
    elements.body.style.overflow = isOpen ? "hidden" : "auto";
}

function render(){
    const planetData = appState.data.find(p => p.name.toLowerCase() === appState.currentPlanet);
    if(!planetData) return;

    // set accent color
    const color = colors[appState.currentPlanet.toLowerCase()];
    elements.body.style.setProperty("--color-accent", color);

    // get config
    const config = viewConfig[appState.currentView];
    const contentData = planetData[config.contentKey];

    // set texts
    elements.name.innerText = planetData.name;
    elements.desc.innerText = contentData.content;
    elements.source.href = contentData.source;

    // set statistics
    elements.stats.rotation.innerText = planetData.rotation;
    elements.stats.revolution.innerText = planetData.revolution;
    elements.stats.radius.innerText = planetData.radius;
    elements.stats.temp.innerText = planetData.temperature;

    // set images
    elements.img.src = planetData.images[config.imageKey];

    // geollogy setting
    if(config.showGeology){
        elements.geoImg.src = planetData.images.geology;
        elements.geoImg.style.display = "block";
    }
    else{
        elements.geoImg.style.display = "none";
    }

    elements.tabs.forEach((btn) =>{
        if(btn.value === appState.currentView){
            btn.classList.add("highlight");
        }
        else{
            btn.classList.remove("highlight");
        }
    });

    if(elements.nav.classList.contains("nav-expanded")){
        toggleMobileNav();
    };

}

/*
* main
*/

fetch("./public/data/data.json")
    .then(response => response.json())
    .then(data => {
        initApp(data);
    })
    .catch(err => console.error("Error while fetching data: ", err));





