import { customAlphabet} from 'nanoid';

const createId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 8);

export class CssTemplateResult {
    readonly raw: string;
    readonly moduleId: string;

    constructor(init: Partial<CssTemplateResult>) {
        this.raw = init.raw || '';
        this.moduleId = init.moduleId || createId();
    }
}
