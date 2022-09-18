import {HtmlTemplateResult} from './tags/htmlTemplateResult.js';

export class RenderTask {
    readonly templateResult: HtmlTemplateResult;

    constructor(templateResult: HtmlTemplateResult) {
        this.templateResult = templateResult;
    }
}
