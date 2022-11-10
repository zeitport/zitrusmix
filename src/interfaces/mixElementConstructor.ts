import type { MixElement } from '../mixElement.js';
import type { CssTemplateResult } from '../tags/cssTemplateResult.js';

export type MixElementConstructor = {
    new(): MixElement;
    styles: CssTemplateResult | undefined;
}
