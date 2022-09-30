import { TemplateResult } from '../templateResult.js';
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
 * @type {function(): TemplateResult}
 */
let pageHead = () => new TemplateResult();

/**
 * Encapsulates the routes
 * @param {any} fastify  Encapsulated Fastify Instance
 */
export async function router(fastify) {
    fastify.register(renderPages, { pages, head: pageHead})
}

/**
 * @param {Page} page
 */
export function definePageRoute(page) {
    pages.add(page);
}

/**
 * @param {function(): TemplateResult} head
 */
export function definePageHead(head) {
    pageHead = head;
}
