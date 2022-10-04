import postcss from 'postcss';
import nested from 'postcss-nested';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';
import { customAlphabet, nanoid } from 'nanoid';

const css = `
    .test { color: red; }
    .test.test2 { color: red;}
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

const plugins = () => [
    autoprefixer,
    nested,
    modules({ generateScopedName })
];

const result1 = await postcss(plugins()).process(css, options);
const result2 = await postcss(plugins()).process(css, options);

const document = postcss.document()
document.append(result1.css)
document.append(result2.css)
const allCss = document.toResult({
    to: 'all.css', map: {
        absolute: false,
        inline: false
    }
});

console.log(allCss);
