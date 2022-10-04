import { defaultTreeAdapter } from 'parse5';

/**
 * @typedef {import('../../types/ast').DocumentFragment} DocumentFragment
 * @typedef {import('../../types/ast').Document} Document
 */

/**
 * Use the html (./html.js) tagged template literal to create a HtmlTemplateResult.
 * @example html`<h1>Hello</h1>`;
 */
export class HtmlTemplateResult {
    /**
     * @param {Partial<HtmlTemplateResult>} [partial]
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
