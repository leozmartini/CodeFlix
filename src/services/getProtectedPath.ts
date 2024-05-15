import path from 'path';
import fs from 'fs';

function getProtectedPath(args: string[]): string {
    const filePath = path.resolve(__dirname, '..', '..', 'protected', ...args);
    if (fs.existsSync(filePath)) {
        return filePath;
    } else {
        throw new Error('404');
    }
}

export { getProtectedPath };
