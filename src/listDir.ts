const fs = require('fs/promises')
const path = require('path')

async function listDir(user: string) {
  try {
    return await fs.readdir(path.join(__dirname, '..','protected', 'images', 'users', user, 'timeline'))
  } catch (err) {
    console.error('Erro no listDir: ', err)
  }
}

export { listDir }