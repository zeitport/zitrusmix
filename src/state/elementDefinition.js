/**
 * @typedef {import('../mixElement.js').MixElement} MixElement;;
 * @typedef {import('../types/zitrusmix.js').renderFn} renderFn;
 */
export class ElementDefinition {
    /**
     * @param {Partial<ElementDefinition>} init
     */
    constructor(init) {
        /**
         * @type {(new () => MixElement) | null}
         */
        this.ElementConstructor = init.ElementConstructor || null;

        /**
         * @type {import("../types/zitrusmix.js").renderFn | null}
         */
        this.render = init.render || null;
    }
}
