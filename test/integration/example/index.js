import Fastify from 'fastify';
import { zitrusmix } from 'zitrusmix';

const fastify = Fastify();
const mix = await zitrusmix();

fastify.register(mix.router);

fastify.listen({ port: 3000 }, function (error, address) {
    if (error) {
        mix.log.fatal(error.message);
    }

    mix.log.info(new Date().toLocaleTimeString());
    mix.log.info(`Server is now listening on ${address}`);
});
