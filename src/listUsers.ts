const fs = require('fs/promises')
const path = require('path')

async function listUsers() {
    return await fs.readdir(path.join(__dirname, '..','protected', 'images', 'users'))
    .catch((error:any) => { console.log(`Erro no listUsers: ${error}`) })
}

export { listUsers }