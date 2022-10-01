import { globby } from 'globby';
import { log } from '../log.js';
import { Options } from '../options.js';

/**
 * @param {Options} options
 */
export async function scanElements(options) {
    const files = await globby(options.elementFiles);
    const elements = [];

    for (const file of files) {
        elements.push(file);
    }

    log.info(`Element scan completed. (${elements.length} elements)`, {status: true});
}
