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

// let fotos = [
//     "/imagens/we/feito/1.png",
//     "/imagens/we/feito/2.png",
//     "/imagens/we/feito/3.png",
//     "/imagens/we/feito/4.png",
//     "/imagens/we/feito/5.png",
//     "/imagens/we/feito/6.png",
//     "/imagens/we/feito/7.png",
//     "/imagens/we/feito/8.png",
//     "/imagens/we/feito/9.png",
//     "/imagens/we/feito/10.png",
//     "/imagens/we/feito/11.png",
//     "/imagens/we/feito/12.png",
//     "/imagens/we/feito/13.png",
//     "/imagens/we/feito/14.png",
//     "/imagens/we/feito/15.png",
//     "/imagens/we/feito/16.png",
//     "/imagens/we/feito/17.png",
//     "/imagens/we/feito/18.png",
//     "/imagens/we/feito/19.png",
//     "/imagens/we/feito/20.png",
//     "/imagens/we/feito/21.png",
//     "/imagens/we/feito/22.png",
//     "/imagens/we/feito/23.png",
//     "/imagens/we/feito/24.png",
//     "/imagens/we/feito/25.png",
//     "/imagens/we/feito/26.png",
// ]

// Seria eficaz nessa parte usar as bibliotecas fs e path, do node.js, pra conseguir listar todas as imagens automaticamente
//  e quando fosse adicionada mais um imagem, ou removida, automaticamente seria alterada a array acima.

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
