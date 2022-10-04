export class MixElement {
    /**
     * @type {import('./tags/cssTemplateResult.js').CssTemplateResult | undefined | null}
     */
    static styles = null;

    /**
     * @param {import('../types/mixElement.js').ElementContext} _
     */
    render(_) {
        throw new Error('Not implemented!');
    }
}
