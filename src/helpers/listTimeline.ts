const fs = require('fs/promises')
const path = require('path')

async function listTimeline(user: string): Promise<string[] | Error> {
  if (!user) throw new Error('400');
  try {
    return await fs.readdir(path.join(__dirname, '..','..','protected', 'users', user, 'images', 'timeline'))
  } catch (err: any) {
    throw new Error('500')
  }
}

export { listTimeline }