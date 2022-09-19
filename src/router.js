import {routes} from './routes.js';
import {elements} from './elements.js';
import enhance from '@enhance/ssr'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export async function router(fastify, options) {
    const html = enhance({
        elements: Object.fromEntries(elements)
    });

    for (const route of routes.keys()) {
        fastify.get(route, async (request, reply) => {
            const callback = routes.get(route);
            try {
                const document = await callback({html});
                reply.type('text/html').send(document);
            } catch (error) {
                console.error(error);
                reply.type('text/html').send(error.message);
            }
        });
    }
}
