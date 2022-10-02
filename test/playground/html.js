import { zitrusmixElements, MixElement } from '../../src/index.js';
import { html } from '../../src/html.js';


class ActorCard extends MixElement {
    render({html}) {
        return html`<slot name="first"></slot><slot name="last"></slot>`;
    }
}

class FruitShopHeader extends MixElement {
    render({html}) {
        return html`<header><h1>🍋 Fruits</h1></header>`;
    }
}

zitrusmixElements.define('actor-card', ActorCard);
zitrusmixElements.define('fruit-shop-header', FruitShopHeader);

const result = html`<fruit-shop-header></fruit-shop-header>`;

console.log(result);
