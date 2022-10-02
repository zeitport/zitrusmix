/**
 * @typedef {import('../options.js').Options} Options
 */

import { globby } from 'globby';
import path from 'node:path/posix';
import { log } from '../log.js';
import { elements } from '../state/elements.js';
import process from 'node:process';

/**
 * @param {Options} options
 * @returns {Promise<void>}
 */
export async function scanElements(options) {
    const files = await globby(options.elementFiles);

    for (const file of files) {
        const modulePath = path.join(process.cwd(), file);
        const module = await import(`file://${modulePath}`).catch(() => log.error('ERROR'));

        if (!module) {
            const error = `Element module could not be loaded: ${file}`;

            log.fatal(error, {code: 'ZM-5659', file});
            log.info('Module loaded', {status: Boolean(module)});

            throw new Error(error);
        }
    }

    log.info(`Element scan completed. (${elements.size} elements)`, {status: true});
}
