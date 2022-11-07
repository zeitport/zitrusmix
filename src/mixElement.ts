import { ElementContext } from './interfaces/elementContext';
import {CssTemplateResult} from './tags/cssTemplateResult';
import { HtmlTemplateResult } from './tags/htmlTemplateResult';

export class MixElement {
    static styles: CssTemplateResult | undefined = undefined;

    render(_renderContext: ElementContext): HtmlTemplateResult {
        throw new Error('Not implemented!');
    }
}
