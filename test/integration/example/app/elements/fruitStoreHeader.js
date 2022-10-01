import { zitrusmixElements, ZitrusmixElement } from 'zitrusmix';

class FruitStoreHeader extends ZitrusmixElement {
    constructor() {
        super();
    }

    render({html}) {
        return html`
            <header>
                <h1>🍋 Zitrusmix Fruit Store</h1>
            </header>
        `;
    }
}

zitrusmixElements.define('fruit-store-header', FruitStoreHeader);
