import {routes} from './routes.js';
import {html} from './html.js';

/**
 * Encapsulates the routes
 * @param {any} fastify  Encapsulated Fastify Instance
 */
export async function router(fastify) {
    for (const route of routes.keys()) {
        fastify.get(route, async (_, reply) => {
            const callback = routes.get(route);

            if (callback) {
                try {
                    const document = await callback({html});
                    reply.type('text/html').send(document);
                } catch (error) {
                    console.error(error);

                    // @ts-ignore
                    const message = error?.message || 'Route callback failed.';
                    reply.type('text/html').send(message);
                }
            } else {
                reply.status(404).send('Nothing found');
            }
        });
    }
}
