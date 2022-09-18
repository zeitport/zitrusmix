import { PageRoute } from './pageRoute.js';

export class Page {
    readonly filepath: string;
    readonly route: PageRoute;

    constructor(init: Required<Page>) {
        this.filepath = init.filepath;
        this.route = init.route;
    }
}
