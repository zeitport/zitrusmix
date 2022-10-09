import postcss from 'postcss';
import nested from 'postcss-nested';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';
import { customAlphabet, nanoid } from 'nanoid';

const cssA = `
    .test { color: red; }
`;

const cssB = `
    .test { color: red; }
`;

const classNameMap = new Map();
const createId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 6);

function generateScopedName(name, filename, css) {
    const postfix = createId(8);
    const scopedName = `${name}-${postfix}`;
    classNameMap.set(name, scopedName);
    return scopedName;
}

const mapOptions = {
    absolute: false,
    inline: false
};

const optionsA = {
    from: './mix/testa.css',
    map: mapOptions
};

const optionsB = {
    from: './mix/testb.css',
    to: 'testb.css',
    map: mapOptions
};

const plugins = () => [
    autoprefixer,
    nested,
    modules({
        generateScopedName,
        getJSON: () => {}
    })
];

const result1 = await postcss(plugins()).process(cssA, optionsA);
const result2 = await postcss(plugins()).process(cssB, optionsB);

const document = postcss.document()

// const part1 = postcss.parse(result1.css, { from: '/testA.css' })
// //part1.input.map = result1.map;

// const part2 = postcss.parse(result2.css, { from: '/testB.css' })
// //part2.input.map = result2.map;


document.append(result1.root)
document.append(result2.root)
const allCss = document.toResult({
    from: '/mix/styles.css',
    to: '/mix/styles.css.map',
    map: {
        absolute: true,
        inline: false,
        sourcesContent: false,
        annotation: '/mix/style.css.map'
    }
});

console.log(allCss.css);

// allCss.map.setSourceContent(optionsA.from, cssA);
// allCss.map.setSourceContent(optionsB.from, cssB);

console.log(allCss.map.toString());
