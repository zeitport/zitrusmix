import fs from 'node:fs/promises';
import * as parse5 from 'parse5';
import { Timeline } from '../utils/timeline.js';
import { mergeHead } from '../utils/mergeHead.js';
import { log } from '../../log.js';
import { html } from '../../tags/html.js';
import { Page } from '../../startup/page.js';
import { HtmlTemplateResult } from '../../tags/htmlTemplateResult.js';
import { getErrorMessage } from '../../utils/getErrorMessage.js';

export class RenderPagesOptions {
    pages: Set<Page>;
    head: () => HtmlTemplateResult;

    /**
     * @param {Required<RenderPagesOptions>} init
     */
    constructor(init) {
        this.pages = init.pages;
        this.head = init.head;
    }
}

/**
 * @param {any} fastify
 * @param {RenderPagesOptions} options
 * @param {function(): void} done
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
                const message = getErrorMessage(error);
                log.error(`Render page "${request.url}" failed: ${message}`);
                reply.status(500).send();
            }
        };

        fastify.get(page.route.url, pageHandler);
    }

    done();
}
