import chalk from 'chalk';

/**
 * @type {Record<string, {text: string, style: import('chalk').ChalkInstance}>}
 */
const labels = {
    debug: {
        text: 'debug',
        style: chalk.gray
    },
    info: {
        text: 'info',
        style: chalk.white
    },
    warn: {
        text: 'warn',
        style: chalk.yellow.bold
    },
    error: {
        text: 'error',
        style: chalk.red.bold
    },
    fatal: {
        text: 'FATAL',
        style: chalk.bgRed.white.bold
    }
};

/**
 * @param {string} level
 * @returns {string}
 */
export function formatLevel(level) {
    const label = labels[level] || labels.info;
    const text = `${label.text}`;
    const styledText = label.style(text);

    return styledText + ' ';
}
