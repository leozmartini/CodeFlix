const fs = require('fs/promises')
const path = require('path')

async function listTimeline(user: string) {
  try {
    return await fs.readdir(path.join(__dirname, '..','..','protected', 'users', user, 'images', 'timeline'))
  } catch (err) {
    console.error('Erro no listDir: ', err)
  }
}

export { listTimeline }