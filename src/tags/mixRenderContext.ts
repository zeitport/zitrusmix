import {MixPage} from '../mixPage.js';
import {createId} from '../utils/createId.js';
import {html} from './html.js';
import {HtmlTemplateResult} from './htmlTemplateResult.js';


export type HtmlTagTemplateContext = (this: MixRenderContext, strings: TemplateStringsArray, ...values: unknown[]) => HtmlTemplateResult
export type HtmlTagTemplate = (strings: TemplateStringsArray, ...values: unknown[]) => HtmlTemplateResult

export class MixRenderContext {
    readonly html: HtmlTagTemplate;
    readonly contextId = createId();
    readonly page: MixPage;

    constructor(init?: {page?: MixPage}) {
        // TODO: Decision about this context open
        // this.html = html.bind(this);
        this.html = html;
        this.page = init?.page || new MixPage();
    }

    static isContext(obj): obj is MixRenderContext {
        return Boolean(obj && obj.contextId);
    }
}
