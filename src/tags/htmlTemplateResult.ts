import { defaultTreeAdapter } from 'parse5';
import { DocumentFragment } from 'parse5/dist/tree-adapters/default.js';

/**
 * Use the html tagged template literal to create a HtmlTemplateResult.
 * @example
 * import {html} from 'zitrusmix';
 *
 * html`<h1>Hello</h1>`;
 */
export class HtmlTemplateResult {
    fragment: DocumentFragment;
    raw: string;

    constructor(partial?: Partial<HtmlTemplateResult>) {
        this.fragment = partial?.fragment || defaultTreeAdapter.createDocumentFragment();
        this.raw = partial?.raw || '';
    }
}
