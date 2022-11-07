import type { BaseLogger } from "./log/baseLogger.js";
import type { Nullable } from "./utils/nullable.js";

export class Options {
    /**
     * @description Current working directory
     */
    cwd: string;
    app: string | readonly string[];
    pageFiles: string | readonly string[];
    elementFiles: string | readonly string[];
    pageRoot: string;
    appRoot: string;
    staticRoot: string;
    head: string;
    logger: Nullable<BaseLogger>;
    port: number;

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
