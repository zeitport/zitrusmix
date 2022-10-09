import { zitrusmix } from 'zitrusmix';

const mix = await zitrusmix();


mix.listen({port: 3000}, function (error, address) {
    if (error) {
        mix.log.fatal(error.message);
    }

    mix.log.info(new Date().toLocaleTimeString());
    mix.log.info(`Server is now listening on ${address}`);
});
