import {Page} from '../../startup/page.js';
import {HtmlTemplateResult} from '../../tags/htmlTemplateResult.js';

export class RenderPagesOptions {
    pages: Set<Page>;
    head: () => HtmlTemplateResult;

    /**
     * @param {Required<RenderPagesOptions>} init
     */
    constructor(init) {
        this.pages = init.pages;
        this.head = init.head;
    }
}
