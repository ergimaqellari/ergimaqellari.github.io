const honeycombEl = document.getElementById("honeycomb")
const combHeight = 40
const combWidth = 48
const hexCountY = Math.ceil(honeycombEl.clientHeight / combHeight) + 1
const hexCountX = Math.ceil(honeycombEl.clientWidth / combWidth) + 1

function backgroundHoneycombs() {
    for (let i = 0; i < hexCountY; i++) {
        for (let j = 0; j < hexCountX; j++) {
            const hexagon = document.createElement("div")
            hexagon.style = `
            background: url(assets/images/Hexagon.png) no-repeat;
            background-size: contain;
            width: 100px;
            height: 70px;
            position: absolute;
            top: ${i * 40}px;
            left: ${j * 48 + ((i * 24) % 48)}px; 
            `
            honeycombEl.appendChild(hexagon)
        }
    }
}

backgroundHoneycombs()
window.addEventListener("resize", backgroundHoneycombs)