import { ZitrusmixOptions } from './zitrusmixOptions.js';
import { ZitrusmixServer } from './zitrusmixServer.js';

export function zitrusmix(init: Partial<ZitrusmixOptions>): ZitrusmixServer {
    return new ZitrusmixServer(init);
}
