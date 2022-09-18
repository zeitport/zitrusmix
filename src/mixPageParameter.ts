export class MixPageParameter {
    #name: string;
    #value: string | null = null;

    constructor(name: string) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }
}
