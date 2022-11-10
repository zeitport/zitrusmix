import { RouteHandler } from 'fastify';

export class Route {
    readonly url: string;
    readonly method: RouteMethod;
    readonly handler: RouteHandler;
    /**
     * @param {{method?: RouteMethod, url: string, handler: RouteHandler}} init
     */
    constructor(init) {
        this.url = init.url;
        this.method = init.method || RouteMethod.GET;
        this.handler = init.handler;
    }
}

export enum RouteMethod {
    GET = 'get',
    POST = 'post',
    HEAD = 'head',
    PUT = 'put',
    DELETE = 'delete'
}
