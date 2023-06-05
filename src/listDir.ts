import fs from 'fs/promises'
import path from 'path'

async function listDir(user: string) {
  try {
    return await fs.readdir(path.join(__dirname, '..','protected', 'images', 'users', user.toString(), 'timeline'))
  } catch (err) {
    console.error('Erro no readdir: ', err)
  }
}

export { listDir }