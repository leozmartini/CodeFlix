let fotos = [
    "/imagens/timeline/um.jpg",
    "/imagens/timeline/dois.jpg",
    "/imagens/timeline/tres.jpg",
    "/imagens/timeline/quatro.jpg",
    "/imagens/timeline/cinco.jpg",
    "/imagens/timeline/seis.jpg",
    "/imagens/timeline/sete.jpg",
    "/imagens/timeline/oito.jpg",
    "/imagens/timeline/nove.jpg",
]

let fotosEscolhidas = []

    function sortearFoto() {

        let numeroSorteado = Math.floor(Math.random() * fotos.length);

        while (fotosEscolhidas.includes(numeroSorteado)) {
            numeroSorteado = Math.floor(Math.random() * fotos.length);
        }

        fotosEscolhidas.push(numeroSorteado)
        return fotos[numeroSorteado];   
    }


window.addEventListener("load", function() {
    const a1 = document.getElementById("a1")
    const a2 = document.getElementById("a2")
    const b1 = document.getElementById("b1")
    const b2 = document.getElementById("b2")

    a1.src = sortearFoto()
    a2.src = sortearFoto()
    b1.src = sortearFoto()
    b2.src = sortearFoto()
});
