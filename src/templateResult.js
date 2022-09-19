import { defaultTreeAdapter } from 'parse5';

export class TemplateResult {
    /**
     * @param {Partial<TemplateResult> | undefined | null} partial
     */
    constructor(partial) {
        /**
         * @type {TreeAdapterTypeMap}
         */
        this.fragment = partial?.fragment || defaultTreeAdapter.createDocumentFragment();

        /**
         * @type {string}
         */
        this.text = partial?.text || '';
    }
}
