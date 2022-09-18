import * as parse5 from 'parse5';
import {log} from './log.js';
import {RenderTask} from './renderTask.js';
import {elements} from './state/elements.js';
import {MixRenderContext} from './tags/mixRenderContext.js';
import {renderMixElement} from './tags/renderMixElement.js';
import {ast} from './utils/ast.js';

export class MixRenderEngine {
    #stack: Array<RenderTask> = [];
    #context: MixRenderContext;

    constructor(context: MixRenderContext) {
        this.#context = context;
    }

    async render(templateResult): Promise<string> {

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

        // const render = {
        //     'my-title': ({html, page}) => html`<h1>${page.params.title}</h1>`,
        //     'my-post': async ({html}) => {
        //         await delay(3000);
        //         return html`<p>My post</p><div><my-image></my-image></div>`;
        //     },
        //     'my-image': ({html}) => html`<img src="/myImage.png></img>"`
        // };

        if (elements.has(element.nodeName)) {
            const templateResult = await renderMixElement(element, this.#context);
            this.#stack.push(new RenderTask(templateResult));
        } else {
            log.error(`No render function found for "${element.nodeName}".`);
        }
    }

    async processNextRenderTask() {
        const task = this.#stack.shift();

        if (task) {
            await this.renderMixElements(task.templateResult.fragment);
            await this.processNextRenderTask();
        }
    }
}
