import fs from 'node:fs/promises';
import * as parse5 from 'parse5';
import { Timeline } from '../utils/timeline.js';
import { mergeHead } from '../utils/mergeHead.js';

/**
 * @typedef {import('../../startup/page').Page} Page
 * @typedef {import('../../templateResult').TemplateResult} TemplateResult
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

        /**
         * @type {function(): TemplateResult}
         */
        this.head = init.head;
    }
}

/**
 * @param {any} fastify
 * @param {RenderPagesOptions} options
 */
export async function renderPages(fastify, options, done) {
    for (const page of options.pages) {
        const pageHandler = async (_, reply) => {
            try {
                const timeline = new Timeline();

                timeline.mark('read-file');
                const fileContent = await fs.readFile(page.filepath, 'utf8');

                timeline.mark('parse-file');
                const document = parse5.parse(fileContent);

                timeline.mark('merge-head');
                mergeHead(document, options.head().fragment);

                timeline.mark('render');
                const html = parse5.serialize(document);

                reply.header('Server-Timing', timeline.getPerformanceServerTiming());
                reply.type('text/html').send(html);
            } catch (error) {
                console.log(error);
                const html = `<strong>${error.message}</strong><pre>${error.stack}</pre>`;
                reply.type('text/html').send(html);
            }
        };

        console.log(page.route.url);
        fastify.get(page.route.url, pageHandler);
    }

    done();
}
