console.log('http://localhost:3000/code/123');
console.log('123'.padEnd(10, '.'));

const nonDigits = /[^0-9]/g;
const code = parseInt('ZM-100'.replaceAll(nonDigits, ''), 10);
console.log(- code);
