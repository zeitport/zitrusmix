import type { MixElementConstructor } from '../interfaces/mixElementConstructor.js';
import { MixElement } from '../mixElement.js';

export const elements: Map<string, MixElementConstructor<MixElement>> = new Map();
