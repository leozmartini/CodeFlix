function copy() {
    navigator.clipboard.writeText("(x^(2)+y^(2)-1)^(3) =x^(2)y^(3)").then(() => {
        alert("Copiado! \n(x^(2)+y^(2)-1)^(3) =x^(2)y^(3)")
    }).then(() => {
        // redirecionar
        window.open("https://www.geogebra.org/calculator", "_blank");
    })
}