import Fastify from 'fastify';

import { definePageRoute, definePageHead, router, defineStaticRoot } from './router/router.js';
import { ZitrusmixOptions } from './zitrusmixOptions.js';
import { scanPages } from './startup/scanPages.js';
import { scanElements } from './startup/scanElements.js';
import { loadHeadModule } from './startup/loadHeadModule.js';
import { log, useLogger } from './log.js';
import { scanApi } from './startup/scanApi.js';
import { createMixStyle } from './startup/createMixStyle.js';

export class ZitrusmixServer {
    private fastify = Fastify({ logger: false });
    readonly #options: ZitrusmixOptions;

    constructor(init?: Partial<ZitrusmixOptions>) {
        this.#options = new ZitrusmixOptions(init);
    }

    get options(): Readonly<ZitrusmixOptions> {
        return Object.freeze(this.#options);
    }

    async start(): Promise<void> {
        const {port, host, logger} = this.#options;
        // Use custom logger
        useLogger(logger);

        log.info('Starting zitrusmix ...');

        // Scan for pages
        const pages = await scanPages(this.#options);

        for (const page of pages) {
            definePageRoute(page);
        }

        // Load custom elements
        await scanElements(this.#options);
        await scanApi(this.#options);

        // Create mix style
        await createMixStyle();

        // Load the head module
        const module = await loadHeadModule(this.#options);
        definePageHead(module.default);

        // Define static root
        defineStaticRoot(this.#options);

        log.debug('Available page routes', {routes: pages.map(page => page.route.url)});

        this.fastify.register(router);

        return new Promise((resolve, reject) => {
            this.fastify.listen({port, host}, function (error, address) {
                if (error) {
                    log.error(error.message);
                    reject(error);
                } else {
                    log.info(new Date().toLocaleTimeString());
                    log.info('Server is now listening on:');
                    log.info(address);
                    resolve();
                }
            });
        });
    }
}
