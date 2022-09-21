import { defaultTreeAdapter } from 'parse5';

/**
 * @typedef {import('./types/ast').DocumentFragment} DocumentFragment
 */

export class TemplateResult {
    /**
     * @param {Partial<TemplateResult> | undefined | null} partial
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
