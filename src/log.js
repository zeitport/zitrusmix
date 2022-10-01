import { PrettyConsoleLogger } from './log/prettyConsoleLogger.js';

/**
 * @typedef {import('./types/baseLogger.js').BaseLogger} BaseLogger
 */

/**
 * @type {BaseLogger | null}
 */
let baseLogger = null;

/**
 * @param {BaseLogger | null} logger
 */
export function useLogger(logger) {
    baseLogger = logger || new PrettyConsoleLogger();
}

const log = {
    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    debug: (message, data) => {
        const entry = { msg: message, level: 'debug', ...data };
        baseLogger?.debug?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    info: (message, data) => {
        const entry = { msg: message, level: 'info', ...data };
        baseLogger?.info?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    warn: (message, data) => {
        const entry = { msg: message, level: 'warn', ...data };
        baseLogger?.warn?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    error: (message, data) => {
        const entry = { msg: message, level: 'error', ...data };
        baseLogger?.error?.(entry);
    },

    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    fatal: (message, data) => {
        const entry = { msg: message, level: 'fatal', ...data };
        baseLogger?.fatal?.(entry);
    }
};

export { log };
