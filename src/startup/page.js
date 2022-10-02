/**
 * @typedef {import('../types/ast.js').Node} Node
 * @typedef {import('./pageRoute.js').PageRoute} PageRoute
 */

export class Page {
    /**
     * @param {Required<Page>} init
     */
    constructor(init) {
        /**
         * @type {string}
         * @readonly
         */
        this.filepath = init.filepath;

        /**
         * @type {PageRoute}
         * @readonly
         */
        this.route = init.route;
    }
}
