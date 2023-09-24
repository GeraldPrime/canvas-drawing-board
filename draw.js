const drawBtn = document.querySelector("#draw")
const eraseBtn = document.querySelector("#erase")
const rangeInput = document.querySelector("input")
const colorInput = document.getElementById("color")
const screen = document.querySelector("#screen")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")


canvas.width = window.innerWidth
canvas.height = window.innerHeight

// STATES
let isActive = false
let isDrawing = false
let isErasing = false
let size = +rangeInput.value

let x
let y



canvas.addEventListener("pointerdown", (e) => {
    isActive = true
    // let x, y = e
    x = e.offsetX
    y = e.offsetY
    console.log(isActive, x, y)
})
colorInput.addEventListener("change", (e) => {
    if (e.target.id === 'color') {
        color = e.target.value
    }
    console.log(color)
    return color
})




//  FUNCTIONS
// const updateState = (state = "") =>{
//     isDrawing = state.toLowerCase() === "draw" ? true : false
//     isErasing = state.toLowerCase() === "erase" ? true : false
// }
const updateDrawing = (state = true) => {
    if (state) {
        isDrawing = true
        isErasing = false
        return
    }

    isDrawing = false
    isErasing = true
}
function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x, y, x1, y1) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x1, y1)
    ctx.lineWidth = size * 2
    ctx.strokeStyle = color
    ctx.stroke()

}

// EVENTS

drawBtn.addEventListener("click", () => {
    drawBtn.classList.toggle("active")
    eraseBtn.className = ""
    updateDrawing()
})

eraseBtn.addEventListener("click", () => {
    eraseBtn.classList.toggle("active")
    drawBtn.className = ""
    updateDrawing(false)
})

rangeInput.addEventListener("input", () => { //this is used to increse the size of the pencil.
    screen.innerHTML = rangeInput.value
    size = rangeInput.value
    screen.innerHTML = `${size}%`
})


canvas.addEventListener("pointerup", () => {
    isActive = false
})
canvas.addEventListener("pointermove", (e) => {
    const x1 = e.offsetX
    const y1 = e.offsetY

    if (!isActive) return


    if (isDrawing) {
        drawCircle(x, y)
        drawLine(x, y, x1, y1, size * 2)
        x = x1
        y = y1
    }


    if (isErasing) {
        const { x, y } = e

        ctx.clearRect(x, y, size, size)
    }
})
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

// // Add a single event listener for both pointerdown and touchstart
// canvas.addEventListener("pointerdown", handlePointerOrTouch);

// // Event handling function
// function handlePointerOrTouch(e) {
//     isActive = true;

//     // Check if it's a touch event (e.pointerType === "touch")
//     if (e.pointerType === "touch") {
//         // Handle touch event
//         const touch = e.touches[0];
//         x = touch.clientX - canvas.getBoundingClientRect().left;
//         y = touch.clientY - canvas.getBoundingClientRect().top;
//     } else {
//         // Handle mouse event
//         x = e.offsetX;
//         y = e.offsetY;
//     }

//     console.log(isActive, x, y);
// }

// // Other event listeners and functions...
