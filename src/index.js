import { definePageRoute, definePageHead, router } from './router/router.js';
import { elements } from './state/elements.js';
import { Options } from './options.js';
import { scanPages } from './startup/scanPages.js';
import { scanElements } from './startup/scanElements.js';
import { loadHeadModule } from './startup/loadHeadModule.js';
import { log, useLogger } from './log.js';
import { ElementDefinition } from './state/elementDefinition.js';

export { html } from './html.js';
export { ZitrusmixElement } from './zitrusmixElement.js';

/**
 * @param {Partial<Options>} [init]
 * @returns
 */
export async function zitrusmix(init) {
    try {
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
        const elements = await scanElements(options);

        // Load the head module
        const module = await loadHeadModule(options);
        definePageHead(module.default);


        log.debug('Available page routes', {routes: pages.map(page => page.route.url)});

        // #TODO: Add type definition
        return {
            router,
            options,
            log
        };
    } catch (error) {
        const { message } = /** @type {Error} */(error);
        log.fatal('Zitrusmix unexpected error: ' + message, { code: 'ZM-5041' });

        await new Promise(resolve => process.nextTick(resolve));
        throw error;
    }
}

export const zitrusmixElements = {
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
