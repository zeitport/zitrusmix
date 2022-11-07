import chalk from 'chalk';

/**
 * @param {string} code
 * @returns {string}
 */
export function formatErrorCode(code) {
    return code ? chalk.underline(code) + ':' : '';
}
