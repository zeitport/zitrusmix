import { log } from '../log.js';
import { elements } from '../state/elements.js';
import { mixStyle } from '../state/mixStyle.js';
import { mixElements } from '../mixElements.js';
import { MixElementConstructor } from '../interfaces/mixElementConstructor.js';
import { MixElement } from '../mixElement.js';
import { findFiles } from '../utils/fs/findFiles.js';
import { importModule } from './importModule.js';

/**
 * @param {Options} options
 * @returns {Promise<void>}
 */
export async function scanElements(options) {
    log.info('[Startup] Scan elements');

    const files = await findFiles(options.cwd, options.elementFiles);

    for (const file of files) {
        const importResult = await importModule(file.absolutePath);

        if (importResult.module) {
            const {module, exports} = importResult;

            if (exports.length === 1) {
                // #TODO: Don't trust the import, add a true type check here.
                const ElementConstructor = module[exports[0]] as MixElementConstructor<MixElement>;
                mixElements.define(ElementConstructor.elementName, ElementConstructor);

                log.debug(`${ElementConstructor.name} → <${ElementConstructor.elementName}>`);
            } else {
                const error = `(ZM-1346) A element shall only export one MixElement: ${importResult.path}`;
                log.error(error);
            }
        } else {
            const error = `(ZM-5659) Element module could not be loaded:  ${importResult.path}`;
            log.error(error);
            log.error(importResult.error);
        }
    }

    log.debug(`${elements.size} elements found.`);
    log.debug(`${mixStyle.map.size} styles found.`);
}
