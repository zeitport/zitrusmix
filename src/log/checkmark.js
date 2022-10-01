import chalk from 'chalk';

/**
 * @param {boolean} condition
 */
export function checkmark(condition) {
    return condition ? chalk.bgGreenBright('  ok ') : chalk.bgRed.white(' nok ');
}
