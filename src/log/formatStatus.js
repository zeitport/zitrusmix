import chalk from 'chalk';

const labels = {
    true: chalk.green('✓ '),
    false: chalk.red('x '),
    ok: chalk.green('✓ '),
    nok: chalk.red('x '),
    '?': chalk.blue('? ')
};

/**
 * @param {string | undefined | boolean} status
 * @returns {string}
 */
export function formatStatus(status) {
    return labels[status?.toString().toLowerCase()] || '';
}
