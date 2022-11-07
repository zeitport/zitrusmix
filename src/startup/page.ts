import { PageRoute } from "./pageRoute";

export class Page {
    readonly filepath: string;
    readonly route: PageRoute;

    constructor(init: Required<Page>) {
        this.filepath = init.filepath;
        this.route = init.route;
    }
}
