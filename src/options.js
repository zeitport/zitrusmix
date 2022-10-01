export class Options {
    /**
     * @param {Partial<Options> | undefined | null} [partial]
     */
    constructor(partial) {
        /**
         * @type {string}
         */
        this.cwd = partial?.cwd || process.cwd();

        /**
         * @type {string | readonly string[]}
         */
        this.app = partial?.app || ['./app/**/*.js', './app/**/*.mjs'];

        /**
         * @type {string | readonly string[]}
         */
        this.pageFiles = partial?.pageFiles || ['./app/pages/**/*.html'];

        /**
         * @type {string | readonly string[]}
         */
        this.elementFiles = partial?.elementFiles || ['./app/elements/**/*.js'];

        /**
         * @type {string}
         */
        this.pageRoot = partial?.pageRoot || './app/pages/';

        /**
         * @type {string}
         */
        this.appRoot = partial?.appRoot || './app/';

        /**
         * @type {string}
         */
        this.head = partial?.head || './app/head.js';

        /**
         * @type {import('./types/baseLogger.js').BaseLogger | null}
         */
        this.logger = null;
    }
}
