import { elements } from './state/elements.js';
import { mixStyle } from './state/mixStyle.js';

export const mixElements = {
    /**
     * @param {import('../types/mixElement.js').ElementName} elementName
     * @param {import('../types/mixElement.js').MixElementConstructor} ElementConstructor
     */
    define(elementName, ElementConstructor) {
        elements.set(elementName, ElementConstructor);

        if (ElementConstructor.styles) {
            mixStyle.map.set(elementName, ElementConstructor.styles);
        }
    }
};
