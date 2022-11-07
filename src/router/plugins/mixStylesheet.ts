/**
 * @typedef {import('../../startup/page').Page} Page
 * @typedef {import('../../tags/htmlTemplateResult').HtmlTemplateResult} HtmlTemplateResult
 */

import { mixStyle } from '../../state/mixStyle.js';

/**
 * @param {any} fastify
 * @param {any} _options
 * @param {function(): void} done
 */
export async function mixStylesheet(fastify, _options, done) {

    const styleHandler = async (_request, reply) => {
        reply.type('text/css').send(mixStyle.css);
    };

    const styleSourceMapHandler = async (_request, reply) => {
        reply.type('text/css').send(mixStyle.sourceMap);
    };

    fastify.get('/mix/styles.css', styleHandler);
    fastify.get('/mix/styles.css.map', styleSourceMapHandler);

    done();
}
