import { customAlphabet} from 'nanoid';

const createId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 8);

export class CssTemplateResult {
    /**
     * @param {Partial<CssTemplateResult>} init
     */
    constructor(init) {
        /**
         * @type {string}
         * @readonly
         */
        this.raw = init.raw || '';

        /**
         * @type {string}
         * @readonly
         */
        this.moduleId = init.moduleId || createId();
    }
}
