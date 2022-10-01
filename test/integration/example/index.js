import Fastify from 'fastify';
import { zitrusmix } from 'zitrusmix';

const fastify = Fastify();
const mix = await zitrusmix();

fastify.register(mix.router);

fastify.listen({ port: 3000 }, function (error, address) {
    if (error) {
        mix.log.fatal(error.message);
        process.exit(1);
    }

    mix.log.info(`Server is now listening on ${address}`);
});
