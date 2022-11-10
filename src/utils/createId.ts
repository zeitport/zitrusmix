import { customAlphabet} from 'nanoid';
import type { Nullable } from './nullable.js';

type IdGenerator = () => string;

const createNanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 8);
let createCustomId: Nullable<IdGenerator> = null;

/**
 * @returns {string}
 */
export function createId() {
    return createCustomId ? createCustomId() : createNanoId();
}

/**
 * @param  {IdGenerator} createId
 */
export function useCustomIdGenerator(createId) {
    createCustomId = createId;
}
