import {FastifyInstance} from 'fastify/types/instance.js';
import fs from 'node:fs/promises';
import * as parse5 from 'parse5';
import {MixPage} from '../../mixPage.js';
import {MixRenderEngine} from "../../mixRenderEngine.js";
import { MixRenderContext } from '../../tags/mixRenderContext.js';
import { Timeline } from '../utils/timeline.js';
import { mergeHead } from '../utils/mergeHead.js';
import { log } from '../../log.js';
import { getErrorMessage } from '../../utils/getErrorMessage.js';
import { RenderPagesOptions } from './renderPagesOptions.js';

type callback = () => void;

export async function renderPages(fastify: FastifyInstance, options: RenderPagesOptions, done: callback) {
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

                const renderContext = new MixRenderContext({
                    page: new MixPage({params: request.params})
                });
                const renderEngine = new MixRenderEngine(renderContext);
                const {html} = renderContext;

                const renderedPage = await renderEngine.render(html`${parse5.serialize(document)}`);

                reply.header('Server-Timing', timeline.getPerformanceServerTiming());
                reply.type('text/html').send(renderedPage);
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
