import { AttributeDeclaration } from './attributeDeclaration.js';
import { ElementContext } from './interfaces/elementContext.js';
import { css } from './tags/css.js';
import {CssTemplateResult} from './tags/cssTemplateResult.js';
import { html } from './tags/html.js';
import { HtmlTemplateResult } from './tags/htmlTemplateResult.js';

export interface StylesContext {
    css: typeof css
}

export abstract class MixElement {
    static elementName = 'mix-element';

    static styles: CssTemplateResult = css``;

    static attributes: Record<string, AttributeDeclaration> = {};

    render(): HtmlTemplateResult {
        return html``;
    }

    /**
     * ### 💡 Warning
     * Only override the `static` method `styles`.
     *
     * @deprecated
     * @example
     * static styles({css}) {
     *   return css`.okay { color: green; };`;
     * };
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected styles() {}
}

export interface MixElementRenderMethod {
    render(context: ElementContext): HtmlTemplateResult;
}
