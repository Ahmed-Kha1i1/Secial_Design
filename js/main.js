
//settings
document.querySelector(".settings .gear i").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings").classList.toggle("open");
}
//restore main color
let colors = document.querySelectorAll(".settings .color-options li");
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
    colors.forEach((color) => {
        if (color.dataset.color === mainColor) {
            color.classList.add("active");
            document.documentElement.style.setProperty("--main-color", mainColor);
        }
        else {
            color.classList.remove("active");
        }
    })
}
//change main color
colors.forEach((color) => {
    color.addEventListener('click', function () {
        removeActive(color);

        document.documentElement.style.setProperty("--main-color", this.dataset.color);
        localStorage.setItem("color-option", this.dataset.color);
    })
    
}) 

//restore change Background 
let backgroundLi = document.querySelectorAll(".settings .change-background span");
let backgroundOption = localStorage.getItem("background-option");

let changeBackground = true;
let changeImages;
if (backgroundOption !== null) {
    backgroundLi.forEach((ele) => {
        if (ele.dataset.change === backgroundOption) {
            ele.classList.add("active");
        }
        else {
            ele.classList.remove("active");
        }
    })
    if (backgroundOption === "true") {
        changeBackground = true;
        runBackground();
    }
    else {
        changeBackground = false;
    }
}
//change background
backgroundLi.forEach((choose) => {

    choose.addEventListener('click', function () {
        removeActive(choose);

        if (this.dataset.change == "true") {
            changeBackground = true;
            runBackground();
        }
        else {
            changeBackground = false;
            clearInterval(changeImages);
        }

        localStorage.setItem("background-option", this.dataset.change);
    })

}) 

//bullets
let bullotschooses = document.querySelectorAll(".settings .show-bullots span");
let bullotsContainer = document.querySelector(".bullets-container");
let bullotOption = localStorage.getItem('bullets-option');
if (bullotOption != null) {
    bullotschooses.forEach((ele) => {
        if (ele.dataset.change === bullotOption) {
            ele.classList.add("active");
        }
        else {
            ele.classList.remove("active");
        }
    })

    if (bullotOption === "true") {
        bullotsContainer.style.display = "block";
    }
    else {
        bullotsContainer.style.display = "none";
    };
}
bullotschooses.forEach((choose) => {
    choose.addEventListener('click', function () {
        removeActive(choose);


        if (this.dataset.change == "true") {
            bullotsContainer.style.display = "block";
        }
        else {
            bullotsContainer.style.display = "none";
        }

        localStorage.setItem("bullets-option", this.dataset.change);
    })
})

//reseat 
let reseat = document.querySelector(".settings .reset");
reseat.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})
//landing
let landingPage = document.querySelector(".landing");
let images = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]
let currentImage = 0;

function runBackground() {
    if (changeBackground) {
        changeImages = setInterval(() => {
            currentImage++;
            if (currentImage === images.length) {
                currentImage = 0;
            }
            landingPage.style.backgroundImage = `url("images/${images[currentImage]}")`;

        }, 1000)
    }
}

//about 
let aboutTitles = document.querySelectorAll(".about ul li");
let imagesContainer = document.querySelector(".about .images-container");
let aboutDescripption = document.querySelector(".about .descripption");
let curruntTitle = aboutTitles.item(0);
let aboutImages = [
    "8ef4d993-9280-456d-a198-2921017ff37f.png",
    "22e3ceb2-743a-4641-8335-9badca5e5009.png",
    "90da3426-d82d-4535-846c-3523805ecb60.png",
    "543e1ad9-e9ba-4096-a4dc-9603422d9d48.png"
]
let aboutDescripptions = [
    "Easily update your diagrams as your processes change. Use intuitive drag-and-drop features to quickly map out your business processes to identify inefficiencies so you can start driving needed improvement.",
    "Gather multiple perspectives on your flow so you can make the best decisions for your users. Visualize your current and future state so your team can quickly align on the best path to move forward.",
    "Understand how your plans impact your existing infrastructure. Embed cloud architecture diagrams in Confluence as a reference for your teams. Link shapes with data and apply conditional formatting rules to see disruptions or get insights in real time.",
    "Align scrum teams with your business strategy. Organize teams by skill sets, location, and key competencies to assign people where they will make the biggest impact."
]
let move = 0;
aboutTitles.forEach((ele, index) => {
    ele.addEventListener("click", () => {
        curruntTitle.classList.remove("active");
        ele.classList.add("active");
        curruntTitle = ele;

        imagesContainer.classList.remove("move" + move)
        move = index;
        if (index > 0) {
            imagesContainer.classList.add("move" + index)
        }

        aboutDescripption.textContent = aboutDescripptions[index];
    })
})

//popup
let diagrames = document.querySelectorAll(".about .images-container img");
diagrames.forEach((ele) => {
    ele.addEventListener("click", () => {
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        overlay.appendChild(popupBox);

        let popupImg = document.createElement("img");
        popupImg.className = "popup-img";
        popupBox.appendChild(popupImg);
        popupImg.src = ele.src;

        let popupParag = document.createElement("p");
        popupParag.className = "popup-parag";
        popupParag.textContent = aboutDescripption.textContent;
        popupBox.appendChild(popupParag);

        let popupSpan = document.createElement("span");
        popupSpan.className = "popup-close";
        popupSpan.textContent = "X";
        popupBox.appendChild(popupSpan);
    })

});

document.addEventListener("click", (event) => {

    if (event.target.className === "popup-close" || event.target.className === "overlay") {
        document.querySelector(".overlay").remove();
    }
});


let allBullets = document.querySelectorAll(".bullets-container .bullet");
allBullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        
        document.querySelector(bullet.dataset.disblay).scrollIntoView({
            behavior: "smooth"
        })
    })
    
})

function removeActive(ele) {
    ele.parentElement.querySelectorAll(".active").forEach((ele) => {
        ele.classList.remove("active");
    });

    ele.classList.add("active");
};

//setting bars
let bar = document.querySelector("header .miscellaneous .bars");
let links = document.querySelectorAll("header .links li .link-cont");
let linksCont = document.querySelector("header  .links");
let currentLink = null;

links.forEach((ele) => {
    ele.addEventListener("click", () => {
        if (linksCont.classList.contains("opened")) {
            if (currentLink === ele) {
                ele.classList.remove("opened");
                currentLink = null;
            }
            else {
                if (currentLink != null) {
                    currentLink.classList.remove("opened");
                }
                ele.classList.add("opened");
                currentLink = ele;
            }
            
        }
        
    })
})


bar.addEventListener("click", () => {

    bar.classList.toggle("opened")
    linksCont.classList.toggle("opened")
    if (currentLink != null) {
        currentLink.classList.remove("opened");
    }
});

window.onresize = () => {
    if (innerWidth >= 1200) {
        linksCont.classList.remove("opened");
        bar.classList.remove("opened");
        if (currentLink != null) {
            currentLink.classList.remove("opened");
        }
    }
}