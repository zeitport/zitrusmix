import chalk from 'chalk';
import { formatLevel } from './formatLevel.js';

/**
 * @typedef {import('../types/baseLogger.js').BaseLogger} BaseLogger
 */

const line = ''.padEnd(120, '-');

/**
 * @implements {BaseLogger}
 */
export class PrettyConsoleLogger {
    debug(entry) {
        const { level, msg, ...data } = entry;
        console.log(`${formatLevel(level)} ${chalk.gray(msg)}`);

        if (Object.keys(entry).length > 2) {
            const json = JSON.stringify(data, undefined, 2);
            for (const line of json.split('\n')) {
                console.log(`${''.padEnd(8)} ${chalk.gray(line)}`);
            }
        }
    }

    info(entry) {
        console.log(`${formatLevel(entry.level)} ${entry.msg}`);
    }

    warn(entry) {
        console.log(`${formatLevel(entry.level)} ${entry.msg}`);
    }

    error(entry) {
        const {level, msg, code} = entry;
        console.log([
            formatLevel(level),
            chalk.blue.underline(code) + ':',
            chalk.bold(msg)
        ].join(' '));
    }

    fatal(entry) {
        console.log('\n' + chalk.red.bold(line));
        const {level, msg, code} = entry;
        console.log([
            formatLevel(level),
            chalk.underline(code) + ':',
            chalk.red(msg)
        ].join(' '));
        console.log(chalk.red.bold(line) + '\n');
    }
}
