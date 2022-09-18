import type { ElementName } from './elmentName.js';
import type { MixElementConstructor } from './interfaces/mixElementConstructor.js';
import { MixElement } from './mixElement.js';
import { elements } from './state/elements.js';
import { mixStyle } from './state/mixStyle.js';

export const mixElements = {
    define<T extends MixElement>(elementName: ElementName, Constructor: MixElementConstructor<T>) {
        elements.set(elementName, Constructor);

        if (Constructor.styles) {
            mixStyle.map.set(elementName, Constructor.styles);
        }
    }
};
