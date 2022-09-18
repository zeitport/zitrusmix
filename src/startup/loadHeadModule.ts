import path from 'node:path';
import fs from 'node:fs';
import { log } from '../log.js';

/**
 * @typedef {import('../tags/htmlTemplateResult.js').HtmlTemplateResult} HtmlTemplateResult
 */

/**
 * @param {*} options
 * @returns {Promise<{default: () => HtmlTemplateResult}>}
 */
export async function loadHeadModule(options) {
    log.info('[Startup] Load head.js module');

    const headModulePath = path.join(options.cwd, options.head);

    const module = await import(`file://${headModulePath}`).catch(() => null);

    if (!module || !module.default) {
        const error = `(ZM-1173) head.js module not found: ${headModulePath}`;
        log.error(error);
        throw new Error(error);

        // A blocking IO call during startup is okay.
        // eslint-disable-next-line node/no-sync
        const existsFile = fs.existsSync(headModulePath);

        log.info(`Module file exists at ${headModulePath}`, {status: existsFile});
        log.info('Module could be loaded', {status: Boolean(module)});
        log.info('Module has a default export', {status: Boolean(module?.default)});

        throw new Error(error);
    }

    return module;
}
