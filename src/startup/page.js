
import {PageRoute} from './pageRoute.js';

/**
 * @typedef {import('../types/ast.js').Node} Node
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
