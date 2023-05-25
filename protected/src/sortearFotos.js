let fotos = [
    "../imagens/timeline/2.png",
    "../imagens/timeline/3.png",
    "../imagens/timeline/4.png",
    "../imagens/timeline/5.png",
    "../imagens/timeline/6.png",
    "../imagens/timeline/7.png",
    "../imagens/timeline/8.png",
    "../imagens/timeline/9.png",
    "../imagens/timeline/10.png",
    "../imagens/timeline/11.png",
    "../imagens/timeline/12.png",
    "../imagens/timeline/13.png",
    "../imagens/timeline/14.png",
    "../imagens/timeline/15.png",
    "../imagens/timeline/16.png",
    "../imagens/timeline/17.png",
    "../imagens/timeline/18.png",
    "../imagens/timeline/19.png",
    "../imagens/timeline/20.png",
    "../imagens/timeline/21.png",
    "../imagens/timeline/22.png",
    "../imagens/timeline/23.png",
    "../imagens/timeline/24.png",
    "../imagens/timeline/25.png",
    "../imagens/timeline/26.png",
    "../imagens/timeline/27.png",
    "../imagens/timeline/28.png",

]

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
