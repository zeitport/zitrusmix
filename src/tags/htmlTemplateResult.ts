import { defaultTreeAdapter } from 'parse5';
import { DocumentFragment } from 'parse5/dist/tree-adapters/default';

/**
 * Use the html (./html.js) tagged template literal to create a HtmlTemplateResult.
 * @example html`<h1>Hello</h1>`;
 */
export class HtmlTemplateResult {
    fragment: DocumentFragment;
    text: string;

    constructor(partial?: Partial<HtmlTemplateResult>) {
        this.fragment = partial?.fragment || defaultTreeAdapter.createDocumentFragment();
        this.text = partial?.text || '';
    }
}
