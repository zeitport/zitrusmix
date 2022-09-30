import { Decorators } from './decorators.js';
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
 * Encapsulates the routes
 * @param {any} fastify  Encapsulated Fastify Instance
 */
export async function router(fastify) {
    fastify.decorateRequest(Decorators.PAGE, null);
    fastify.register(renderPages, {pages})
}

/**
 * @param {Page} page
 */
export function definePageRoute(page) {
    pages.add(page);
}
