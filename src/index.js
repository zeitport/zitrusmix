import path from 'node:path';
import { definePageRoute, definePageHead, router } from './router/router.js';
import { elements } from './state/elements.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';

export { html } from './html.js';

/**
 * @param {Options} [init]
 * @returns
 */
export async function zitrusmix(init) {
    const options = new Options(init);

    const pages = await scanPages(options);
    console.log(pages);

    for (const page of pages) {
        definePageRoute(page);
    }

    const headModulePath = path.join(process.cwd(), options.head);
    const module = await import(`file://${headModulePath}`);
    definePageHead(module.default);

    //const head = await import(options.head);
    //definePageHead(head);

    return {
        router,
        options
    };
};

/**
 * @param {import('./types/zitrusmix').ElementDefinition} definition
 */
export function defineElement(definition) {
    elements.set(definition.tag, definition.render);
};

export function element(name, elementCallback) {
    elements.set(name, elementCallback);
};
