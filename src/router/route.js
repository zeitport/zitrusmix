/**
 * @typedef {import('./routeHandler').RouteHandler} RouteHandler
 */

export class Route {
    /**
     * @param {{method?: RouteMethod, url: string, handler: RouteHandler}} init
     */
    constructor(init) {
        /**
         * @type {string}
         */
         this.url = init.url;

        /**
         * @type {RouteMethod}
         */
        this.method = init.method || RouteMethod.GET;

        /**
         * @type {RouteHandler}
         */
        this.handler = init.handler;
    }
}

/**
 * @enum {string}
 */
export const RouteMethod = {
    GET: 'get',
    POST: 'post',
    HEAD: 'head',
    PUT: 'put',
    DELETE: 'delete'
};
