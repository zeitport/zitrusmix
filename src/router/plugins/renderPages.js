import fs from 'node:fs/promises';
import * as parse5 from 'parse5';
import { Timeline } from '../utils/timeline.js';
import { mergeHead } from '../utils/mergeHead.js';
import { log } from '../../log.js';
import { html } from '../../html.js';

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
        const pageHandler = async (request, reply) => {
            try {
                const timeline = new Timeline();

                timeline.mark('read-file');
                const fileContent = await fs.readFile(page.filepath, 'utf8');

                timeline.mark('parse-file');
                const document = parse5.parse(fileContent);

                timeline.mark('merge-head');
                mergeHead(document, options.head().fragment);

                timeline.mark('render');
                const renderedPage = html`
                    <!DOCTYPE html>
                    <html>
                        ${parse5.serialize(document)}
                    </html>
                `;

                reply.header('Server-Timing', timeline.getPerformanceServerTiming());
                reply.type('text/html').send(renderedPage.text);
            } catch (error) {
                log.error(`Render page "${request.url}" failed: ${error.message}`);
                reply.status(500).send();
            }
        };

        fastify.get(page.route.url, pageHandler);
    }

    done();
}
