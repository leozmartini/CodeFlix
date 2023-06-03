const fotos = []
const fotosEscolhidas = []

fetch('../scripts/array')
    .then(response => response.json())
    .then(async imageName => {
        for (let i = 0; i < imageName.length; i++) {
            fotos.push(`../files/protected/images/timeline/${imageName[i]}`)
        }
        const a1 = document.getElementById("a1")
        const a2 = document.getElementById("a2")
        const b1 = document.getElementById("b1")
        const b2 = document.getElementById("b2")
        a1.src = await sortearFoto()
        a2.src = await sortearFoto()
        b1.src = await sortearFoto()
        b2.src = await sortearFoto()
    })
    .catch(error => {
        console.error(`Erro no fetch: ${error}`);
    });

function sortearFoto() {
    let numeroSorteado = Math.floor(Math.random() * fotos.length);

    while (fotosEscolhidas.includes(numeroSorteado)) {
        numeroSorteado = Math.floor(Math.random() * fotos.length);
    }

    fotosEscolhidas.push(numeroSorteado)
    return fotos[numeroSorteado];
}

window.addEventListener("load", function() {
    const gif = document.getElementById("gif");
    gif.style.backgroundImage = `url(/files/protected/images/users/user/gif.gif)`;

    const icon = document.getElementById("icon");
    icon.style.backgroundImage = `url(/files/protected/images/users/user/user.jpeg)`;
});