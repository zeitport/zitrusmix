import postcss from 'postcss';
import nested from 'postcss-nested';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';
import { mixStyle } from '../state/mixStyle.js';

export async function createMixStyle() {
    const document = postcss.document();

    for await (const[name, style] of mixStyle.map) {
        const options = {
            from: `/mix/elements/${name}.css`,
            map: {
                absolute: false,
                inline: false,
                annotations: false
            }
        };

        const result = await postcss(plugins(style.moduleId)).process(style.raw, options);
        document.append(result.root);
    }

    const documentResult = document.toResult({
        from: '/mix/styles.css',
        to: '/mix/styles.css',
        map: {
            absolute: false,
            inline: false,
            sourcesContent: true,
            annotation: '/mix/styles.css.map'
        }
    });

    mixStyle.css = documentResult.css;
    mixStyle.sourceMap = documentResult.map.toString();
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
        modules({
            generateScopedName,

            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getJSON: () => {}
        })
    ];
}
