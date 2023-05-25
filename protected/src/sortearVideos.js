const yellow = "https://youtu.be/dQw4w9WgXcQ"
const elaMuito = "https://youtu.be/dQw4w9WgXcQ"

function sortearVideo() {
    const randomNumber = Math.random() * 2
    if (randomNumber < 1) {
        return elaMuito
    } else {
        return yellow
    }
}

window.addEventListener("load", function() {
    const assistir = document.getElementById("assistir")
    assistir.href = sortearVideo()
    
});
