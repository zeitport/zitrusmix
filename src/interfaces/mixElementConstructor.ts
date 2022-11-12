import type { MixElement } from '../mixElement.js';
//import { CssTemplateResult } from '../tags/cssTemplateResult.js';
// import { HtmlTemplateResult } from '../tags/htmlTemplateResult.js';

// export type MixElementConstructor<T extends MixElement> = {
//     new(): T;
//     styles: CssTemplateResult;
// };

export type MixElementConstructor<T extends MixElement> =
    {new(): T} &
    {
        [Key in keyof typeof MixElement]: typeof MixElement[Key]
    }
