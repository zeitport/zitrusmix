/* eslint-disable no-console */

import chalk from 'chalk';
import { formatStatus } from './formatStatus.js';
import { formatLevel } from './formatLevel.js';
import { formatErrorCode } from './formatErrorCode.js';

/**
 * @typedef {import('../../types/baseLogger.js').BaseLogger} BaseLogger
 */

const line = ''.padEnd(120, '-');

/**
 * @implements {BaseLogger}
 */
export class PrettyConsoleLogger {
    debug(entry) {
        const { msg, ...data } = entry;
        console.log(chalk.gray(msg));

        if (Object.keys(entry).length > 2) {
            const json = JSON.stringify(data, undefined, 2);
            for (const line of json.split('\n')) {
                console.log(chalk.gray(line));
            }
        }
    }

    info(entry) {
        const {msg, status} = entry;
        const line = [
            formatStatus(status),
            msg
        ].join('');
        console.log(line);
    }

    warn(entry) {
        const {level, msg, status} = entry;
        const line = [
            formatLevel(level),
            formatStatus(status),
            msg
        ].join('');
        console.log(line);
    }

    error(entry) {
        const {level, msg, status, code} = entry;
        const line = [
            formatLevel(level),
            formatStatus(status),
            formatErrorCode(code),
            chalk.bold(msg)
        ].join('');
        console.log(line);
    }

    fatal(entry) {
        console.log('\n' + chalk.red.bold(line));
        const {level, msg, status, code} = entry;
        console.log([
            formatLevel(level),
            formatStatus(status),
            formatErrorCode(code),
            chalk.red(msg)
        ].join(''));
        console.log(chalk.red.bold(line) + '\n');
    }
}
