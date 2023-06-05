import fs from 'fs/promises'

async function listDir(user: Number) {
  try {
    return await fs.readdir(`./protected/images/users/${user}/timeline`)
  } catch (err) {
    console.error('Erro no readdir: ', err)
  }
}

export { listDir }