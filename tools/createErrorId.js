import {customAlphabet} from 'nanoid';

const createId = customAlphabet('0123456789', 4)

console.log('ZM-' + createId());
