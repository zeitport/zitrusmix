import Fastify from 'fastify';

import { definePageRoute, definePageHead, router } from './router/router.js';
import { elements } from './state/elements.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';
import { scanElements } from './startup/scanElements.js';
import { loadHeadModule } from './startup/loadHeadModule.js';
import { log, useLogger } from './log.js';
import { ElementDefinition } from './state/elementDefinition.js';
import { scanApi } from './startup/scanApi.js';

export { html } from './html.js';
export { css } from './css.js';
export { MixElement } from './mixElement.js';

const fastify = Fastify();

/**
 * @param {Partial<Options>} [init]
 * @returns
 */
export async function zitrusmix(init) {
    const options = new Options(init);

    // Use custom logger
    useLogger(options.logger);

    log.info('Starting zitrusmix ...');

    // Scan for pages
    const pages = await scanPages(options);

    for (const page of pages) {
        definePageRoute(page);
    }

    // Load custom elements
    await scanElements(options);
    await scanApi(options);

    // Load the head module
    const module = await loadHeadModule(options);
    definePageHead(module.default);


    log.debug('Available page routes', {routes: pages.map(page => page.route.url)});


    fastify.register(router);

    // #TODO: Add type definition
    return {
        options,
        fastify,
        log,
        listen
    };
}

/**
 * @param {import('fastify/types/instance.js').FastifyListenOptions} options
 * @param {(err: Error | null, address: string) => void} callback
 */
function listen(options, callback) {
    fastify.listen(options, callback);
}

export const mixElements = {
    define(elementName, ElementConstructor) {
        log.debug(`Define element ${elementName}`);

        const definition = new ElementDefinition({ElementConstructor});

        elements.set(elementName, definition);
    },

    defineRender(elementName, render) {
        log.debug(`Define element render function for ${elementName}`);

        const definition = new ElementDefinition({render});

        elements.set(elementName, definition);
    }
};
