import Fastify from 'fastify';

import { definePageRoute, definePageHead, router, defineStaticRoot } from './router/router.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';
import { scanElements } from './startup/scanElements.js';
import { loadHeadModule } from './startup/loadHeadModule.js';
import { log, useLogger } from './log.js';
import { scanApi } from './startup/scanApi.js';

export { css, html } from './tags/tags.js';
export { MixElement } from './mixElement.js';
export { mixElements } from './mixElements.js';
import { createMixStyle } from './startup/createMixStyle.js';

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

    // Create mix style
    await createMixStyle();

    // Load the head module
    const module = await loadHeadModule(options);
    definePageHead(module.default);

    // Define static root
    defineStaticRoot(options);

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
