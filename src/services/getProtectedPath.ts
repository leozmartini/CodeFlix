import path from 'path';

function getProtectedPath(args: string[]): string {
    return path.resolve(__dirname, '..', '..', 'protected', ...args);
}

export { getProtectedPath, }