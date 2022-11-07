import { ElementContext } from './interfaces/elementContext';
import {CssTemplateResult} from './tags/cssTemplateResult';
import { HtmlTemplateResult } from './tags/htmlTemplateResult';

export abstract class MixElement {
    static styles: CssTemplateResult | undefined = undefined;

    abstract render(context: ElementContext): HtmlTemplateResult;
}

export interface MixElementRenderMethod {
    render(context: ElementContext): HtmlTemplateResult;
}
