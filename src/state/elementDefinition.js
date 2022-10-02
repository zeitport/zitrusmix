/**
 * @typedef {import('../zitrusmixElement.js').ZitrusmixElement} ZitrusmixElement;
 * @typedef {import('../types/zitrusmix.js').renderFn} renderFn;
 */
export class ElementDefinition {
    /**
     * @param {Partial<ElementDefinition>} init
     */
    constructor(init) {
        /**
         * @type {(new () => ZitrusmixElement) | null}
         */
        this.ElementConstructor = init.ElementConstructor || null;

        /**
         * @type {import("../types/zitrusmix.js").renderFn | null}
         */
        this.render = init.render || null;
    }
}
