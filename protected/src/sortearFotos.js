const fotos = '/array'


    const fotosEscolhidas = []
    function sortearFoto() {
        let numeroSorteado = Math.floor(Math.random() * fotos.length);

        while (fotosEscolhidas.includes(numeroSorteado)) {
            numeroSorteado = Math.floor(Math.random() * fotos.length);
        }

        fotosEscolhidas.push(numeroSorteado)
        return fotos[numeroSorteado];
    }
    console.log(fotos)
    console.log(fotosEscolhidas)

    window.addEventListener("load", function () {
        const a1 = document.getElementById("a1")
        const a2 = document.getElementById("a2")
        const b1 = document.getElementById("b1")
        const b2 = document.getElementById("b2")

        a1.src = sortearFoto()
        a2.src = sortearFoto()
        b1.src = sortearFoto()
        b2.src = sortearFoto()
    });

