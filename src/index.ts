import Fastify from 'fastify';

import { definePageRoute, definePageHead, router, defineStaticRoot } from './router/router.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';
import { scanElements } from './startup/scanElements.js';
import { loadHeadModule } from './startup/loadHeadModule.js';
import { log, useLogger } from './log.js';
import { scanApi } from './startup/scanApi.js';
import { createMixStyle } from './startup/createMixStyle.js';

export { css, html } from './tags/tags.js';
export { MixElement } from './mixElement.js';
export * from './mixElements.js';

const fastify = Fastify();

export async function zitrusmix(init: Partial<Options>): Promise<void> {
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
    fastify.listen({port: options.port}, function (error, address) {
        if (error) {
            log.fatal(error.message);
        }

        log.info(new Date().toLocaleTimeString());
        log.info(`Server is now listening on ${address}`);
    });
}
