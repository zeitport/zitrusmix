import Fastify from 'fastify';
import { zitrusmix } from 'zitrusmix';

const fastify = Fastify();
const mix = await zitrusmix();

fastify.register(mix.router);

fastify.listen({ port: 3000 }, function (error, address) {
    if (error) {
        fastify.log.error(error);
        console.error(error);
        process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
});
