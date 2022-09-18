import {MixPageParameter} from './mixPageParameter.js';

export class MixPage {
    readonly params: Record<string, string> = {};

    constructor(init?: Partial<MixPage>) {
        this.params = init?.params || {};
    }

    parameter(name: string) {
        return new MixPageParameter(name);
    }
}
