import fs from 'node:fs/promises';
import { parseFragment, serialize} from 'parse5';
import { Timeline } from '../utils/timeline.js';

/**
 * @typedef {import('../../startup/page').Page} Page
 */

export class RenderPagesOptions {
    /**
     * @param {Required<RenderPagesOptions>} init
     */
    constructor(init) {
        /**
         * @type {Set<Page>}
         */
        this.pages = init.pages;
    }
}

/**
 *
 * @param {any} fastify
 * @param {RenderPagesOptions} options
 */
export async function renderPages(fastify, options, done) {
    for (const page of options.pages) {
        const pageHandler = async (_, reply) => {
            const timeline = new Timeline();

            timeline.mark('readFile');
            const fileContent = await fs.readFile(page.filepath, 'utf8');

            timeline.mark('parse')
            const document = parseFragment(fileContent);

            timeline.mark('render')
            const html = `<!doctype html><html lang="en">${serialize(document)}</html>`;

            reply.header('Server-Timing', timeline.getPerformanceServerTiming());
            reply.type('text/html').send(html);
        };

        fastify.get(page.route.url, pageHandler);
    }

    done();
}
