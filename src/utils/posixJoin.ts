import path from 'node:path';

/**
 * Returns a posix safe file path.
 * Use this to prevent problems between different slash styles.
 * For glob patterns, always use posixJoin before.
 */
export function posixJoin(...paths: string[]): string {
    return path
        .join(...paths)
        .split(path.sep)
        .join(path.posix.sep);
}
