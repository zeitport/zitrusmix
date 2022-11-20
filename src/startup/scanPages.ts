/**
 * @typedef {import('../../types/ast.js').Node} Node
 * @typedef {import('../options.js').Options} Options
 */

import path from 'node:path';

import { parseFragment} from 'parse5';
import { Page } from './page.js';
import { ast } from '../utils/ast.js';
import { metaNames } from './metaNames.js';
import { PageRoute, PageRouteSource } from './pageRoute.js';
import { log } from '../log.js';
import { findFiles } from '../utils/fs/findFiles.js';

/**
 * @param {Options} options
 */
export async function scanPages(options) {
    log.info('[Startup] Scan pages');

    const files = await findFiles(path.join(options.cwd, options.pageRoot), options.pageFiles);
    const pages: Array<Page> = [];

    for (const file of files) {
        const fileContent = await file.read();
        const document = parseFragment(fileContent);

        const page = new Page({
            filepath: file.absolutePath,
            route: await getRoute(file.relativePath, document)
        });

        pages.push(page);
    }


    log.debug(`${pages.length} pages found.`);

    return pages;
}

/**
 * @param {string} file
 * @param {Node} document
 * @returns {Promise<PageRoute>}
 */
async function getRoute(file, document) {
    let pageRoute: PageRoute;

    const metaNodes = ast.filter(document, node => node.nodeName === 'meta');
    const metaData = getMetaData(metaNodes);
    const metaUrl = metaData.get(metaNames.ZITRUSMIX_ROUTE);

    if (metaUrl) {
        pageRoute = new PageRoute({url: metaUrl, source: PageRouteSource.META_TAG});
    } else {
        const filebasedUrl = `/${file}`
            .slice(0, -path.extname(file).length)
            .replace('/index', '/')
            .replaceAll('//', '/');
        pageRoute = new PageRoute({url: filebasedUrl, source: PageRouteSource.FILEPATH});
    }

    return pageRoute;
}

/**
 *
 * @param {Node[]} nodes
 * @returns {Map<string, string>}
 */
function getMetaData(nodes) {
    const metaData = new Map();

    for(const node of nodes) {
        const attributes = ast.getAttributeMap(node);
        const name = attributes.get('name');
        const content = attributes.get('content');

        if (name && content) {
            metaData.set(name, content);
        }
    }

    return metaData;
}
