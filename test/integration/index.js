import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import { zitrusmix } from '../../dist/index.js';

console.log('Example app for integration.');

await zitrusmix({
    port: 3000,
    cwd: dirname(fileURLToPath(import.meta.url))
});
