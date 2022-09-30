import { Options } from '../../../src/options.js';
import { findPages } from '../../../src/startup/findPages.js';

const pages = await findPages(new Options());
console.log(process.cwd());
console.log(pages);
