import { MixElement, css, html } from 'zitrusmix';

export class FruitStoreHeader extends MixElement {
    static elementName = 'fruit-store-header';

    static styles = css`
        .headline {
            font-size: 3rem;
            color: #808030;
        }
    `;

    render() {
        return html`
            <header>
                <h1 class="headline">🍋 Zitrusmix Fruit Store</h1>
            </header>
        `;
    }
}
