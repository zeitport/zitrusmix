import fs from 'node:fs/promises';

export class FileMatchInit {
    readonly absolutePath: string = '';
    readonly relativePath: string = '';
}

export class FileMatch {
    readonly absolutePath: string;
    readonly relativePath: string;

    constructor(init: FileMatchInit) {
        this.absolutePath = init.absolutePath;
        this.relativePath = init.relativePath;
    }

    async read() {
        return fs.readFile(this.absolutePath, 'utf8');
    }
}
