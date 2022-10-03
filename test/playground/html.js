import { mixElements, MixElement } from '../../src/index.js';
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

mixElements.define('actor-card', ActorCard);
mixElements.define('fruit-shop-header', FruitShopHeader);

const result = html`<fruit-shop-header></fruit-shop-header>`;

console.log(result);
