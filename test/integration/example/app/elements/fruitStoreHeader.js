import { element } from 'zitrusmix';

element('fruit-store-header', fruitStoreHeader);

function fruitStoreHeader({ html }) {
    return html`<header><h1>🍋 Zitrusmix Fruit Store<h1></header>`;
}
