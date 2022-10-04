export interface ElementContext {
    html: html,
    attrs: Record<string, string>,
    attributes: Attribute[]
}

export type MixElementConstructor = new () => MixElement;
export type ElementName = string;

export interface MixElement {
    static [styles]: CssTemplateResult,
    render: function (ElementContext) : HtmlTemplateResult
}
