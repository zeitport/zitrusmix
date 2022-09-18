import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import { zitrusmix } from 'zitrusmix';

console.log('Example app for integration.');

const mix = zitrusmix({
    port: 3000,
    host: 'localhost',
    cwd: dirname(fileURLToPath(import.meta.url))
});

await mix.start();

console.log(`http://localhost:${mix.options.port}`);
