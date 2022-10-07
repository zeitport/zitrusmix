import postcss from 'postcss';
import nested from 'postcss-nested';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';
import { mixStyle } from '../state/mixStyle.js';

export async function createMixStyle() {
    const document = postcss.document();

    for await (const[name, style] of mixStyle.map) {
        const options = {
            from: `/${name}.css`,
            to: `/${name}.min.css`,
            map: {
                absolute: false,
                inline: false
            }
        };

        const result = await postcss(plugins(style.moduleId)).process(style.raw, options);
        document.append(result.css);
    }

    mixStyle.css = document.toResult({
        to: 'all.css', map: {
            absolute: false,
            inline: false
        }
    }).css;
}

/**
 * @param {string} moduleId
 * @returns {any[]}
 */
function plugins(moduleId) {
    const generateScopedName = (name, _filename, _css) => {
        return `${name}-${moduleId}`;
    };

    return [
        autoprefixer,
        nested,
        modules({ generateScopedName })
    ];
}
