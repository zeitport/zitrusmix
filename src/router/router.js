/**
 * @typedef {import('./route').Route} Route
 * @typedef {import('../startup/page').Page} Page
 */

import { HtmlTemplateResult } from '../tags/htmlTemplateResult.js';
import { mixStylesheet } from './plugins/mixStylesheet.js';
import { renderPages } from './plugins/renderPages.js';
import fastifyStatic from '@fastify/static';
import path from 'node:path';

/**
 * @type {Set<Page>}
 */
const pages = new Set();

/**
 * @type {function(): HtmlTemplateResult}
 */
let pageHead = () => new HtmlTemplateResult();

/**
 * @type {string}
 */
let staticRoot = './app/static/';

/**
 * Encapsulates the routes
 * @param {any} fastify  Encapsulated Fastify Instance
 */
export async function router(fastify) {
    fastify.register(renderPages, { pages, head: pageHead});
    fastify.register(mixStylesheet);
    fastify.register(fastifyStatic, {
        root: staticRoot,
        prefix: '/static'
    });
}

/**
 * @param {Page} page
 */
export function definePageRoute(page) {
    pages.add(page);
}

/**
 * @param {function(): HtmlTemplateResult} head
 */
export function definePageHead(head) {
    pageHead = head;
}

/**
 * @param {import('../options.js').Options} options
 */
export function defineStaticRoot(options) {
    staticRoot = path.join(options.cwd, options.staticRoot);
}
