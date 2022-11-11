import { ElementContext } from './interfaces/elementContext.js';
import { css } from './tags/css.js';
import {CssTemplateResult} from './tags/cssTemplateResult.js';
import { html } from './tags/html.js';
import { HtmlTemplateResult } from './tags/htmlTemplateResult.js';

export class MixElement {
    static styles: CssTemplateResult | undefined = undefined;
    readonly css = css;

    render(_context: ElementContext): HtmlTemplateResult {
        return html``;
    }
}

export interface MixElementRenderMethod {
    render(context: ElementContext): HtmlTemplateResult;
}
