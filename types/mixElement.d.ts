export type ElementName = string;

export type CssTemplateResult = {
    raw: string,
    moduleId: string
}

export type MixElementConstructor = {
    new(): MixElement;
    static styles?: CssTemplateResult,
}

export interface MixElement {
    render: function (ElementContext) : HtmlTemplateResult
}

export interface ElementContext {
    html: html,
    attrs: Record<string, string>,
    attributes: Attribute[]
}
