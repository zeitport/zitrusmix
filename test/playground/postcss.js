import postcss from 'postcss';
import nested from 'postcss-nested';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';
import { customAlphabet, nanoid } from 'nanoid';

const css = `
    .test { color: red; }
    .test.test2 { color: getRender;}
    .test[data-mono] { font-family: monospace;}
`;

const classNameMap = new Map();
const createId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 6);
const postfix = createId(8);

function generateScopedName(name, filename, css) {
    const scopedName = `${name}-${postfix}`;
    classNameMap.set(name, scopedName);
    return scopedName;
}

const options = {
    from: '/test.css',
    to: '/test.min.css',
    map: {
        absolute: false,
        inline: false
    }
};

const result = await postcss([
    autoprefixer,
    nested,
    modules({ generateScopedName })
]).process(css, options);
console.log(result.css);
console.log(classNameMap);
