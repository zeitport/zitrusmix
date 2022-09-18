import type { BaseLogger } from './log/baseLogger.js';
import { PrettyConsoleLogger } from './log/prettyConsoleLogger.js';
import type { Nullable } from './utils/nullable.js';

export class ZitrusmixOptions {
    /**
     * @description Current working directory
     */
    readonly cwd: string;
    readonly app: string | readonly string[];
    readonly pageFiles: string;
    readonly elementFiles: string | readonly string[];
    readonly pageRoot: string;
    readonly appRoot: string;
    readonly staticRoot: string;

    /**
     * @link https://github.com/zeitport/zitrusmix/blob/main/doc/feature/head.md
     */
    readonly head: string;

    readonly logger: Nullable<BaseLogger>;
    readonly port: number;
    readonly host: string;

    constructor(partial?: Partial<ZitrusmixOptions>) {
        this.cwd = partial?.cwd || process.cwd();
        this.appRoot = partial?.appRoot || './app/';

        this.pageRoot = partial?.pageRoot || './app/pages/';
        this.pageFiles = partial?.pageFiles || '**/*.html';

        this.elementFiles = partial?.elementFiles || './app/elements/**/*.js';

        this.app = partial?.app || ['./app/**/*.js', './app/**/*.mjs'];

        this.staticRoot = partial?.staticRoot || './app/static/';
        this.head = partial?.head || './app/head.js';
        this.logger = partial?.logger || new PrettyConsoleLogger();
        this.port = partial?.port || 3000;
        this.host = partial?.host || '127.0.0.1';
    }
}
