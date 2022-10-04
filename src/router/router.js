import { HtmlTemplateResult } from '../tags/htmlTemplateResult.js';
import { mixStylesheet } from './plugins/mixStylesheet.js';
import { renderPages } from './plugins/renderPages.js';

/**
 * @typedef {import('./route').Route} Route
 * @typedef {import('../startup/page').Page} Page
 */

/**
 * @type {Set<Page>}
 */
const pages = new Set();

/**
 * @type {function(): HtmlTemplateResult}
 */
let pageHead = () => new HtmlTemplateResult();

/**
 * Encapsulates the routes
 * @param {any} fastify  Encapsulated Fastify Instance
 */
export async function router(fastify) {
    fastify.register(renderPages, { pages, head: pageHead});
    fastify.register(mixStylesheet);
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
