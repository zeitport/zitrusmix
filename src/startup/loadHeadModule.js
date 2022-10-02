import path from 'node:path';
import fs from 'node:fs';
import { log } from '../log.js';

/**
 * @typedef {import('../templateResult.js').TemplateResult} TemplateResult
 */

/**
 * @param {*} options
 * @returns {Promise<{default: () => TemplateResult}>}
 */
export async function loadHeadModule(options) {
    const headModulePath = path.join(process.cwd(), options.head);

    const module = await import(`file://${headModulePath}`).catch(() => null);

    if (!module || !module.default) {
        const error = 'head.js module could not be loaded';
        log.fatal(error, {code: 'ZM-1173'});

        // A blocking IO call during startup is okay.
        // eslint-disable-next-line node/no-sync
        const existsFile = fs.existsSync(headModulePath);

        log.info(`Module file exists at ${headModulePath}`, {status: existsFile});
        log.info('Module could be loaded', {status: Boolean(module)});
        log.info('Module has a default export', {status: Boolean(module?.default)});

        throw new Error(error);
    }

    log.info('Module head.js loaded', {status: true});

    return module;
}
