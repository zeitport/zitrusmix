/**
 * @typedef {import('./elementDefinition.js').ElementDefinition} ElementDefinition
 */

/**
 * @type {Map<string, ElementDefinition>}
 */
export const elements = new Map();

/**
 * @param {string} elementName
 * @returns {renderFn | undefined}}
 */
export function getRender(elementName) {
    let renderFn;

    const definition = elements.get(elementName);

    if (definition) {
        if (definition.ElementConstructor) {
            const element = new definition.ElementConstructor();
            renderFn = context => element.render(context);
        }

        if (definition.render) {
            renderFn = definition.render;
        }
    }

    return renderFn;
}
