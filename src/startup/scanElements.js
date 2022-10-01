import { globby } from 'globby';
import path from 'node:path/posix';
import { log } from '../log.js';
import { Options } from '../options.js';
import { elements } from '../state/elements.js';

/**
 * @param {Options} options
 */
export async function scanElements(options) {
    const files = await globby(options.elementFiles);

    for (const file of files) {
        const modulePath = path.join(process.cwd(), file);
        const module = await import(`file://${modulePath}`).catch(() => log.error('ERROR'));

        if (!module) {
            log.fatal(`element module could not be loaded: ${file}`, {code: 'ZM-5659', file});
            log.info(`Module loaded`, {status: Boolean(module)});

            process.exit(-5659);
        }
    }

    log.info(`Element scan completed. (${elements.size} elements)`, {status: true});
}
