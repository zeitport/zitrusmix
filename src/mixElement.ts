import { ElementContext } from './interfaces/elementContext.js';
import {CssTemplateResult} from './tags/cssTemplateResult.js';
import { HtmlTemplateResult } from './tags/htmlTemplateResult.js';

export abstract class MixElement {
    static styles: CssTemplateResult | undefined = undefined;

    abstract render(context: ElementContext): HtmlTemplateResult;
}

export interface MixElementRenderMethod {
    render(context: ElementContext): HtmlTemplateResult;
}
