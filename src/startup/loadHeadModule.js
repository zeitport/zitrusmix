import path from 'node:path';
import fs from 'node:fs';
import { log } from '../log.js';
import { checkmark } from '../log/checkmark.js';

/**
 * @typedef {import('../templateResult.js').TemplateResult} TemplateResult
 */

/**
 * @param {*} options
 * @returns {Promise<{default: () => TemplateResult}>}
 */
export async function loadHeadModule(options) {
    const headModulePath = path.join(process.cwd(), options.head);

    log.info('Loading head.js module...');
    log.debug(headModulePath);

    const module = await import(`file://${headModulePath}`).catch(() => null);

    if (!module || !module.default) {
        log.fatal('head.js module could not be loaded', {code: 'ZM-1173'});

        // A blocking IO call during startup is okay.
        const existsFile = fs.existsSync(headModulePath);
        log.info(`${checkmark(existsFile)} Module file exists at ${headModulePath}`);
        log.info(`${checkmark(Boolean(module))} Module could be loaded`);
        log.info(`${checkmark(Boolean(module?.default))} Module has a default export`);

        process.exit(-1173);
    }

    return module;
}
