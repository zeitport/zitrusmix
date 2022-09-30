export class PageRoute {
    /**
     * @param {Required<PageRoute>} init
     */
    constructor(init) {
        /**
         * @type {string}
         * @readonly
         */
        this.url = init.url;

        /**
         * @type {PageRouteSource}
         * @readonly
         */
        this.source = init.source;
    }
}

/**
 * @enum {string}
 */
export const PageRouteSource = {
    META_TAG: 'metaTag',
    FILEPATH: 'filepath'
};
