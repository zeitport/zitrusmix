import * as parse5 from 'parse5';
import {ast} from '../../dist/utils/ast.js';

const delay = duration => new Promise(resolve => setTimeout(() => resolve(), duration));

class RenderTask {
    constructor(templateResult) {
        console.log('Task.new()');
        /**
         * @type {MixHtmlTemplateResult}
         */
        this.templateResult = templateResult;
    }
}

class MixHtmlTemplateResult {
    constructor(raw, fragment) {
        console.log('MixHtmlTemplateResult.new()');
        this.raw = raw;
        this.fragment = fragment;
    }
}

/**
 * @param strings
 * @param values
 */
export function html(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);
    const fragment = parse5.parseFragment(raw);

    return new MixHtmlTemplateResult(raw, fragment);
}

class MixRenderEngine {
    constructor(context) {
        /**
         * @type {Array<RenderTask>}
         */
        this.stack = [];

        this.context = context;
    }

    async render(templateResult) {

        await this.renderMixElements(templateResult.fragment);
        await this.processNextRenderTask();

        return parse5.serialize(templateResult.fragment);
    }

    findMixElements(parent) {
        return /** @type {ChildElement[]} */(ast.filter(parent, ast.isCustomElement));
    }

    async renderMixElements(parent) {
        /** @type {ChildElement[]} */(ast.filter(parent, ast.isCustomElement));

        for(const mixElement of this.findMixElements(parent)) {
            await this.renderMixElement(mixElement);
        }
    }

    async renderMixElement(element) {
        console.log('renderMixElement()', element.tagName);

        const render = {
            'my-title': ({html, page}) => html`<h1>${page.params.title}</h1>`,
            'my-post': async ({html}) => {
                await delay(3000);
                return html`<p>My post</p><div><my-image></my-image></div>`;
            },
            'my-image': ({html}) => html`<img src="/myImage.png></img>"`
        };

        const renderContext = {
            html: html,
            ...this.context
        };

        const templateResult = await render[element.tagName](renderContext);

        element.childNodes = templateResult.fragment.childNodes;

        this.stack.push(new RenderTask(templateResult));
    }

    async processNextRenderTask() {
        console.log('RenderStack.processNextTask()');

        if (this.stack.length > 0) {
            const task = this.stack.shift();
            await this.renderMixElements(task.templateResult.fragment);
            await this.processNextRenderTask();
        }
    }
}

async function renderPage() {
    const renderEngine = new MixRenderEngine({
        page: {
            params: {
                title: 'Hello World Title!'
            }
        }
    });
    const pageHtml = await renderEngine.render(html`<header id="123"><my-title></my-title><my-post></my-post></header>`);

    console.log(pageHtml);
}

await renderPage();


