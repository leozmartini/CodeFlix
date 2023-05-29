import fs from 'fs/promises'

async function listDir() {
  try {
    return await fs.readdir('./protected/images/timeline')
  } catch (err) {
    console.error('Erro no readdir: ', err)
  }
}

export { listDir }