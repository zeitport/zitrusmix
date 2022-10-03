import { defaultTreeAdapter } from 'parse5';

/**
 * @typedef {import('../types/ast').DocumentFragment} DocumentFragment
 * @typedef {import('../types/ast').Document} Document
 */

export class TemplateResult {
    /**
     * @param {Partial<TemplateResult>} [partial]
     */
    constructor(partial) {
        /**
         * @type {DocumentFragment}
         */
        this.fragment = partial?.fragment || defaultTreeAdapter.createDocumentFragment();

        /**
         * @type {string}
         */
        this.text = partial?.text || '';
    }
}
