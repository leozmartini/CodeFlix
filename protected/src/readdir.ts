const fs = require('fs')

const path = './protected/images/timeline'

async function readdir() {

fs.readdir(path, (err: any, arquivos: any) => {
    const fotos = []
    // cria uma array com o caminho de todas fotos em /protected/images/timeline
    for (let i = 0; i < arquivos.length; i++) {
        fotos.push(`/protected/images/timeline/${arquivos[i]}`);
    }

    console.log(fotos)
    return fotos

});


}

const fotos = readdir()


export { readdir, fotos }

