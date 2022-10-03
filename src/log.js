import { PrettyConsoleLogger } from './log/prettyConsoleLogger.js';

/**
 * @typedef {import('../types/baseLogger.js').BaseLogger} BaseLogger
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

        if (data && data.code) {
            process.exitCode = -parseCode(data.code);
        }
    },

    /**
     * @param {string} message
     * @param {object} [data]
     * @returns void
     */
    fatal: (message, data) => {
        const entry = { msg: message, level: 'fatal', ...data };
        baseLogger?.fatal?.(entry);

        if (data && data.code) {
            process.exitCode = -parseCode(data.code);
        }
    }
};

/**
 * @param {string} code
 * @returns {number}
 */
function parseCode(code) {
    const nonDigits = /[^0-9]/g;
    const onlyCodeDigits = code.replaceAll(nonDigits, '');

    return typeof code === 'number' ? code : parseInt(onlyCodeDigits, 10);
}

export { log };
