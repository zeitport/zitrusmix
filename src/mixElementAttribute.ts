export class MixElementAttribute {
    readonly attributeName: string;
    #value: string | null;

    constructor(name: string, value?: string | null) {
        this.attributeName = name;
        this.#value = value || null;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }

    default(value: string) {
        if (this.#value === null) {
            this.#value = value;
        } else {
            throw new Error('(ZM-6273) The default value of a MixElementAttribute can only be set once on declaration');
        }

        return this;
    }
}
