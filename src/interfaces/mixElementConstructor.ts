import type { MixElement } from '../mixElement.js';

export type MixElementConstructor<T extends MixElement> =
    {new(): T} &
    {
        [Key in keyof typeof MixElement]: typeof MixElement[Key]
    }
