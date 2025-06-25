// Getting data
let eggData;
fetch("./assets/files/egg.json")
    .then(response => response.json())
    .then(data => eggData = data);

// Variables
let dashArray = [];
let eggActive = false;
let lettersFound = 0;
const eggElements = 6;
const eggStartDelay = 5000;
const headshotEl = document.getElementById("headshot");
const eggContainerEl = document.getElementById("egg-container");
let eggLettersArray = document.getElementsByClassName("for-egg");

// Easter Egg Implementation
function flipDash() {
    dashArray[lettersFound].innerText = " ? ";
}

function eggIsDone() {
    if (lettersFound === eggElements) {
        for (const element of eggLettersArray) {
            element.classList.remove("text-pulse");
            element.classList.add("glow");
        }
        eeLink = document.createElement("a");
        eeLink.href = "https://www.youtube.com/watch?v=X0IPjZDoB9U";
        eeLink.target = "_blank";
        eeButton = document.createElement("button");
        eeButton.type = "button";
        eeButton.id = "ee-button";
        eeButton.classList.add("fade-in");
        eeButton.innerText = "Claim Reward";
        eeLink.appendChild(eeButton)
        eggContainerEl.appendChild(eeLink);
        eeButton.addEventListener("click", () => {
            for (const element of eggLettersArray) {
                element.classList.remove("glow");
            }
            for (let i = 0; i < dashArray.length; i++) {
                dashArray[i].innerText = ` ${eggData.finalText[i]} `
            }
        })
    }
}

setTimeout(() => {
    headshotEl.style.cursor = "pointer";
    headshotEl.classList.add("pulse");
}, eggStartDelay)

headshotEl.addEventListener("click", () => {
    if (!eggActive) {
        eggActive = true;
        eggContainerEl.style.border = "#ffe4c4 1px solid";
        headshotEl.classList.remove("pulse");
        for (const element of eggLettersArray) {
            element.style.cursor = "pointer";
            element.addEventListener("click", () => {
                if (!element.classList.contains("clicked")) {
                    element.classList.add("clicked", "text-pulse");
                    flipDash();
                    lettersFound++;
                    eggIsDone();
                } else {
                    alert("Letter already found!")
                }
            });
        }

        const eggTitle = document.createElement("h3");
        eggTitle.id = "ee-title";
        eggTitle.innerText = eggData.title;
        eggContainerEl.appendChild(eggTitle);

        const eggBody = document.createElement("p");
        eggBody.id = "ee-body";
        eggBody.innerText = eggData.instructions;
        eggContainerEl.appendChild(eggBody);

        const eggDashes = document.createElement("div");
        eggDashes.id = "ee-dash-container";
        for (let i = 0; i < eggElements; i++) {
            let dash = document.createElement("span");
            dash.id = "dash";
            dash.innerText = " _ ";
            dashArray.push(dash);
            eggDashes.appendChild(dash);
        }
        eggContainerEl.appendChild(eggDashes);

        eggContainerEl.classList.add("fade-in");
    }
})