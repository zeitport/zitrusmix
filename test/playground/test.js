import path from 'node:path';

const winPath = 'C:\\win\\path\\';
const posixPath = '../abc/data.json';


findFiles(winPath, posixPath);

function posixJoin(...args) {
    console.log(path.join(...args).split(path.sep).join(path.posix.sep));
}
