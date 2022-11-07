export class PageRoute {
    readonly url: string;
    readonly source: PageRouteSource;

    constructor(init: Required<PageRoute>) {
        this.url = init.url;
        this.source = init.source;
    }
}

export enum PageRouteSource {
    META_TAG = 'metaTag',
    FILEPATH = 'filepath'
};
