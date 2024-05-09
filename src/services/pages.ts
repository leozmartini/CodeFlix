const path = require('path')

async function getHTMLPath(userType: string, finalPath: string): Promise<string> {
    return path.resolve(__dirname, '..', '..', 'protected', 'users', userType , 'html', finalPath);
}

module.exports = { getHTMLPath, }