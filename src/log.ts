import { BaseLogger } from './log/baseLogger.js';
import { PrettyConsoleLogger } from './log/prettyConsoleLogger.js';
import { Nullable } from './utils/nullable.js';


let baseLogger: Nullable<BaseLogger> = new PrettyConsoleLogger();

export function useLogger(logger: Nullable<BaseLogger>) {
    baseLogger = logger;
}

export const log = {
    /**
     * @param {string} message
     * @param {object} data
     * @returns void
     */
    debug: (message, data?): void => {
        const entry = { msg: message, level: 'debug', ...data };
        baseLogger?.debug?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} data
     * @returns void
     */
    info: (message, data?): void => {
        const entry = { msg: message, level: 'info', ...data };
        baseLogger?.info?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} data
     * @returns void
     */
    warn: (message, data?) => {
        const entry = { msg: message, level: 'warn', ...data };
        baseLogger?.warn?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} data
     * @returns void
     */
    error: (message, data?) => {
        const entry = { msg: message, level: 'error', ...data };
        baseLogger?.error?.(entry);
    }
};
