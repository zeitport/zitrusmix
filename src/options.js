export class Options {
    /**
     * @param {Partial<Options> | undefined | null} [partial]
     */
    constructor(partial) {
        /**
         * @type {string | readonly string[]}
         */
        this.app = partial?.app || ['app/**/*.js', 'app/**/*.mjs'];
    }
}
