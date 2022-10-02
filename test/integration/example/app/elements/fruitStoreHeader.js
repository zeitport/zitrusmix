import { zitrusmixElements, MixElement } from 'zitrusmix';

class FruitStoreHeader extends MixElement {
    constructor() {
        super();
    }

    static styles = css`
        .fsh-headline-1 {
            font-size: 3rem;
            color: #808030;
        }
    `;

    render({html}) {
        return html`
            <header>
                <h1 class="fsh-headline-1">🍋 Zitrusmix Fruit Store</h1>
            </header>
        `;
    }
}

zitrusmixElements.define('fruit-store-header', FruitStoreHeader);
