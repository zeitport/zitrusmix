import type { BaseLogger } from './log/baseLogger.js';
import type { Nullable } from './utils/nullable.js';

export class Options {
    /**
     * @description Current working directory
     */
    readonly cwd: string;
    readonly app: string | readonly string[];
    readonly pageFiles: string | readonly string[];
    readonly elementFiles: string | readonly string[];
    readonly pageRoot: string;
    readonly appRoot: string;
    readonly staticRoot: string;

    /**
     * @link https://github.com/zeitport/zitrusmix/blob/main/doc/feature/head.md
     */
    readonly head: string;

    readonly logger: Nullable<BaseLogger>;
    readonly port: number;

    /**
     * @param {Partial<Options> | undefined | null} [partial]
     */
    constructor(partial) {
        this.cwd = partial?.cwd || process.cwd();
        this.app = partial?.app || ['./app/**/*.js', './app/**/*.mjs'];
        this.pageFiles = partial?.pageFiles || ['./app/pages/**/*.html'];
        this.elementFiles = partial?.elementFiles || ['./app/elements/**/*.js'];
        this.pageRoot = partial?.pageRoot || './app/pages/';
        this.appRoot = partial?.appRoot || './app/';
        this.staticRoot = partial?.staticRoot || './app/static/';
        this.head = partial?.head || './app/head.js';
        this.logger = null;
        this.port = partial.port || 3000;
    }
}
