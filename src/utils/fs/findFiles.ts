import path from 'node:path';
import { globby } from 'globby';
import { FileMatch } from './fileMatch.js';

export async function findFiles(directory: string, pattern: string): Promise<FileMatch[]> {
    if (pattern.includes('\\')) {
        throw new Error('File pattern must not include a backslash "\\".');
    }

    const posixDirectory = convertToPosixPath(directory);
    const files = await globby(path.posix.join(posixDirectory, pattern));

    return files.map(file => {
        return new FileMatch({
            absolutePath: file,
            relativePath: path.posix.relative(posixDirectory, file)
        });
    });
}

function convertToPosixPath(anyPath: string) {
    return anyPath.split(path.sep).join(path.posix.sep);
}
