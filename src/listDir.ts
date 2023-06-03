import fs from 'fs/promises'
const perm = 22


async function listDir() {
  try {
    return await fs.readdir(`./protected/images/users/${perm}/timeline`)
  } catch (err) {
    console.error('Erro no readdir: ', err)
  }
}

export { listDir }