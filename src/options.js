export class Options {
    /**
     * @param {Partial<Options> | undefined | null} [partial]
     */
    constructor(partial) {
        /**
         * @type {string | readonly string[]}
         */
        this.app = partial?.app || ['./app/**/*.js', './app/**/*.mjs'];

        /**
         * @type {string | readonly string[]}
         */
        this.pageFiles = partial?.pageFiles || ['./app/pages/**/*.html'];

        /**
         * @type {string}
         */
        this.pageRoot = partial?.pageRoot || './app/pages';
    }
}
