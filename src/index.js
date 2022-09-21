import path from 'node:path';
import { globby } from 'globby';

import { router } from './router.js';
import { routes } from './routes.js';
import { elements } from './elements.js';
import { Options } from './options.js';

/**
 * @param {Options} [options]
 * @returns
 */
export async function zitrusmix(options) {
    const init = new Options(options);
    const modules = await globby(init.app);

    for (const modulepath of modules) {
        const absolutePath = path.join(process.cwd(), modulepath);
        await import(`file://${absolutePath}`);
    }

    return {
        router: router
    }
};

export function route(route, callback) {
    routes.set(route, callback);
};

export function element(elementName, callback) {
    elements.set(elementName, callback);
};
