import { MixElementAttribute } from './mixElementAttribute.js';
import { MixPage } from './mixPage.js';
import { css } from './tags/css.js';
import { CssTemplateResult } from './tags/cssTemplateResult.js';
import { HtmlTemplateResult } from './tags/htmlTemplateResult.js';
import {MixRenderContext} from './tags/mixRenderContext.js';

export interface StylesContext {
    css: typeof css
}

export abstract class MixElement {
    static elementName = 'mix-element';

    static styles: CssTemplateResult = css``;

    #attributeMap: Map<string, MixElementAttribute> = new Map();
    #page = new MixPage();

    abstract render(renderContext: MixRenderContext): Promise<HtmlTemplateResult>;

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

    protected attribute(name: string, value? : string | null): MixElementAttribute {
        const attribute = new MixElementAttribute(name, value);

        if (this.#attributeMap.has(name)) {
            throw new Error(`(ZM-5905) Attribute "${name}" already defined on MixElement.`);
        } else {
            this.#attributeMap.set(name, attribute);
        }

        return attribute;
    }

    protected get page(): MixPage {
        return this.#page;
    }

    getAttribute(name: string): MixElementAttribute | undefined {
        return this.#attributeMap.get(name);
    }
}
