import { router } from './router/router.js';
import { elements } from './state/elements.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';
import { definePageRoute } from './router/router.js';

/**
 * @param {Options} [init]
 * @returns
 */
export async function zitrusmix(init) {
    const options = new Options(init);

    const pages = await scanPages(options);
    console.log(pages);

    for(const page of pages) {
        definePageRoute(page);
    }

    return {
        router: router
    }
};

/**
 * @param {import('./types/zitrusmix').ElementDefinition} definition
 */
export function defineElement(definition) {
    elements.set(definition.tag, definition.render);
};
