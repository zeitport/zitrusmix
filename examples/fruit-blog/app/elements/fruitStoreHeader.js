import { MixElement, css, mixElements } from 'zitrusmix';

class FruitStoreHeader extends MixElement {
    static styles = super.css`
        .headline {
            font-size: 3rem;
            color: #808030;
        }
    `;

    /**
     * @param {import('zitrusmix').ElementContext} context
     * @returns {import('zitrusmix').HtmlTemplateResult}
     */
    render({html}) {
        return html`
            <header>
                <h1 class="headline">🍋 Zitrusmix Fruit Store</h1>
            </header>
        `;
    }
}

mixElements.define('fruit-store-header', FruitStoreHeader);
